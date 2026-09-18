import { test, expect } from '@playwright/test';

for (const preference of ['save-data', 'reduced-motion'] as const) {
  test(`vídeos exigem ação com ${preference} no desktop`, async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop');
    const videos: string[] = [];
    page.on('request', request => { if (/\.mp4(?:\?|$)/.test(request.url())) videos.push(request.url()); });
    if (preference === 'save-data') {
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'connection', { value: { saveData: true }, configurable: true });
      });
    } else {
      await page.emulateMedia({ reducedMotion: 'reduce' });
    }
    await page.goto('/#projetos');
    await expect(page.locator('html')).toHaveAttribute('data-intro-complete', 'true');
    await page.locator('.projects-mode-btn').nth(1).click();
    await expect(page.locator('.project-video-play').first()).toBeVisible();
    expect(videos).toEqual([]);
  });
}
