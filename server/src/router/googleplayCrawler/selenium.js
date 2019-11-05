const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');

const getLogin = async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://play.google.com/store/account/orderhistory');
    await driver.findElement(By.css('#identifierId')).sendKeys('moneydogtest1');
    await driver.findElement(By.css('#identifierNext')).click();
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.css('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')), 10000).then((el) => el.sendKeys('moneydog1234'));
    await driver.sleep(300);
    await driver.wait(until.elementLocated(By.css('#passwordNext')), 10000).click();
    return driver;
  } catch (e) {
    console.log(`error : ${e}`);
  }
}

const getSubscriptionList = async () => {
  const driver = await getLogin();
  const list = await driver.findElements(By.css('#fcxH9b > div.WpDbMd > c-wiz:nth-child(4) > div > c-wiz > table > tbody'));
  console.log(JSON.stringify(list));
}

getSubscriptionList();
