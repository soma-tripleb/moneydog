const puppeteer = require('puppeteer');

const run = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    Promise.all([page.goto('https://play.google.com/store/account/orderhistory'), page.waitFor('body')]);
    await login(page, 'test', 'testpw');
    await browser.close();
    console.log('browser close');
  } catch (e) {
    console.log(`${e}`);
  }
};

const login = async (page, id, password) => {
  try {
    await page.waitForNavigation();
    await page.type('#Email', id);
    await page.$eval('#next', (e) => e.click());
    await page.type('#Passwd', password);
    await page.$eval('#signIn', (e) => e.click());
    console.log(`login success current url : ${page.url()}`);
    await page.waitFor(1000);
    // const result = await page.evaluate(() => document.querySelector('#fcxH9b > div.WpDbMd > c-wiz > div > div.oOodye > table > tbody'));
    const result = await page.evaluate(() => Array.from(document.querySelectorAll('#fcxH9b > div.WpDbMd > c-wiz > div > div.oOodye > table > tbody')));
    console.log(`result : ${JSON.stringify(result)}`);
  } catch (e) {
    console.log(`login function error : ${e}`);
  }
};

run();
