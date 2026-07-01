import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/SINOTRUK International/);
    // Hero should be visible
    await expect(page.locator("#home")).toBeVisible();
  });

  test("navigation links point to real pages", async ({ page }) => {
    await page.goto("/");
    // Check that nav links are not hash anchors
    const aboutLink = page.locator('a[href="/about"]').first();
    await expect(aboutLink).toBeVisible();

    const productsLink = page.locator('a[href="/products"]').first();
    await expect(productsLink).toBeVisible();

    const contactLink = page.locator('a[href="/contact"]').first();
    await expect(contactLink).toBeVisible();
  });

  test("homepage sections render correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#products")).toBeVisible();
    await expect(page.locator("#news")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });
});

test.describe("Product Browsing Flow", () => {
  test("browse products → category → detail page", async ({ page }) => {
    // Step 1: Go to products page
    await page.goto("/products");
    await expect(page).toHaveTitle(/Products.*SINOTRUK/);

    // Step 2: Click on Heavy Truck category
    await page.goto("/products/heavy-truck");
    await expect(page).toHaveTitle(/Heavy Truck/);

    // Step 3: Verify product cards are visible
    const productCards = page.locator('a[href*="/products/heavy-truck/"]');
    await expect(productCards.first()).toBeVisible();

    // Step 4: Navigate to product detail
    await page.goto("/products/heavy-truck/howo-tx-6x4-dump-truck");
    await expect(page).toHaveTitle(/HOWO TX 6.*Dump Truck/);

    // Step 5: Verify specifications sidebar
    await expect(page.getByText("Specifications")).toBeVisible();
    await expect(page.getByText("371 HP")).toBeVisible();

    // Step 6: Verify "Request Quote" button exists
    await expect(page.getByRole("link", { name: /Request Quote/i })).toBeVisible();
  });
});

test.describe("Inquiry Submission Flow", () => {
  test("submit inquiry from contact page", async ({ page }) => {
    await page.goto("/contact");

    // Fill the inquiry form
    await page.getByLabel(/Your Name/i).fill("John Smith");
    await page.getByLabel(/Your Email/i).fill("john@example.com");
    await page.getByLabel(/Tel/i).fill("+2348001234567");

    // Select country
    const countrySelect = page.locator('select[name="country"]');
    await countrySelect.selectOption("Nigeria");

    // Fill company
    await page.getByLabel(/Company/i).fill("Smith Logistics Ltd");

    // Fill message
    await page.getByLabel(/Your Message/i).fill(
      "We need 20 HOWO TX 6x4 dump trucks for our mining operation in Lagos. Please provide pricing and delivery timeline."
    );

    // Submit
    const submitBtn = page.getByRole("button", { name: /Send Inquiry/i });
    await submitBtn.click();

    // Wait for success message
    await expect(page.getByText(/Thank you|success|sent/i).first()).toBeVisible({
      timeout: 10_000,
    });
  });

  test("form shows validation errors for invalid data", async ({ page }) => {
    await page.goto("/contact");

    // Try to submit without filling required fields
    const submitBtn = page.getByRole("button", { name: /Send Inquiry/i });
    await submitBtn.click();

    // Should show validation errors
    await expect(page.getByText(/required|at least|valid/i).first()).toBeVisible({
      timeout: 5_000,
    });
  });
});

test.describe("SEO", () => {
  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const content = await page.textContent("body");
    expect(content).toContain("sinotruk.com");
    expect(content).toContain("/products/heavy-truck");
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    const content = await page.textContent("body");
    expect(content).toContain("Allow: /");
    expect(content).toContain("Sitemap:");
  });

  test("product page has JSON-LD structured data", async ({ page }) => {
    await page.goto("/products/heavy-truck/howo-tx-6x4-dump-truck");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe("Sub-page Navigation", () => {
  test("all top-level pages are accessible", async ({ page }) => {
    const pages = [
      "/about",
      "/about/who-we-are",
      "/about/our-journey",
      "/news",
      "/news/sinotruk-ts9-dump-truck-africa-launch",
      "/video",
      "/parts",
      "/parts/engine",
      "/service",
      "/service/after-sales-service",
      "/contact",
    ];

    for (const url of pages) {
      const response = await page.goto(url);
      expect(response?.status(), `${url} should return 200`).toBe(200);
    }
  });
});
