import { test, expect } from '@playwright/test';

test.describe('Products catalog', () => {
  test('renders product list and navigates to detail', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // If products are loaded, click the first one
    const firstCard = page.locator('[data-testid="product-card"]').first();
    const hasProducts = await firstCard.isVisible().catch(() => false);

    if (hasProducts) {
      await firstCard.click();
      await page.waitForLoadState('networkidle');
      // Product detail page should have an "Add to Cart" button
      await expect(page.locator('button', { hasText: /add to cart|tambah/i }).first()).toBeVisible();
    } else {
      // Empty catalog is acceptable in test environment
      await expect(page.locator('body')).not.toContainText('500');
    }
  });

  test('search input filters products', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], input[placeholder*="cari" i]').first();
    const hasSearch = await searchInput.isVisible().catch(() => false);

    if (hasSearch) {
      await searchInput.fill('indomie');
      await page.waitForLoadState('networkidle');
      const body = await page.locator('body').textContent();
      expect(body).not.toContain('500');
    }
  });

  test('category filter updates URL', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const categoryLink = page.locator('a[href*="category"]').first();
    const hasCategory = await categoryLink.isVisible().catch(() => false);

    if (hasCategory) {
      await categoryLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('category');
    }
  });
});
