import { test, expect, type Page } from '@playwright/test';

async function openSite(page: Page, path = '/') {
  await page.goto(path);
  // Wait for completion, not just absence before the dynamic chunk has mounted.
  await expect(page.locator('html')).toHaveAttribute('data-intro-complete', 'true');
  await expect(page.locator('#intro-overlay')).toHaveCount(0);
  await page.locator('#themeToggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.locator('#themeToggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
}

async function navigate(page: Page, id: string) {
  const toggle = page.locator('#menuToggle');
  if (await toggle.isVisible()) await toggle.click();
  await page.locator(`#navLinks a[href="#${id}"]`).click();
  await expect.poll(() => page.locator(`#${id}`).evaluate(el => Math.abs(el.getBoundingClientRect().top - 80))).toBeLessThan(30);
}

test('entrada termina, hero continua animada e navegação chega ao contato', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await openSite(page);
  await expect(page.locator('.hero-name')).toBeVisible();
  await page.screenshot({ path: info.outputPath('home.png') });
  if (info.project.name !== 'desktop') {
    await expect(page.locator('.hero-scene-core')).toHaveCSS('animation-name', 'heroScenePulse');
    await expect(page.locator('.hero-scene-core')).toHaveCSS('animation-play-state', 'running');
  }
  await expect(page.locator('body')).not.toHaveCSS('overflow-y', 'hidden');
  await navigate(page, 'projetos');
  await navigate(page, 'contato');
  await expect(page.locator('#inicio')).toHaveAttribute('data-motion-paused', 'true');
  await page.locator('#formMsg').fill('Mensagem com espaços');
  await page.locator('#formMsg').press('End');
  await page.locator('#formMsg').press('Space');
  await page.locator('#formMsg').press('a');
  await expect(page.locator('#formMsg')).toHaveValue('Mensagem com espaços a');
  expect(errors).toEqual([]);
});

test('Android continua navegável com CPU e rede lentas', async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== 'chromium' || !isMobile);
  const client = await page.context().newCDPSession(page);
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await client.send('Network.enable');
  await client.send('Network.emulateNetworkConditions', {
    offline: false, latency: 120, downloadThroughput: 250000, uploadThroughput: 100000,
  });
  await openSite(page);
  await navigate(page, 'contato');
  await expect(page.locator('#formName')).toBeEditable();
});

test('toque dispensa a entrada e recarregar a página inicial a reproduz', async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.goto('/');
  const intro = page.locator('#intro-overlay');
  await expect(intro).toBeVisible();
  await intro.tap({ position: { x: 40, y: 120 } });
  await expect(intro).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-intro-complete', 'true');
  await page.reload();
  await expect(intro).toBeVisible();
  await intro.tap({ position: { x: 40, y: 120 } });
  await expect(page.locator('html')).toHaveAttribute('data-intro-complete', 'true');
  await expect(intro).toHaveCount(0);
  await navigate(page, 'servicos');
});

test('entrada aparece com flag antiga da sessão e endereço #inicio', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('g-intro-done', '1'));
  await page.goto('/#inicio');
  await expect(page.locator('#intro-overlay')).toBeVisible();
  await expect.poll(() => page.locator('.intro-ltr').first().evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(0.8);
  await page.keyboard.press('Escape');
  await expect(page.locator('#intro-overlay')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('#intro-overlay')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#intro-overlay')).toHaveCount(0);
});

test('armazenamento indisponível não prende a introdução', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
  });
  await openSite(page);
  await navigate(page, 'servicos');
  expect(errors).toEqual([]);
});

test('menu, idiomas, tema e FAQ funcionam', async ({ page }) => {
  await openSite(page, '/#faq');
  await page.locator('#faq-btn-1').click();
  await expect(page.locator('#faq-ans-1')).toBeVisible();
  await page.locator('#faq-btn-1').click();
  await expect(page.locator('#faq-ans-1')).toHaveCount(0);
  await page.locator('.lang-btn').click();
  await page.getByRole('option', { name: /English/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('.lang-btn').click();
  await page.getByRole('option', { name: /Español/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await navigate(page, 'sobre');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('#intro-overlay')).toHaveCount(0);
});

test('formulário valida e oferece e-mail quando a API falha', async ({ page }) => {
  await openSite(page, '/#contato');
  await page.locator('.form-submit-btn').click();
  await expect(page.locator('#formName')).toHaveAttribute('aria-invalid', 'true');
  await page.locator('#formName').fill('Teste de navegação');
  await page.locator('#formEmail').fill('teste@example.com');
  await page.locator('#formMsg').fill('Teste local sem envio externo.');
  await page.route('**/api/contact', route => route.fulfill({ status: 503, json: { error: 'Unavailable' } }));
  await page.locator('.form-submit-btn').click();
  await expect(page.locator('.form-fallback a')).toHaveAttribute('href', /^mailto:/);
  await expect(page.locator('#formMsg')).toHaveValue('Teste local sem envio externo.');
  await page.route('**/api/contact', route => route.fulfill({ status: 200, json: { ok: true } }));
  await page.locator('.form-submit-btn').click();
  await expect(page.locator('#formMsg')).toHaveValue('');
});

test('movimento reduzido mantém conteúdo e links disponíveis', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openSite(page);
  await navigate(page, 'habilidades');
  await expect(page.locator('#g-intro-blocker')).toHaveCount(0);
  await expect(page.locator('#backTop')).toBeVisible();
  await page.locator('#backTop').click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(2);
});

test('Android rola com gestos sobre a hero e não baixa WebGL ou vídeos automaticamente', async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== 'chromium' || !isMobile);
  const heavy: string[] = [];
  page.on('request', request => { if (/spline|\.mp4/.test(request.url())) heavy.push(request.url()); });
  await openSite(page);
  const client = await page.context().newCDPSession(page);
  await page.locator('.hero-visual').scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => scrollY);
  const box = await page.locator('.hero-visual').boundingBox();
  const x = Math.round(box!.x + box!.width / 2);
  const y = Math.min(600, Math.round(box!.y + box!.height * 0.8));
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  for (let step = 1; step <= 8; step++) {
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - step * 30 }] });
    await page.waitForTimeout(20);
  }
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 100);
  await navigate(page, 'projetos');
  await page.locator('.projects-mode-btn').nth(1).click();
  await expect(page.locator('.project-video-play').first()).toBeVisible();
  expect(heavy).toEqual([]);
});

test('layout cabe de 320px até desktop, inclusive menu em paisagem', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop');
  await openSite(page, '/#inicio');
  for (const width of [320, 360, 393, 768, 900, 1024, 1440]) {
    await page.setViewportSize({ width, height: width === 900 ? 400 : 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const nav = page.locator('#navbar');
    const navBox = await nav.boundingBox();
    expect(navBox!.width).toBeLessThanOrEqual(width);
    if (width === 900) {
      await page.locator('#menuToggle').click();
      const menu = page.locator('#navLinks');
      await expect(menu).toBeVisible();
      await expect.poll(() => menu.evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(400);
      await page.locator('#navLinks a[href="#contato"]').click();
      await expect(page.locator('#menuToggle')).toHaveAttribute('aria-expanded', 'false');
    }
  }
});
