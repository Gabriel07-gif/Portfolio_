import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function sanitize(str: string, max: number): string {
  return String(str).trim().slice(0, max)
    .replace(/[<>"'`]/g, c => ({ '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '`': '&#x60;' }[c] ?? c));
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name    = sanitize(body.name    ?? '', 80);
    const email   = sanitize(body.email   ?? '', 120);
    const message = sanitize(body.message ?? '', 2000);

    if (!name || !email || !message || !validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
    }

    /* ── Send via SMTP if configured ── */
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT ?? '587'),
        secure: parseInt(SMTP_PORT ?? '587') === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      await transporter.sendMail({
        from:    `"Portfolio Gabriel" <${SMTP_USER}>`,
        to:      'gabrielricarte000@gmail.com',
        replyTo: `${name} <${email}>`,
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
    } else {
      /* No SMTP configured — log and return success (mailto: fallback used on client) */
      console.log('[contact] SMTP not configured. Message received:', { name, email });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
