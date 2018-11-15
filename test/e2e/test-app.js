'use strict'

const expect = require('chai').expect;

const server = require('../test-server');

describe('CodeFlask Tests', () => {
  before(() => {
    browser.url('http://localhost:8888/');
  });

  after(() => {
    server.close();
  });

  it('should open page', () => {
    const title = browser.getTitle();
    const url = browser.getUrl();
    expect(title).to.be.equals('CodeFlask Test Page');
    expect(url).to.be.equals('http://localhost:8888/');
  });

  it('should create editor elements', function () {
    expect(browser.isExisting('.codeflask')).to.be.true;
    expect(browser.isExisting('.codeflask__pre')).to.be.true;
    expect(browser.isExisting('.codeflask__textarea')).to.be.true;
    expect(browser.isExisting('.codeflask__code')).to.be.true;
    expect(browser.isExisting('.codeflask__flatten')).to.be.true;
    expect(browser.isExisting('.codeflask__flatten')).to.be.true;
  });

  it('should enable syntax highlight', function () {
    expect(browser.isExisting('.codeflask .token.punctuation')).to.be.true;
  });

  it('should render lineNumbers', function () {
    expect(browser.isExisting('.codeflask .codeflask__lines')).to.be.true;
    expect(browser.isExisting('.codeflask .codeflask__lines__line')).to.be.true;
  });

  it('should have same lineNumbers as lines of code', function () {
    $('.codeflask__textarea').setValue('let it = "go";\nconst parrot = "bird";');
    expect(browser.isExisting('.codeflask .codeflask__lines')).to.be.true;
    const lines = $$('.codeflask .codeflask__lines__line');
    expect(lines.length).to.equal(2);
  });

  it('should update editor upon update', async function () {
    $('.codeflask__textarea').setValue('let it = "go";');
    expect(browser.isExisting('.codeflask .token.keyword'));
    expect(browser.isExisting('.codeflask .token.operator'));
    expect(browser.isExisting('.codeflask .token.string'));
    expect(browser.isExisting('.codeflask .token.punctuation'));
  });

  it('should be instance of CodeFlask', async function () {
    const isInstance = browser.execute(() => { return flask instanceof CodeFlask });
    expect(isInstance.value).to.be.true;
  });

  it('.updateCode(): should update lineNumbers', async function () {
    browser.execute(() => { flask.updateCode("let age = 20"); });
    const lines = $$('.codeflask .codeflask__lines__line');
    expect(lines.length).to.equal(1);
  });

  it('.updateCode(): should update lineNumbers for multiple lines', async function () {
    browser.execute(() => { flask.updateCode("let age = 20\nlet lines = 2"); });
    const lines = $$('.codeflask .codeflask__lines__line');
    expect(lines.length).to.equal(2);
  });

  it('.onUpdate(): should execute callback upon user interaction', async function () {
    $('.codeflask__textarea').setValue('');
    browser.execute(() => { flask.onUpdate(code => document.title = code) });
    $('.codeflask__textarea').setValue('let it = "go";');
    browser.getTitle('let it = "go";');
  });

  it('should enable rtl when rtl: true', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { rtl: true });
    });
    expect(browser.isExisting('.codeflask__textarea[dir="rtl"]'));
    expect(browser.isExisting('.codeflask__pre[dir="rtl"]'));
  });

  it('should NOT enable rtl when rtl: false', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { rtl: false });
    });
    expect(browser.isExisting('.codeflask__textarea:not([dir="rtl"])'));
    expect(browser.isExisting('.codeflask__pre:not([dir="rtl"])'));
  });

  it('should NOT enable rtl when rtl not set', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { language: 'js' });
    });
    expect(browser.isExisting('.codeflask__textarea:not([dir="rtl"])'));
    expect(browser.isExisting('.codeflask__pre:not([dir="rtl"])'));
  });

  it('.getCode(): should return current code', async function () {
    $('.codeflask__textarea').setValue('return "my code here"');
    const code = browser.execute(() => { return flask.getCode(); });
    expect(code.value).to.be.equals('return "my code here"');
  });

  it('should add an ID attribute with option', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { areaId: 'thing1' });
    });
    expect(browser.isExisting('.codeflask__textarea#thing1'));
  });

  it('should add an aria-labelledby attribute with option', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { ariaLabelledby: 'thing2' });
    });
    expect(browser.isExisting('.codeflask__textarea[aria-labelledby="thing2"]'));
  });

  it('should add a readonly attribute with option', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { readonly: true });
    });

    expect(browser.isExisting('.codeflask__textarea[readonly]'));
  });

  it('should not add a readonly attribute with option if it is set to false', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { readonly: false });
    });

    expect(browser.isExisting('.codeflask__textarea:not([readonly])'));
  });

  it('should not add a readonly attribute with option if it is not set', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { });
    });

    expect(browser.isExisting('.codeflask__textarea:not([readonly])'));
  });

  it('should add a readonly attribute from a function call', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, {});
      flask_test.enableReadonlyMode();
    });

    expect(browser.isExisting('.codeflask__textarea[readonly]'));
  });

  it('should remove a readonly attribute from a function call', async function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { readonly: true });
      flask_test.disableReadonlyMode();
    });

    expect(browser.isExisting('.codeflask__textarea:not([readonly])'));
  });

  xit('should handle the tab key in the editor', async function () {
    let flask_test
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      flask_test = new CodeFlask(test_div, { handleTabs: true });
    });
    $('.codeflask__textarea').setValue('hi\thello after');
    const code = browser.execute(() => { return flask.getCode(); });
    expect(code.value).to.be.equals('hi\thello after');
  });

  xit('should not handle the tab key in the editor with handleTabs=false option', async function () {
    let flask_test
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      flask_test = new CodeFlask(test_div, { handleTabs: false });
    });
    $('.codeflask__textarea').setValue('hi before tab\thello after');
    const code = browser.execute(() => { return flask.getCode(); });
    expect(code.value).to.be.equals('hi before tab');
  });
});
