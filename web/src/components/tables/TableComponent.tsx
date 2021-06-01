import DataTable from "react-data-table-component";
import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

interface TableProps {
  filter?: boolean;
  query?: any;
  variables?: any;
  buttonName?: string;
  handler?: any;
  columns?: any;
  modal?: any;
  expandedComponent?: any;
}

export const TableComponent = (props: TableProps) => {
  let variables = props.variables;
  const [resetPaginationToggle, _] = useState(false);

  console.log(props)
  const [{ fetching, data }] = props.query({ variables: props.variables });
  console.log("Table Contents\n" + data);

    props.handler.forEach((item) => {
      const handler = (row) => {
        if (props.modal) props.modal.onOpen();
        item(row);
      };

      props.columns.push({
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => handler(row)}>
            {item.name}
          </Button>
        ),
      });
    });
  let body = null;
  if (fetching) body = <p>loading...</p>;
  else if (!data) body = <p>Null data...</p>;
  else {
    let values = Object.values(data)[0];
    if (!values) values = [];

    body = (
      <Box>
        <DataTable
          //@ts-ignore
          data={values}
          columns={props.columns}
          expandableRowsComponent={props.expandedComponent}
        />
      </Box>
    );
  }

  return body;
};
