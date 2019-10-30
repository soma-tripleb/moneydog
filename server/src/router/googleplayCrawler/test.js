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
    await login(page, 'testId', 'testPwd');
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
    console.log('login success');
    await page.screenshot({path: 'testshot2.png'});
    const list = getGooglePlayBuyingList(page, '#fcxH9b > div.WpDbMd > c-wiz:nth-child(7) > div > div.oOodye > table > tbody');
    return list;
  } catch (e) {
    console.log(`login function error : ${e}`);
  }
};

const getGooglePlayBuyingList = async (page, selector) => {
  await page.evaluate((selector) => {
    console.log(`evaluate 실행`);
    console.log(document.querySelectorAll(selector));
    // const list = Array.from(document.querySelectorAll(selector));
    // console.log(list);
  }, selector);
  // return list;
};

run();
