import Cookies from "js-cookie";
import React from "react";
import { useAppointmentsQuery } from "../../generated/graphql";
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
      query={useAppointmentsQuery}
      handler={props.handler}
      variables={{token:token, inputs: props.variables}}
      columns={columns}
      buttonName={props.buttonName}
    />
</>
  );
};
