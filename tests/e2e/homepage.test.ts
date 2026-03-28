import { test, expect } from '@playwright/test';

test.describe('Homepage Visibility', () => {
  test('should show the hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Ayato Studio');
  });

  test('should show reports section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Intelligence Stream')).toBeVisible();
  });

  test('should show Silent Engine if no data is present', async ({ page }) => {
    await page.goto('/');
    const silentEngine = page.locator('text=Silent Engine');
    const articles = page.locator('article');
    
    const isSilent = await silentEngine.isVisible();
    const hasArticles = (await articles.count()) > 0;
    
    expect(isSilent || hasArticles).toBe(true);
  });
});
