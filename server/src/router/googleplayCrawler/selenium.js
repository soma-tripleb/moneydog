const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const drvier = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

drvier.get('https://play.google.com/store/account/orderhistory');
drvier.findElement(By.css('#identifierId')).sendKeys('moneydogtest1');
drvier.findElement(By.css('#identifierNext')).click();
drvier.findElement(By.css('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')).sendKeys('moneydog1234');
drvier.findElement(By.css('#passwordNext')).click();
// email input #identifierId
// next button #identifierNext
// password #password > div.aCsJod.oJeWuf > div > div.Xb9hP > input
// pwd next button #passwordNext
