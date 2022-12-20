/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  DataTable as DTable,
  DataTableSkeleton,
  Pagination,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';
import moment from 'moment';

import S from './DataTable.styles';

const DataTable = ({ rows: data, headers: headerData, title }) => {
  const [{ startIndex, endIndex }, setIndices] = useState({ startIndex: 0, endIndex: 10 });

  const processCell = (cell) => {
    const getField = () => (
      <TableCell key={cell.id}>
        {cell.value}
      </TableCell>
    );
    const getDate = () => {
      const cellID = cell.id.split(':')[1];
      const dateString = cellID === 'endDate'
        ? moment.unix(cell.value).local().format('DD-MM-YYYY')
        : moment(cell.value).local().format('DD-MM-YYYY');

      const date = (cellID === 'endDate' && cell.value === 0) ? '---' : dateString;
      return (
        <TableCell key={cell.id}>
          {date}
        </TableCell>
      );
    };
    switch (cell.info.header) {
      case 'startDate':
        return getDate();
      case 'endDate':
        return getDate();
      default:
        return getField();
    }
  };

  return (
    <S.Table>
      {data && (
      <DTable rows={data} headers={headerData} isSortable>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          getTableContainerProps,
        }) => (
          <TableContainer
            title={title}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getTableContainerProps()}
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(startIndex, endIndex).map((row) => (
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell, index, cells) => processCell(cell, cells, row.id))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination
              backwardText="Previous page"
              forwardText="Next page"
              itemsPerPageText="Items per page:"
              page={1}
              pageNumberText="Page Number"
              pageSize={10}
              pageSizes={[10, 20, 30, 40, 50]}
              totalItems={rows.length}
              onChange={({ page, pageSize }) => {
                setIndices({
                  startIndex: page * pageSize - pageSize,
                  endIndex: page * pageSize,
                });
              }}
            />
          </TableContainer>
        )}
      </DTable>
      )}

      {!data && <DataTableSkeleton zebra />}
    </S.Table>
  );
};

DataTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

export default DataTable;
