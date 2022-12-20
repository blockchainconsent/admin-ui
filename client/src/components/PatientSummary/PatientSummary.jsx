/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import S from './PatientSummary.styles';

const PatientSummary = ({ patientData, patientID }) => {
  const { t } = useTranslation();
  const LBL_EMAIL = t('nls.PATIENT_SUMMARY.email');
  const LBL_PATIENT_ID = t('nls.PATIENT_SUMMARY.patientId');
  const RESULTS_HEADING = t('nls.PATIENT_SUMMARY.result_heading');

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const {
      email, prefix, given, family,
    } = patientData;
    const prefixStr = (prefix) ? prefix.join(' ') : '';
    const givenStr = (given) ? given.join(' ') : '';
    const familyStr = (family) || '';
    const nameArray = [prefixStr, givenStr, familyStr];
    const name = nameArray.join(' ').trim();

    setName(name);
    setEmail(email);
  }, [patientData]);

  return (
    <>
      {(name || email) && <S.PatientResult>{RESULTS_HEADING}</S.PatientResult>}
      {
        (name || email) && (
          <S.PatientSummary className="__auto_patient_summary">
            <S.PatientData>
              {name && (
                <S.PatientName>
                  {`${name} `}
                </S.PatientName>
              )}
              {patientID && <S.PatientID> <label>{LBL_PATIENT_ID}</label> {patientID} </S.PatientID>}
              {email && <S.PatientEmail> <label>{LBL_EMAIL}</label> {email} </S.PatientEmail>}
            </S.PatientData>
          </S.PatientSummary>
        )
      }
    </>
  );
};

export default PatientSummary;
