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

  // it('should enable syntax highlight', function () {
  //   expect(browser.isExisting('.codeflask .token.punctuation')).to.be.true;
  // });

  // it('should render lineNumbers', function () {
  //   expect(browser.isExisting('.codeflask .codeflask__lines')).to.be.true;
  //   expect(browser.isExisting('.codeflask .codeflask__lines__line')).to.be.true;
  // });
  
  // it('should have same lineNumbers as lines of code', function () {
  //   const editor = $('.codeflask__textarea');
  //   expect(browser.isExisting('.codeflask .codeflask__lines_SUPER_ERROR_HERE')).to.be.true;
  //   const lines = $$('.codeflask .codeflask__lines__line');
  //   expect(lines.length).to.equal(2);
  // });
});