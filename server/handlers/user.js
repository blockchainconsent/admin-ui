/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const { FORGOT_PWD_URL } = require('../constants/network');
const axios = require('../helpers/axiosClient');
const logger = require('../config/logger').getLogger('auth-handler');

exports.forgotPassword = async (request, response) => {
  try {
    const client = axios.getClient(request);
    const { status } = await client.post(FORGOT_PWD_URL, { userId: request.body.email });

    return response.status(status).send({ message: 'Email sent successfully. Please check your email' });
  } catch (error) {
    logger.error(`Forgot password request failed: ${error.message}`);
    return response.status(error.response.status).send({ message: 'Failed to send email. Try again later' });
  }
};
