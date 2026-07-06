import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/* ── Rate limiting (in-memory; resets on cold start — acceptable for a portfolio) ── */
const rateLimitStore = new Map<string, { count: number; reset: number }>();
const RATE_WINDOW_MS = 60_000; // 1 minute window
const RATE_LIMIT_MAX = 3;      // max 3 submissions per window per IP

let lastCleanup = 0;

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Evict expired entries every 5 minutes to prevent unbounded memory growth
  if (now - lastCleanup > 300_000) {
    lastCleanup = now;
    for (const [key, rec] of rateLimitStore) {
      if (now > rec.reset) rateLimitStore.delete(key);
    }
  }

  const rec = rateLimitStore.get(ip);
  if (!rec || now > rec.reset) {
    rateLimitStore.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  if (rec.count >= RATE_LIMIT_MAX) return true;
  rec.count++;
  return false;
}

/* ── Input sanitization — strips newlines (SMTP header injection guard) ── */
const HTML_ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
};

function sanitize(str: string, max: number): string {
  return String(str)
    .replace(/[\r\n]/g, ' ')
    .trim()
    .slice(0, max)
    .replace(/[&<>"'`]/g, c => HTML_ESCAPE[c]);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export async function POST(req: NextRequest) {
  /* Rate limit by IP */
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
           ?? req.headers.get('x-real-ip')
           ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }
  try {
    const body    = await req.json();
    const name    = sanitize(body.name    ?? '', 80);
    const email   = sanitize(body.email   ?? '', 120);
    const message = sanitize(body.message ?? '', 2000);

    if (!name || !email || !message || !validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    const TO = process.env.CONTACT_EMAIL ?? 'gabrielricarte000@gmail.com';

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const port = parseInt(SMTP_PORT ?? '587');
      const transporter = nodemailer.createTransport({
        host:              SMTP_HOST,
        port,
        secure:            port === 465,
        requireTLS:        port === 587,
        connectionTimeout: 8000,
        socketTimeout:     8000,
        auth: {
          user: SMTP_USER,
          /* Gmail App Passwords are displayed with spaces for readability
             but SMTP auth requires them without spaces. */
          pass: SMTP_PASS.replace(/\s+/g, ''),
        },
        tls: { servername: SMTP_HOST },
      });

      /* Primary: notify Gabriel */
      await transporter.sendMail({
        from:    `"Portfolio Gabriel" <${SMTP_USER}>`,
        to:      TO,
        replyTo: `"${name}" <${email}>`,
        subject: `Contato via Portfolio — ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#05050f;color:#e8eaf0;border-radius:16px">
            <h2 style="color:#00ff88;margin-bottom:24px">Nova mensagem do Portfolio</h2>
            <p><strong style="color:#00aaff">Nome:</strong> ${name}</p>
            <p><strong style="color:#00aaff">Email:</strong> <a href="mailto:${email}" style="color:#00ff88">${email}</a></p>
            <hr style="border-color:rgba(255,255,255,0.1);margin:20px 0">
            <p><strong style="color:#00aaff">Mensagem:</strong></p>
            <p style="line-height:1.7;color:#b0b8cc">${message.replace(/\n/g, '<br>')}</p>
          </div>
        `,
      });

      /* Confirmation: reply to sender — failure here should not fail the whole request */
      try {
        await transporter.sendMail({
          from:    `"Gabriel Ricarte" <${SMTP_USER}>`,
          to:      email,
          subject: `Recebi sua mensagem, ${name}! — Gabriel Ricarte`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#05050f;color:#e8eaf0;border-radius:16px">
              <h2 style="color:#00ff88;margin-bottom:8px">Mensagem recebida!</h2>
              <p style="color:#b0b8cc;margin-bottom:24px">Obrigado por entrar em contato, <strong style="color:#e8eaf0">${name}</strong>.</p>
              <p style="color:#b0b8cc;line-height:1.7">Recebi sua mensagem e responderei em até <strong style="color:#e8eaf0">24 horas</strong>. Enquanto isso, fique à vontade para me seguir nas redes.</p>
              <hr style="border-color:rgba(255,255,255,0.08);margin:24px 0">
              <p style="color:#6b7a99;font-size:0.85rem">Esta é uma confirmação automática — não precisa responder a este e-mail.</p>
              <p style="color:#6b7a99;font-size:0.85rem;margin-top:4px">
                <a href="https://github.com/gabriel07-gif" style="color:#00ff88;text-decoration:none">GitHub</a>
                &nbsp;·&nbsp;
                <a href="https://www.linkedin.com/in/gabriel-lucas-439153308/" style="color:#00ff88;text-decoration:none">LinkedIn</a>
              </p>
            </div>
          `,
        });
      } catch (replyErr) {
        console.error('[contact] Auto-reply failed (message was delivered):', replyErr);
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('[contact] SMTP not configured. Message received:', { name, email });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
