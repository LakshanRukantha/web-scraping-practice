import puppeteer from "puppeteer";
import { config } from "dotenv";
import fs from "fs";

config();

const USERNAME = process.env.LMS_USERNAME;
const PASSWORD = process.env.LMS_PASSWORD;

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Launch the browser
  const page = await browser.newPage(); // Open a new tab in the browser
  await page.goto("https://nlearn.nsbm.ac.lk/login/index.php"); // Go to a new page

  await page.waitForSelector("#username");

  await page.type("#username", USERNAME, { delay: 100 });
  await page.type("#password", PASSWORD, { delay: 100 });

  await page.click("#rememberusername");
  await page.click("#loginbtn");

  await page.waitForSelector("#usermenu");
  await page.click("#usermenu");

  await page.goto("https://nlearn.nsbm.ac.lk/user/profile.php");

  await page.waitForSelector(".node_category.contact");

  const studentInfo = await page.evaluate(async () => {
    const fullName = document.querySelector(
      ".contentnode.fullname"
    ).textContent;
    const email = document.querySelector(".contentnode.email").textContent;
    const description = document.querySelector(
      ".contentnode.description dd p"
    ).textContent;

    return [
      {
        name: fullName,
        email: email,
        description: description,
        courses: [],
      },
    ];
  });

  fs.writeFile("data.json", JSON.stringify(studentInfo), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("File saved successfully!");
    }
  });

  await browser.close(); // Close the browser
})();
