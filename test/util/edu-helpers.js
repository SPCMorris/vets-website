const request = require('request');
const E2eHelpers = require('./e2e-helpers');

// Disable eslint for JSON
/* eslint-disable */
const data = {};
/* eslint-enable */

// Create API routes
function initApplicationSubmitMock() {
  request({
    uri: `${E2eHelpers.apiUrl}/mock`,
    method: 'POST',
    json: {
      path: '/api/edu-benefits',
      verb: 'get',
      value: data
    }
  });
}

module.exports = {
  data,
  initApplicationSubmitMock
};
