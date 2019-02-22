import Page from './helpers/page';

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:4001');
});

afterEach(async () => {
  await page.close();
});

test('Creating a new group from Calendar-sidebar', async () => {
  await page.login();
  await page.goto('localhost:4001/calendar');
  await page.click('.header-002-hamburger-div');
  
  const inputElement = await page.$('#calendar-sidebar-add-group-input-x1');
  await inputElement.type('My New Group');  
  await inputElement.press('Enter');

  const newElement = await page.$('.calendar-sidebar-001-the-list div:nth-child(0n+2)');
  expect(!!newElement).toBe(true);
});