const puppeteer = require('puppeteer');

const run = async () => {
  try {
    // const browser = await puppeteer.launch({headless: false});
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://play.google.com/store/account/subscriptions');
    await page.waitFor('body');
    await login(page, 'testid', 'testpassword');
    await browser.close();
  } catch (e) {
    console.log(`error : ${e}`);
  }
};

const login = async (page, id, password) => {
  await page.type('#Email', id);
  await page.$eval('#next', (e) => e.click());
  await page.type('#Passwd', password);
  await page.$eval('#signIn', (e) => e.click());
  await page.waitFor(1000);
  await page.screenshot({path: 'testshot1.png'});
  return page;
};

run();
