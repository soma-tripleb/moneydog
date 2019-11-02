const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');

const getLogin = async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://play.google.com/store/account/orderhistory');
    await driver.findElement(By.css('#identifierId')).sendKeys('testid');
    await driver.findElement(By.css('#identifierNext')).click();
    await driver.wait(until.elementLocated(By.css('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')));
    await driver.findElement(By.css('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')).sendKeys('testpw');
    await driver.findElement(By.id('#passwordNext')).click();
  } catch (e) {
    console.log(`error : ${e}`);
  }
}

getLogin();
