import Page from './helpers/page';

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:4001');
});

afterEach(async () => {
  await page.close();
});

test('Successfully launching application in a browser tab', async () => {
  const text = await page.getInnerText('#application-header-brand-logo');
  expect(text).toBe('Schedular');
});