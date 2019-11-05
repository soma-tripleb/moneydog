const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');
const cheerio = require('cheerio');

const getLogin = async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://play.google.com/store/account/orderhistory');
    await driver.findElement(By.css('#identifierId')).sendKeys('test');
    await driver.findElement(By.css('#identifierNext')).click();
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.css('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')), 10000).then((el) => el.sendKeys('test'));
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.css('#passwordNext')), 10000).click();
    return driver;
  } catch (e) {
    console.log(`error : ${e}`);
    console.log(`getLogin에서 에러`);
  }
}

// nodelist => table[0].childNodes
const getSubscriptionList = async () => {
  try {
    const driver = await getLogin();
    await driver.sleep(1000);
    const list = await driver.wait(until.elementsLocated(By.css('#fcxH9b > div.WpDbMd > c-wiz > div > div.oOodye > table > tbody')), 10000);
    const temp = driver.findElement(By.css('#fcxH9b > div.WpDbMd > c-wiz > div > div.oOodye > table > tbody'));
    // temp.getText().then((el) => console.log(el)).catch((err) => console.log(err));
    const $ = cheerio.load('#fcxH9b > div.WpDbMd > c-wiz > div > div.oOodye > table > tbody');
    console.log($.html());
  } catch (e) {
    console.log(`err : ${e}`);
    console.log(`getList에서 에러`);
  }
};

getSubscriptionList();
