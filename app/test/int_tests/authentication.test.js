import puppeteer from 'puppeteer';
import sessionFactory from './factories/session_factory';
import userFactory from './factories/user_factory';

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('localhost:4001');
});

afterEach(async () => {
  await browser.close();
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

test('Performing login', async (done) => {
  const user = await userFactory();

  if (!user) {
    done.fail(new Error('I want my test to fail'))
  }

  const { session, signature } = await sessionFactory(user);

  await page.setCookie({ name: 'session', value: session });
  await page.setCookie({ name: 'session.sig', value: signature });

  await page.goto('localhost:4001');
  await page.waitFor('.header-001-right-div');

  const myBool = await page.$eval('.header-001-right-div', el => el.innerHTML);
  expect(myBool).toBeTruthy();
  done();

}, 20000);