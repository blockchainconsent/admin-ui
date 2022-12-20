/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const { CONSENT_URL, PATIENT_DATA_URL } = require('../constants/network');
const axios = require('../helpers/axiosClient');
const logger = require('../config/logger').getLogger('consent-handler');

exports.fetchConsent = async (request, response) => {
  const getConsents = (client, patientId, bookmark) => (bookmark
    ? client.get(`${CONSENT_URL}?bookmark=${bookmark}`, { headers: { 'x-cm-patientid': patientId } })
    : client.get(CONSENT_URL, { headers: { 'x-cm-patientid': patientId } }));

  try {
    const client = axios.getClient(request);
    const patientId = request.headers['x-cm-patientid'];

    if (!client) {
      return response.status(400).send({ message: 'Failed to fetch consent: invalid axios client reference.' });
    }

    if (!patientId) {
      return response.status(400).send({ message: 'Patient ID was not provided in the request header.' });
    }

    const consentsArr = [];
    let status;

    const allConsents = async (consentsArray, bookmark) => {
      const responseConsents = await getConsents(client, patientId, bookmark);
      if (responseConsents.data.payload.length) {
        responseConsents.data.payload.forEach((consent) => consentsArray.push(consent));
        await allConsents(consentsArray, responseConsents.data.bookmark);
      }
      status = responseConsents.data.status;
    };

    await allConsents(consentsArr);

    const dataWithId = consentsArr.map((row) => ({
      id: row.ConsentID,
      target: row.ServiceID,
      permissions: `${row.ConsentOption.join(', ')} access to ${row.DatatypeIDs.join(', ')}`,
      startDate: row.Creation,
      endDate: row.Expiration,
    }));

    return response.status(status).send(dataWithId);
  } catch (error) {
    logger.error(`fetchConsent failed: ${error.message}`);
    return response.status(error.response.status).send({ message: 'Failed to fetch consent' });
  }
};

exports.fetchPatientData = async (request, response) => {
  try {
    const client = axios.getClient(request);
    const patientId = request.headers['x-cm-patientid'];

    if (!client) {
      response.status(400).send({ message: 'Failed to fetch consent: invalid axios client reference.' });
    }

    if (!patientId) {
      response.status(400).send({ message: 'Patient ID was not provided in the request header.' });
    }

    const { status, data } = await client.get(PATIENT_DATA_URL, { headers: { 'x-cm-patientid': patientId } });

    return response.status(status).send(data.payload || data);
  } catch (error) {
    logger.error(`fetchPatientData failed: ${error.message}`);
    return response.status(error.response.status).send({ message: 'Failed to fetch patient metadata' });
  }
};
