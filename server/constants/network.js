/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

exports.REQUEST_HEADERS = {
  TRANSACTION_ID: 'x-cm-txn-id',
  PATIENT_ID: 'x-cm-patientid',
};

exports.LOGIN_URL = '/simple-consent/api/v1/users/login';
exports.FORGOT_PWD_URL = '/simple-consent/api/v1/users/forgotPassword';
exports.CONSENT_URL = '/simple-consent/api/v1/consent/query';
exports.PATIENT_DATA_URL = '/simple-consent/api/v1/consent/patient';
