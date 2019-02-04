import puppeteer from 'puppeteer';
import sessionFactory from '../factories/session_factory';
import userFactory from '../factories/user_factory';

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage,  {
      get: function(target, property) {
        return customPage[property] || browser[property] || page[property];
      }
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    const user = await userFactory();
    const { session, signature } = await sessionFactory(user);

    await this.page.setCookie({ name: 'session', value: session });
    await this.page.setCookie({ name: 'session.sig', value: signature });

    await this.page.goto('localhost:4001');
    await this.page.waitFor('.header-001-right-div');
  }

  async getInnerHtml(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }

  async getInnerText(selector) {
    return this.page.$eval(selector, el => el.innerText);
  }
}

export default CustomPage;