// const webdriver = require('selenium-webdriver');
// const By = webdriver.By;
// const chrome = require('selenium-webdriver/chrome');
// const driver = new webdriver.Builder().forBrowser('chrome').build();
//
// driver.get('https://www.google.com');
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  }
})();
