import puppeteer from 'puppeteer';

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('localhost:4001');
});

afterEach(async () => {
  await browser.close();
});

test('Successfully launching application in a browser tab', async () => {
  const text = await page.$eval('#application-header-brand-logo', el => el.innerText);
  expect(text).toBe('Schedular');
});