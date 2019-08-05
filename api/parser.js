const cheerio = require('cheerio');
const fs = require('fs');

const $ = cheerio.load(fs.readFileSync('test.html'));
const name = $('span[class=title]');
const duration = $('span[class=duration]');
const renewal = $('span[class=renewal]');
const id = $('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(1)');

console.log(name.contents().get("0").data);
console.log(renewal.contents().get("0").data.trim());
console.log(duration.contents().get("0").data);
console.log(id.text());
