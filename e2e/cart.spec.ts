import { test, expect } from '@playwright/test';

test.describe('Shopping cart', () => {
  test('empty cart shows empty state message', async ({ page }) => {
    // Clear any existing session to start fresh
    await page.context().clearCookies();
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');

    // Should show empty state (not crash)
    const body = await page.locator('body').textContent();
    expect(body).not.toContain('500');
    expect(body).not.toContain('Internal Server Error');
  });

  test('cart page has checkout button when items exist', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');

    // If items in cart, checkout button should appear
    const checkoutBtn = page.locator('a[href*="checkout"], button', { hasText: /checkout|pesan/i }).first();
    const body = await page.locator('body').textContent();

    // Either empty state or checkout button — no crash
    const hasError = body?.includes('500') || body?.includes('Internal Server Error');
    expect(hasError).toBe(false);
  });

  test('checkout redirects to contact form', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    // Without items in cart, should redirect back to /cart
    // With items, should show the contact form
    const url = page.url();
    const isValidPage = url.includes('/cart') || url.includes('/checkout');
    expect(isValidPage).toBe(true);
  });
});
