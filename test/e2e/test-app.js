const {describe, it, before, after} = require('mocha');
const path = require('path');
const express = require('express');
const webdriver = require('selenium-webdriver');
const expect = require('chai').expect;
require('chromedriver');

const {By, until} = webdriver;

describe('CodeFlask', function() {
  let driver;
  let server;

  this.timeout(60000);

  before((done) => {
    const app = express();
    app.use('/', express.static(path.resolve(__dirname, '../../build')));
    server = app.listen(7776, done);
  });

  after(() => {
    server.close();
  });

  before(async () => {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  });

  after(async () => await driver.quit());

  it('should open page', async function () {
    await driver.get('http://localhost:7776/test.html');
    await driver.wait(until.titleIs('CodeFlask Test Page'));
  });

  it('should create editor elements', async function () {
    await driver.findElement(By.css('.codeflask'));
    await driver.findElement(By.css('.codeflask__pre'));
    await driver.findElement(By.css('.codeflask__textarea'));
    await driver.findElement(By.css('.codeflask__code'));
    await driver.findElement(By.css('.codeflask__flatten'));
    await driver.findElement(By.css('.codeflask__flatten'));
  });

  it('should enable syntax highlight', async function () {
    await driver.findElement(By.css('.codeflask .token.punctuation'));
  });

  it('should render lineNumbers', async function () {
    await driver.findElement(By.css('.codeflask .codeflask__lines'));
    await driver.findElement(By.css('.codeflask .codeflask__lines__line'));
  });

  it('should have same lineNumbers as lines of code', async function () {
    await driver.findElement(By.css('.codeflask__textarea')).clear();
    await driver.findElement(By.css('.codeflask__textarea')).sendKeys('let it = "go";\nconst parrot = "bird";');
    await driver.findElement(By.css('.codeflask .codeflask__lines'));
    const lines = await driver.findElements(By.css('.codeflask .codeflask__lines__line'));
    expect(lines.length).to.equal(2);
  });

  it('should update editor upon update', async function () {
    await driver.findElement(By.css('.codeflask__textarea')).clear();
    await driver.findElement(By.css('.codeflask__textarea')).sendKeys('let it = "go";');
    await driver.findElement(By.css('.codeflask .token.keyword'));
    await driver.findElement(By.css('.codeflask .token.operator'));
    await driver.findElement(By.css('.codeflask .token.string'));
    await driver.findElement(By.css('.codeflask .token.punctuation'));
  });

  it('should update editor upon update', async function () {
    await driver.findElement(By.css('.codeflask__textarea')).clear();
    await driver.findElement(By.css('.codeflask__textarea')).sendKeys('let it = "go";');
    await driver.findElement(By.css('.codeflask .token.keyword'));
    await driver.findElement(By.css('.codeflask .token.operator'));
    await driver.findElement(By.css('.codeflask .token.string'));
    await driver.findElement(By.css('.codeflask .token.punctuation'));
  });

  it('should be instance of CodeFlask', async function () {
    const isInstance = await driver.executeScript('return flask instanceof CodeFlask');
    expect(isInstance).to.be.true;
  });

  it('should be instance of CodeFlask', async function () {
    const isInstance = await driver.executeScript('return flask instanceof CodeFlask');
    expect(isInstance).to.be.true;
  });

  it('should be instance of CodeFlask', async function () {
    const isInstance = await driver.executeScript('return flask instanceof CodeFlask');
    expect(isInstance).to.be.true;
  });

  it('.updateCode(): should update lineNumbers', async function () {
    await driver.executeScript('return flask.updateCode("let age = 20")');
    const lines = await driver.findElements(By.css('.codeflask .codeflask__lines__line'));
    expect(lines.length).to.equal(1);
  });

  it('.onUpdate(): should execute callback upon user interaction', async function () {
    await driver.findElement(By.css('.codeflask__textarea')).clear();
    await driver.executeScript('return flask.onUpdate(code => document.title = code)');
    await driver.findElement(By.css('.codeflask__textarea')).sendKeys('let it = "go";');
    driver.wait(until.titleIs('let it = "go";'));
  });

  it('should enable rtl when rtl: true', async function () {
    await driver.executeScript(`
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { rtl: true });
    `);
    await driver.wait(until.elementLocated(By.css('.codeflask__textarea[dir="rtl"]')));
    await driver.wait(until.elementLocated(By.css('.codeflask__pre[dir="rtl"]')));
  });

  it('should NOT enable rtl when rtl: false', async function () {
    await driver.executeScript(`
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { rtl: false });
    `);
    await driver.wait(until.elementLocated(By.css('.codeflask__textarea:not([dir="rtl"])')));
    await driver.wait(until.elementLocated(By.css('.codeflask__pre:not([dir="rtl"])')));
  });

  it('should NOT enable rtl when rtl not set', async function () {
    await driver.executeScript(`
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { language: 'js' });
    `);
    await driver.wait(until.elementLocated(By.css('.codeflask__textarea:not([dir="rtl"])')));
    await driver.wait(until.elementLocated(By.css('.codeflask__pre:not([dir="rtl"])')));
  });
});