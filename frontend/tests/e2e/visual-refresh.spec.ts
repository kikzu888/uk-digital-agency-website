import { expect, test } from "@playwright/test";

test("celestial motion can be paused and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const stars = page.locator(".cosmic-stars");
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(stars).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Play animation" }).click();
  await expect(stars).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(stars).toHaveCSS("animation-name", "none");
  await expect(
    page.getByRole("button", { name: "Pause animation" }),
  ).toBeHidden();
});

test("service artwork stays in colour and fits a narrow screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/services");
  const images = page.locator("main img");
  await expect(images).toHaveCount(7);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveCSS("filter", "none");
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
