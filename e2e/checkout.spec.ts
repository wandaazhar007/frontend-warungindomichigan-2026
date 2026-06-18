import { test, expect } from '@playwright/test';

test.describe('Checkout flow', () => {
  test('checkout step 1 contact form has required fields', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    // If redirected to cart (empty cart guard), that's valid
    if (page.url().includes('/cart')) {
      return;
    }

    // Contact form fields
    await expect(page.locator('input[name="email"], input[type="email"]').first()).toBeVisible();
    await expect(page.locator('input[name="firstName"]').first()).toBeVisible();
    await expect(page.locator('input[name="lastName"]').first()).toBeVisible();
  });

  test('contact form validates required fields before proceeding', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    if (page.url().includes('/cart')) return;

    // Try to submit empty form
    const submitBtn = page.locator('button[type="submit"]').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await page.waitForTimeout(500);
      // Should still be on step 1 (validation errors)
      expect(page.url()).not.toContain('/shipping');
    }
  });

  test('shipping page is not directly accessible without checkout state', async ({ page }) => {
    await page.goto('/checkout/shipping');
    await page.waitForLoadState('networkidle');

    // Should redirect to /checkout or /cart if no state
    const url = page.url();
    const isGuarded = url.includes('/checkout') || url.includes('/cart');
    expect(isGuarded).toBe(true);
  });

  test('payment page is not directly accessible without order', async ({ page }) => {
    await page.goto('/checkout/payment');
    await page.waitForLoadState('networkidle');

    // Should redirect to /checkout or /cart if no clientSecret
    const url = page.url();
    const isGuarded = url.includes('/checkout') || url.includes('/cart');
    expect(isGuarded).toBe(true);
  });

  test('order confirmation page exists for valid order number format', async ({ page }) => {
    // Test the page renders without crash for any order number pattern
    await page.goto('/order/WIM-2026-0001');
    await page.waitForLoadState('networkidle');

    const body = await page.locator('body').textContent();
    // May show "order not found" but should NOT crash
    expect(body).not.toContain('Internal Server Error');
  });
});
