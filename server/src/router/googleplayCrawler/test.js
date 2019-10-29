const puppeteer = require('puppeteer');

const run = async () => {
  try {
    const browser = await puppeteer.launch();
    // const browser = await puppeteer.launch({
    //   headless: false,
    // });
    const page = await browser.newPage();
    Promise.all([page.goto('https://play.google.com/store/account/orderhistory'), page.waitFor('body')])
    console.log('page 이동');
    await login(page, 'tet', 'password');
    await browser.close();
    console.log('browser close');
  } catch (e) {
    console.log(`${e}`);
  }
};

const login = async (page, id, password) => {
  try {
    console.log('login page');
    await page.waitForNavigation();
    // await page.screenshot({path: 'testshot1.png'});
    await page.type('#Email', id);
    await page.$eval('#next', (e) => e.click());
    await page.type('#Passwd', password);
    await page.$eval('#signIn', (e) => e.click());
    console.log('login success');
    // await page.screenshot({path: 'testshot2.png'});
    const list = await page.evaluate(() => {
      console.log(document.querySelectorAll('#fcxH9b > div.WpDbMd > c-wiz:nth-child(7) > div > div.oOodye > table > tbody'));
      return Array.from(document.querySelectorAll('#fcxH9b > div.WpDbMd > c-wiz:nth-child(4) > div > c-wiz > table > tbody > tr'));
    });
    console.log(list);
    return list;
  } catch (e) {
    console.log(`login function error : ${e}`);
  }
};

run();
