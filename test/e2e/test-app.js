'use strict'

const expect = require('chai').expect;

require('../test-server');

describe('Sample test', () => {
  it('Getting title from Google', () => {
    const title = browser.url('http://localhost:8888/').getTitle();
    expect(title).to.be.equals('Google');
  });
});