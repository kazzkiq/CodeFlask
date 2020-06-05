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
    expect($('.codeflask').isExisting()).to.be.true;
    expect($('.codeflask__pre').isExisting()).to.be.true;
    expect($('.codeflask__textarea').isExisting()).to.be.true;
    expect($('.codeflask__code').isExisting()).to.be.true;
    expect($('.codeflask__flatten').isExisting()).to.be.true;
    expect($('.codeflask__flatten').isExisting()).to.be.true;
  });

  it('should enable syntax highlight', function () {
    expect($('.codeflask .token.punctuation').isExisting()).to.be.true;
  });

  it('should render lineNumbers', function () {
    expect($('.codeflask .codeflask__lines').isExisting()).to.be.true;
    expect($('.codeflask .codeflask__lines__line').isExisting()).to.be.true;
  });

  it('should have same lineNumbers as lines of code', function () {
    $('.codeflask__textarea').setValue('let it = "go";\nconst parrot = "bird";');
    expect($('.codeflask .codeflask__lines').isExisting()).to.be.true;
    const lines = $$('.codeflask .codeflask__lines__line');
    expect(lines.length).to.equal(2);
  });

  it('should update editor upon update', function () {
    $('.codeflask__textarea').setValue('let it = "go";');
    expect($('.codeflask .token.keyword').isExisting()).to.be.true;
    expect($('.codeflask .token.operator').isExisting()).to.be.true;
    expect($('.codeflask .token.string').isExisting()).to.be.true;
    expect($('.codeflask .token.punctuation').isExisting()).to.be.true;
  });

  it('should be instance of CodeFlask', function () {
    const isInstance = browser.execute(() => {
      return flask instanceof CodeFlask
    });
    expect(isInstance).to.be.true;
  });

  it('.updateCode(): should update lineNumbers', function () {
    browser.execute(() => { flask.updateCode("let age = 20"); });
    const lines = $$('.codeflask .codeflask__lines__line');
    expect(lines.length).to.equal(1);
  });

  it('.updateCode(): should update lineNumbers for multiple lines', function () {
    browser.execute(() => { flask.updateCode("let age = 20\nlet lines = 2"); });
    const lines = $$('.codeflask .codeflask__lines__line');
    expect(lines.length).to.equal(2);
  });

  it('.onUpdate(): should execute callback upon user interaction', function () {
    $('.codeflask__textarea').setValue('');
    browser.execute(() => { flask.onUpdate(code => document.title = code) });
    $('.codeflask__textarea').setValue('let it = "go";');
    const title = browser.getTitle();
    expect(title).to.be.equals('let it = "go";')
  });

  it('should enable rtl when rtl: true', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { rtl: true });
    });
    expect($('.codeflask__textarea[dir="rtl"]').isExisting()).to.be.true;
    expect($('.codeflask__pre[dir="rtl"]').isExisting()).to.be.true;
  });

  it('should NOT enable rtl when rtl: false', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { rtl: false });
    });
    expect($('.codeflask__textarea:not([dir="rtl"])').isExisting()).to.be.true;
    expect($('.codeflask__pre:not([dir="rtl"])').isExisting()).to.be.true;
  });

  it('should NOT enable rtl when rtl not set', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { language: 'js' });
    });
    expect($('.codeflask__textarea:not([dir="rtl"])').isExisting()).to.be.true;
    expect($('.codeflask__pre:not([dir="rtl"])').isExisting()).to.be.true;
  });

  it('.getCode(): should return current code', function () {
    $('.codeflask__textarea').setValue('return "my code here"');
    const code = browser.execute(() => { return flask.getCode(); });
    expect(code).to.be.equals('return "my code here"');
  });

  it('should add an ID attribute with option', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { areaId: 'thing1' });
    });
    expect($('.codeflask__textarea#thing1').isExisting()).to.be.true;
  });

  it('should add an aria-labelledby attribute with option', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { ariaLabelledby: 'thing2' });
    });
    expect($('.codeflask__textarea[aria-labelledby="thing2"]').isExisting()).to.be.true;
  });

  it('should add a readonly attribute with option', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { readonly: true });
    });

    expect($('.codeflask__textarea[readonly]').isExisting()).to.be.true;
  });

  it('should not add a readonly attribute with option if it is set to false', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { readonly: false });
    });

    expect($('.codeflask__textarea:not([readonly])').isExisting()).to.be.true;
  });

  it('should not add a readonly attribute with option if it is not set', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { });
    });

    expect($('.codeflask__textarea:not([readonly])').isExisting()).to.be.true;
  });

  it('should add a readonly attribute from a function call', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, {});
      flask_test.enableReadonlyMode();
    });

    expect($('.codeflask__textarea[readonly]').isExisting()).to.be.true;
  });

  it('should remove a readonly attribute from a function call', function () {
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      const flask_test = new CodeFlask(test_div, { readonly: true });
      flask_test.disableReadonlyMode();
    });

    expect($('.codeflask__textarea:not([readonly])').isExisting()).to.be.true;
  });

  it('should not add line by press enter when editor is readonly', function () {
    browser.execute(() => {
      // remove all existing editors
      document.body.innerHTML = '';
      const rootEl = document.createElement('div');
      document.body.appendChild(rootEl);

      new CodeFlask(rootEl, { readonly: true, lineNumbers: true });
      rootEl.querySelector('.codeflask .codeflask__textarea').dispatchEvent(new KeyboardEvent('keydown',{ key: 'Enter', keyCode: 13 }));
    });

    const lines = $$('.codeflask .codeflask__lines__line');
    expect(lines.length).to.equal(1);
  });

  xit('should handle the tab key in the editor', function () {
    let flask_test
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      flask_test = new CodeFlask(test_div, { handleTabs: true });
    });
    $('.codeflask__textarea').setValue('hi\thello after');
    const code = browser.execute(() => { return flask.getCode(); });
    expect(code).to.be.equals('hi\thello after');
  });

  xit('should not handle the tab key in the editor with handleTabs=false option', function () {
    let flask_test
    browser.execute(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      flask_test = new CodeFlask(test_div, { handleTabs: false });
    });
    $('.codeflask__textarea').setValue('hi before tab\thello after');
    const code = browser.execute(() => { return flask.getCode(); });
    expect(code).to.be.equals('hi before tab');
  });
});
