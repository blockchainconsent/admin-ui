/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import styled from 'styled-components';

const PatientSummary = styled.div`
   border: 1px solid #d3d3d3;
   box-shadow: 5px 5px 5px #d3d3d3;
   padding: 1rem;
   margin: 1rem 0;
 
   /* display: inline-block; */
 
   label {
     font-weight: 600;
     margin-right: .5rem;
   }
   div+div{
     padding-top: .5rem;
   }
 `;

const PatientData = styled.div`
   
 `;

const PatientEmail = styled.div`
 `;

const PatientID = styled.div`
 `;

const PatientName = styled.div`
 `;
const PatientResult = styled.h3`
`;

const S = {
  PatientSummary,
  PatientName,
  PatientID,
  PatientEmail,
  PatientData,
  PatientResult,
};

export default S;
