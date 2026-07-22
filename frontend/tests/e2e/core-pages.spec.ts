import { expect, test } from "@playwright/test";

test("home page exposes primary consultation flow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Digital operations",
  );
  await expect(page.getByRole("link", { name: "Book a Consultation" }).first()).toBeVisible();
});

test("services page links to a service detail page", async ({ page }) => {
  await page.goto("/services");

  await page.getByRole("link", { name: "Explore Service" }).first().click();
  await expect(page).toHaveURL(/\/services\/digital-marketing/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Digital Marketing");
});

test("contact page exposes enquiry form fields", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.getByLabel("First name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Project description")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send Enquiry" })).toBeVisible();
});

test("admin login page exposes sign in form", async ({ page }) => {
  await page.goto("/admin/login");

  await expect(page.getByRole("heading", { name: "Admin Login" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});
