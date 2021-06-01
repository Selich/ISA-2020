import { Text, SimpleGrid, Box, Button, Avatar } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Cookies from "js-cookie";
import { useAppointmentsByUserQuery } from "../../generated/graphql";
import { useRateMutation } from "../../generated/graphql";
import { useScheduleMutation } from "../../generated/graphql";
import { useUnscheduleMutation } from "../../generated/graphql";
import { TableComponent } from "./TableComponent";

interface TableProps {
  filter?: boolean;
  query?: any;
  variables?: any;
  buttonName?: string;
  handler?: any;
  columns?: any;
  modal?: any;
  expandedComponent?: any;
  kind?: any;
  pharmacy?: any;
}



export const AppointmentsTable = (props: TableProps) => {
  let token = Cookies.get("token");
	const columns = [
		{ name: "Price", selector: "price", sortable: true },
		{ name: "Date", selector: "begin", sortable: true },
		{ name: "Rating", selector: "employee.averageRating", sortable: true },
		{ name: "Doctor", selector: "employee.lastName", sortable: true },
	];

  return (
		<>
    <TableComponent
      query={useAppointmentsByUserQuery}
      handler={props.handler}
      variables={{token:token, inputs: props.variables}}
      columns={columns}
      buttonName={props.buttonName}
    />
</>
  );
};
