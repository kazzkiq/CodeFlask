const baseURL = 'http://localhost:5173'
const config = {
  webServer: {
    url: baseURL,
    command: 'yarn dev',
  },
  use: {
    baseURL,
  },
};
module.exports = config;
