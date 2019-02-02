import puppeteer from 'puppeteer';
import safeBuffer from 'safe-buffer';
import Keygrip from 'keygrip';
import keys from '../../../api/src/config/keys';

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

test('Performing login', async () => {
  const userId = '5c5614b28531750027ca93be';

  const Buffer = safeBuffer.Buffer;
  const sessionObj = { passport: { user: userId } };
  const sessionStr = Buffer.from(JSON.stringify(sessionObj)).toString('base64');

  const keygrip = new Keygrip([ keys.cookie_key ]);

  const signature = keygrip.sign('session=' + sessionStr);

  await page.setCookie({ name: 'session', value: sessionStr });
  await page.setCookie({ name: 'session.sig', value: signature });

  await page.goto('localhost:4001');
}, 30000);