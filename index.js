import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://lakshanrukantha.github.io");
  const scrapeData = await page.evaluate(() => {
    const name = document.querySelector("#intro .container p");
    return name.innerText;
  });
  console.log(scrapeData);
  await browser.close();
})();
