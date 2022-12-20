/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

// NOTE:for production, EXPRESS_SERVER is '' which makes the urls relative,
// thus allowing the router in the server to handle the request
// for dev, EXPRESS_SERVER is typically 'http://localhost:5000' or whever the Server Node Express instance is running
// Note: create-react-app prefixes commandline environment variables with `REACT_APP_` by default. https://create-react-app.dev/docs/adding-custom-environment-variables/
export const SERVER_ROOT = '';

// API calls
export const LOGIN_URL = `${SERVER_ROOT}/api/login`;
export const LOGOUT_URL = `${SERVER_ROOT}/api/logout`;
export const FORGOT_PWD_URL = `${SERVER_ROOT}/api/forgotPassword`;

export const CONSENT_URL = `${SERVER_ROOT}/api/consent`;
export const PATIENT_URL = `${SERVER_ROOT}/api/consent/patient`;
