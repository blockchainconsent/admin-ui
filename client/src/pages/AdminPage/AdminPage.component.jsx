/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { InlineLoading, Search } from 'carbon-components-react';
import DataTable from '../../components/DataTable/DataTable';
import PatientSummary from '../../components/PatientSummary/PatientSummary';

import S from './AdminPage.styles';
import useDebounce from '../../hooks/useDebounce';
import { fetchConsent, fetchPatientData } from '../../services/dataServices';

function AdminPage() {
  const [searchTerm, setSearchTerm] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [patientData, setPatientData] = useState();
  const history = useHistory();

  const { t } = useTranslation();
  const SEARCH = t('nls.ADMIN_PAGE.search');
  const SEARCH_LABEL = t('nls.ADMIN_PAGE.search_label');
  const NO_MATCHES = t('nls.ADMIN_PAGE.noMatches');
  const NO_CONSENTS = t('nls.ADMIN_PAGE.noConcentsFound');
  const TABLE_LABEL = t('nls.ADMIN_PAGE.table_label');
  const SEARCH_PLACEHOLDER = t('nls.ADMIN_PAGE.searchPlaceholder');
  const TABLECOL_TARGET = t('nls.ADMIN_PAGE.col_target');
  const TABLECOL_PERMISSION = t('nls.ADMIN_PAGE.col_permission');
  const TABLECOL_STARTDATE = t('nls.ADMIN_PAGE.col_startDate');
  const TABLECOL_ENDDATE = t('nls.ADMIN_PAGE.col_endDate');
  const SEARCHING = t('nls.ADMIN_PAGE.searching');

  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // wait for 1 second of inactivity before setting the value

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);

      Promise.allSettled([fetchPatientData(debouncedSearchTerm), fetchConsent(debouncedSearchTerm)])
        .then(
          (response) => {
            if (response[0].status === 'fulfilled') {
              setPatientData(response[0].value.data);
            } else {
              setPatientData(undefined); // clear out previous data if the current request wasn't successful
            }

            if (response[1].status === 'fulfilled') {
              setResults(response[1].value.data);
            } else if (response[1].reason.response.status === 401) {
              history.push('/logout');
            } else {
              setResults(undefined); // clear out previous data if the current request wasn't successful
            }
          },
        )
        .catch((error) => {
          throw new Error(error);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
  }, [debouncedSearchTerm, history]);

  const headers = [
    {
      header: TABLECOL_TARGET,
      key: 'target',
    },
    {
      header: TABLECOL_PERMISSION,
      key: 'permissions',
    },
    {
      header: TABLECOL_STARTDATE,
      key: 'startDate',
    },
    {
      header: TABLECOL_ENDDATE,
      key: 'endDate',
    },
  ];

  return (
    <S.Maindiv>
      <S.AdminPage>
        <S.SearchContainer className="__auto_search_container">
          <S.PageHeader>{SEARCH}</S.PageHeader>
          <label>{SEARCH_LABEL}</label>

          <Search
            labelText=""
            id="search"
            placeholder={SEARCH_PLACEHOLDER}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isSearching && (
          <InlineLoading
            description={SEARCHING}
          />
          )}
        </S.SearchContainer>

        {!isSearching && searchTerm && (
        <S.ResultContainer className="__auto_resultsContainer">
          <S.PatientSummaryContainer className="__auto_patientSummary">
            {patientData && <PatientSummary patientData={patientData} patientID={debouncedSearchTerm} />}
            {(!patientData) && <S.NoResults>{NO_MATCHES}</S.NoResults>}

            {patientData && (!results || results.length === 0) && <S.NoResults>{NO_CONSENTS}</S.NoResults>}
          </S.PatientSummaryContainer>

          <S.DatatableContainer className="__auto_resultsTable">
            {results && results.length > 0
              && (
              <DataTable
                title={TABLE_LABEL}
                rows={results}
                headers={headers}
              />
              )}

          </S.DatatableContainer>

        </S.ResultContainer>
        )}

      </S.AdminPage>
    </S.Maindiv>
  );
}

export default AdminPage;
