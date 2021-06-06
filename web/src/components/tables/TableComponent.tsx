import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Loading } from "../Loading";

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
  let loaded = false
  const [resetPaginationToggle, _] = useState(false);

  useEffect(() => {
    if(!loaded){
    props.handler.forEach((item) => {
      const handler = (row) => {
        if (props.modal) props.modal.onOpen();
        item(row);
      };

      props.columns.push(
        {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => handler(row)}>
            {item.name}
          </Button>
        ),
      }
      );
    });
    loaded = true

    }
  }, [loaded])

  const [{ fetching, data }] = props.query({ variables: props.variables });
  console.log("Table Contents\n" + data);

  let body = null;
  if (fetching) body = <Loading/>;
  else if (!data) body = <Loading/>;
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
