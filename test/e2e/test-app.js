'use strict'

const expect = require('chai').expect;

describe('Sample test', () => {
  it('Getting title from Google', () => {
    const title = browser.url('https://google.com/').getTitle();
    expect(title).to.be.equals('Google');
  });
});