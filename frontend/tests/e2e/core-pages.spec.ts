import { expect, test } from "@playwright/test";

test("home page exposes primary consultation flow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your next phase of growth starts here",
  );
  await page.getByRole("link", { name: "Let’s talk" }).first().click();
  await expect(page).toHaveURL(/\/contact\?intent=consultation/);
  await expect(page.getByRole("radio", { name: "Let’s talk" })).toBeChecked();
});

test("services page links to a service detail page", async ({ page }) => {
  await page.goto("/services");

  await page.getByRole("link", { name: "Explore service" }).first().click();
  await expect(page).toHaveURL(/\/services\/digital-marketing/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Digital Marketing",
  );
});

test("contact page exposes enquiry form fields", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
  await expect(
    page.getByLabel("What would you like to improve?"),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Start a project" }),
  ).toBeVisible();
});

test("admin login page exposes sign in form", async ({ page }) => {
  await page.goto("/admin/login");

  await expect(
    page.getByRole("heading", { name: "Admin Login" }),
  ).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});
