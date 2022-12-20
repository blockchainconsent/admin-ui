/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const axios = require('axios');
const logger = require('../config/logger').getLogger('axios');
const tlsHelper = require('../utils/tls-helper');
const { REQUEST_HEADERS } = require('../constants/network');

function getClient(request) {
  const token = request.cookies ? request.cookies.accessTokenGH : '';

  const txnid = request.headers[REQUEST_HEADERS.TRANSACTION_ID];

  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    httpsAgent: tlsHelper.getAgentHeaderForSelfSignedCerts(),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      [REQUEST_HEADERS.TRANSACTION_ID]: txnid,
    },
  });

  axiosInstance.interceptors.request.use(
    (req) => {
      const { method, url, headers } = req;
      const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

      logger.addContext('txnid', transactionID);
      logger.debug(`Request: ${method} ${url}`);
      return req;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      const { method, url, headers } = res.config;
      const { status, statusText } = res;
      const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

      logger.addContext('txnid', transactionID);
      logger.debug(`Response: ${method} ${url}: ${status} - ${statusText}`);
      return res;
    },
    (error) => {
      if (error.config) {
        const { method, url, headers } = error.config;
        const { status, statusText } = error.response || { status: error.code, statusText: error.message };
        const transactionID = headers[REQUEST_HEADERS.TRANSACTION_ID];

        logger.addContext('txnid', transactionID);
        logger.error(`Response: ${method} ${url}: ${status} - ${statusText}`);
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}

module.exports = {
  getClient,
};
