'use strict'

exports.config = {
  port: 9515,
  path: '/',
  specs: [
    './test/e2e/*.js'
  ],
  exclude: [],
  maxInstances: 2, // it depends on the plan of the cloud service
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
  },
  capabilities: [
    {
      browserName: 'chrome',
      "goog:chromeOptions": {
        args: ['--headless', '--disable-gpu', '--window-size=1280,800']
      }
    }
  ],
  services: ['chromedriver']
}
