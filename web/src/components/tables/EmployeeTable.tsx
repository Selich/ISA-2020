import React, {useState} from "react";
import { useRemoveEmployeeMutation, useEmployeesQuery, } from "../../generated/graphql";
import {TableComponent} from './TableComponent'


export const EmployeeTable = ({handler,action,kind, pharmacy}): JSX.Element => {
	const variables = { inputs: { role:  "any" } }
	let columns = [
		{ name: "FirstName", selector: "firstName", sortable: true },
		{ name: "LastName", selector: "lastName", sortable: true },
		{ name: "Email", selector: "email", sortable: true },
		{ name: "Role", selector: "role", sortable: true },
	];
  const [, removeEmployee] = useRemoveEmployeeMutation();

	return	<TableComponent 
			query={useEmployeesQuery}
			variables={variables}
			handler={removeEmployee}
			columns={columns}
			buttonName={'Remove'}
		/>
};

