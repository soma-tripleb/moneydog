const puppeteer = require('puppeteer');

const run = async () => {
  try {
    // const browser = await puppeteer.launch({headless: false});
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://play.google.com/store/account/subscriptions');
    await page.waitFor('body');
    await page.screenshot({path: 'testshot.png'});
    // redirect accounts.google.com
    await page.$('#identifierId');
    await page.keyboard.type('jimmyjaeyeon');
    await page.screenshot({path: 'testshot2.png'});
    await page.click('#identifierNext');
    await page.screenshot({path: 'testshot3.png'});
    await browser.close();
  } catch (e) {
    console.log(`error : ${e}`);
  }
};

run();
