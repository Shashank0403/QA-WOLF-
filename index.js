// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // Launch browser in headless mode
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to Hacker News newest page
  await page.goto("https://news.ycombinator.com/newest");

  // Select and extract the timestamps for the first 100 articles
  const articles = await page.$$eval(".athing", (rows) => {
    return rows.map((row) => {
      const timeElement = row.nextElementSibling.querySelector(".age");
      return timeElement ? timeElement.getAttribute("title") : null;
    }).filter(Boolean);
  });

  // Limit to first 100 timestamps (if more are loaded)
  const first100Timestamps = articles.slice(0, 100);

  // Check if the timestamps are sorted from newest to oldest
  const sorted = [...first100Timestamps].sort((a, b) => new Date(b) - new Date(a));
  const isSorted = first100Timestamps.every((time, index) => time === sorted[index]);

  if (isSorted) {
    console.log("The first 100 articles are sorted from newest to oldest.");
  } else {
    console.error("The first 100 articles are NOT sorted from newest to oldest.");
  }

  // Close the browser
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();


