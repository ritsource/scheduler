import Page from './helpers/page';

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:4001');
});

afterEach(async () => {
  await page.close();
});

test('Google-login button throws into oauth flow', async () => {
  await page.click('#login-page-google-oauth-ancor');
  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('Facebook-login button throws into oauth flow', async () => {
  await page.click('#login-page-facebook-oauth-ancor');
  const url = await page.url();

  expect(url).toMatch(/facebook\.com/);
});

test('Performing login', async () => {
  await page.login();

  const myBool = await page.getInnerHtml('.header-001-right-div');
  expect(myBool).toBeTruthy();
}, 20000);