const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');

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
  }
}

// nodelist => table[0].childNodes
const getSubscriptionList = async () => {
  try {
    const driver = await getLogin();
    await driver.sleep(1000).then(() => console.log(`1초동안 sleep`));
    const list = await driver.wait(until.elementLocated(By.css('#fcxH9b > div.WpDbMd > c-wiz > div > div.oOodye > table > tbody')), 10000).then((el) => {
      return el.findElements(By.className('bzdI0b'));});
    console.log(list);
    driver.close();
  } catch (e) {
    console.log(`err : ${e}`);
    driver.close();
  }
};

getSubscriptionList();

