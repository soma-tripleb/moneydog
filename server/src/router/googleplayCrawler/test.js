const puppeteer = require('puppeteer');

const run = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://play.google.com/store/account/subscriptions');
    await page.waitFor('body');
    await login(page, 'testID', 'testPWD');
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
  const list = await page.evaluate(() => {
    console.log(document.querySelectorAll('#fcxH9b > div.WpDbMd > c-wiz:nth-child(4) > div > c-wiz > table > tbody > tr'));
    return Array.from(document.querySelectorAll('#fcxH9b > div.WpDbMd > c-wiz:nth-child(4) > div > c-wiz > table > tbody > tr'));
    // console.log(`list : ${list}`);
  });
  console.log(`list : ${list}`);
  return page;
};

run();
