import { test, expect } from '@playwright/test';

test.describe('Smoke tests — critical pages render', () => {
  test('homepage loads and shows hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Warung Indo Michigan/i);
    // Hero heading should be visible
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('products page renders product grid', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveURL('/products');
    // Wait for product cards to appear (or empty state)
    await page.waitForLoadState('networkidle');
    const body = await page.locator('body').textContent();
    expect(body).not.toContain('500');
    expect(body).not.toContain('Internal Server Error');
  });

  test('cart page renders without crash', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');
    // Either empty cart message or cart items — no error page
    const body = await page.locator('body').textContent();
    expect(body).not.toContain('Internal Server Error');
  });

  test('login page renders form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('non-existent route shows 404', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    // Next.js returns 404 for unknown routes
    expect(response?.status()).toBe(404);
  });
});
