/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import axios from 'axios';
import { v4 as uuid } from 'uuid';

import {
  LOGOUT_URL, LOGIN_URL, CONSENT_URL, PATIENT_URL, FORGOT_PWD_URL,
} from '../constants/paths';
import REQUEST_HEADERS from '../constants/network';

axios.interceptors.request.use(
  (request) => {
    const txId = uuid(); // generate a UUID for this transaction
    request.headers[REQUEST_HEADERS.TRANSACTION_ID] = txId;

    document.body.classList.add('loading-indicator'); // show loading spinner

    // log txID request method and URL to the console
    console.log(`[${txId}] - ${request.method} ${request.url}`);

    return request;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    document.body.classList.remove('loading-indicator'); // hide loading spinner
    const txID = response.config.headers[REQUEST_HEADERS.TRANSACTION_ID];

    // log txID response status to the console
    console.log(`[${txID}] - ${response.status}`);

    return response;
  },
  (error) => {
    const txID = error.response.config.headers[REQUEST_HEADERS.TRANSACTION_ID];
    // log txID error status to the console
    console.error(`[${txID}] - ${error.response.status}`);

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // handle timeout or unauthorized
      // DO SOMETHING
    }

    document.body.classList.remove('loading-indicator'); // hide loading spinner

    return Promise.reject(error);
  },
);

// Define your routes to the Gateway here.  It's a good practice to centeralize all of your API calls here
// and import these into your pages in /pages
// (avoid importing into components in /components - this lead to poor application state management):

export const login = async (email, password) => axios.post(
  LOGIN_URL,
  { email, password },
  { withCredentials: true },
);
export const forgotPW = async (email) => axios.post(FORGOT_PWD_URL, { email });
export const logout = async () => axios.get(LOGOUT_URL, { withCredentials: true });

export const fetchConsent = async (searchID) => axios.post(CONSENT_URL, {}, { headers: { 'x-cm-patientid': searchID } });
export const fetchPatientData = async (searchID) => axios.get(PATIENT_URL, { headers: { 'x-cm-patientid': searchID } });
