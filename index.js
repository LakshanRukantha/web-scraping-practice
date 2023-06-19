import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Launch the browser
  const page = await browser.newPage(); // Open a new tab in the browser
  await page.goto("https://github.com/lakshanrukantha"); // Go to a new page

  // Scrape functionality
  const scrapeData = await page.evaluate(() => {
    const name = document.querySelector(".p-name.vcard-fullname"); // Select the full name
    return name.innerText;
  });

  await page.screenshot({ path: "website.png" }); // Take a screenshot of the website

  console.log(scrapeData); // Dsiplay scrape data

  await browser.close(); // Close the browser
})();
