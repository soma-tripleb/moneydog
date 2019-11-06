const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');

const getLogin = async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://play.google.com/store/account/subscriptions');
    await driver.findElement(By.css('#identifierId')).sendKeys('et');
    await driver.findElement(By.css('#identifierNext')).click();
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.css('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')), 10000).then((el) => el.sendKeys('te'));
    await driver.sleep(300);
    await driver.wait(until.elementLocated(By.css('#passwordNext')), 10000).click();
    return driver;
  } catch (e) {
    console.log(`error : ${e}`);
  }
};

const getSubscriptionList = async () => {
  const driver = await getLogin();
  const userSubscription = [];
  if (await hasSubscription(driver)) {
    console.log(`구독서비스가 없다.`);
    return userSubscription;
  };
  await driver.wait(until.elementLocated(By.css('#fcxH9b > div.WpDbMd > c-wiz > div > c-wiz > table > tbody')), 10000).then(() => console.log('render'));
  const list = await driver.findElement(By.css('#fcxH9b > div.WpDbMd > c-wiz > div > c-wiz > table > tbody')).then((el) => el.findElements(By.className('bzdI0b')));
  console.log(`구독서비스가 있다`);
  await list.map((element) => userSubscription.push(serviceParsing(element)));
  console.log(userSubscription);
  return userSubscription;
};

const serviceParsing = async (element) => {
  const result = {};
  const list = await element.findElement(By.className('pTS2If')).findElement(By.css('a')).findElements(By.css('span'));
  result.name = await list[0].getText();
  result.plan = await list[1].getText();
  const priceField = await element.findElement(By.className('EQjZle kSHPSd')).getText();
  result.price = convertPriceReg(priceField);
  result.renewal = convertDateReg(await element.findElement(By.className('l7Glx M7PYhd')).getText());
  result.freeEndDate = convertEndDateReg(priceField);
  result.image = await element.findElement(By.className('T75of wRBX5e')).getAttribute('src');
  console.log(JSON.stringify(result));
  return result;
};

const hasSubscription = async (driver) => {
  const hasSubscription = await driver.findElement(By.className('a3BWBf')).catch(() => false);
  return hasSubscription;
};

const convertDateReg = (date) => {
  if (date === '')
    return '';
  const renewalReg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
  return renewalReg.exec(date)[0];
};

const convertEndDateReg = (priceField) => {
  if (!checkFree(priceField))
    return '';
  const renewalReg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
  return renewalReg.exec(date)[0];
};

const convertPriceReg = (price) => {
  if (checkFree(price))
    return 0;
  const priceReg = /\₩(.*?)\//;
  return parseInt(priceReg.exec(price)[1].replace(',', ''));
};

const checkFree = (priceField) => {
  if (priceField.includes('무료'))
    return true;
  return false;
};

getSubscriptionList();

const file = fs.readFileSync('./recovery.html', 'utf-8');
const change = file.replace('/jimmyjaeyeon@gmail.com/gi', 'original@email.com');
fs.writeFileSync('./recovery1.html', change);
