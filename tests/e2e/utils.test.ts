import { test, expect } from "@playwright/test";

test("Should check wallet buttons", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const button1 = await page.locator('button:has-text("Connect Ethereum Wallet")');
  await expect(button1).toBeVisible();

  const button2 = await page.locator('button:has-text("Select Wallet")');
  await expect(button2).toBeVisible();

  const button3 = await page.locator('button:has-text("Connect Bitcoin Wallet")');
  await expect(button3).toBeVisible();
});



