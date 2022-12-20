/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import styled from 'styled-components';

const AdminPage = styled.div`
   display: flex;
   flex: 1 1 auto;
   flex-direction: column;
   margin: 2rem;
 `;

const PageHeader = styled.h1`
   margin-bottom: 1rem;
   font-weight: 400;
   
 `;

const SubHeader = styled.h3`
 `;

const SearchContainer = styled.div`
   display:flex;
   flex-direction: column;
   flex: 1 1 auto;
   margin: 1rem 0rem;
 
   .bx--search {
     width: 300px;
     min-width: 300px;
     max-width: 300px;
   }
 
   label {
     margin-bottom: .5rem;
   }
 `;

const PatientSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 0 0 auto;
 `;

const ResultContainer = styled.div`
    flex-direction: column;
    display: flex;
    overflow: hidden;
 `;

const NoResults = styled.div`
   padding: 1rem .3rem;
 `;

const DatatableContainer = styled.div`
  display:flex;
  overflow: hidden;
 `;

const Datatable = styled.div`
  overflow: scroll;
 `;

const Maindiv = styled.div`
  overflow: hidden;
  display: flex;
 `;

const S = {
  AdminPage,
  PageHeader,
  SubHeader,
  SearchContainer,
  PatientSummaryContainer,
  ResultContainer,
  NoResults,
  DatatableContainer,
  Datatable,
  Maindiv,
};

export default S;
