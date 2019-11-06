const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');

const getLogin = async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://play.google.com/store/account/subscriptions');
    await driver.findElement(By.css('#identifierId')).sendKeys('test');
    await driver.findElement(By.css('#identifierNext')).click();
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.css('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')), 10000).then((el) => el.sendKeys('test'));
    await driver.sleep(300);
    await driver.wait(until.elementLocated(By.css('#passwordNext')), 10000).click();
    return driver;
  } catch (e) {
    console.log(`error : ${e}`);
  }
}

const getSubscriptionList = async () => {
  const driver = await getLogin();
  await driver.wait(until.elementLocated(By.css('#fcxH9b > div.WpDbMd > c-wiz > div > c-wiz > table > tbody')), 10000).then(() => console.log('render'));
  const list = await driver.findElement(By.css('#fcxH9b > div.WpDbMd > c-wiz > div > c-wiz > table > tbody')).then((el) => el.findElements(By.className('bzdI0b')));
  const test = [];
  await list.map((element) => test.push(serviceParsing(element)));
  console.log(test);
};

const serviceParsing = async (element) => {
  const result = {};
  result.image = await element.findElement(By.className('T75of wRBX5e')).getAttribute('src');
  const list = await element.findElement(By.className('pTS2If')).findElement(By.css('a')).findElements(By.css('span'));
  result.name = await list[0].getText();
  result.plan = await list[1].getText();
  result.price = await element.findElement(By.className('EQjZle kSHPSd')).getText();
  result.renewal = convertRenewalReg(await element.findElement(By.className('l7Glx M7PYhd')).getText());
  console.log(JSON.stringify(result));
  return result;
};

const convertRenewalReg = (renewal) => {
  const renewalReg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
  return renewalReg.exec(renewal)[0];
};

const result = convertRenewalReg('2019. 11. 30.에 갱신됨');
console.log(result);
// getSubscriptionList();

// price ₩4,400/개월
// 2019. 11. 6.까지 무료, 이후 ₩59,000/년
// 2019. 11. 30.에 갱신됨
