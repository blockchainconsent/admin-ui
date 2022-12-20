/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const { LOGIN_URL } = require('../constants/network');
const axios = require('../helpers/axiosClient');
const logger = require('../config/logger').getLogger('auth-handler');

const isProduction = process.env.NODE_ENV !== 'development';

exports.login = async (request, response) => {
  try {
    // Obtain access token
    const client = axios.getClient(request);
    const { status, data } = await client.post(LOGIN_URL, request.body);

    if (status === 200) {
      const { access_token: accessToken, expires_in: expiresIn, scope } = data;

      // Set cookie
      response.cookie('accessTokenGH', accessToken, {
        maxAge: expiresIn * 1000,
        secure: isProduction,
        httpOnly: true,
        sameSite: isProduction ? 'Strict' : false,
      });

      return response.status(status).send({ message: 'Login successfully', scope });
    }
    return response.status(status);
  } catch (error) {
    logger.error(`Login request failed: ${error.message}`);
    return response.status(400).send({ message: 'Failed to login, invalid authentication values' });
  }
};

exports.logout = async (request, response) => {
  response.clearCookie('accessTokenGH');
  return response.status(200).send({ message: 'Logged out' });
};
