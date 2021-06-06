import {
  Box, Button
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React from "react";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
import {
  useEmployeesQuery, useRemoveEmployeeMutation
} from "../../generated/graphql";

export const AdminEmployeeTable = (): JSX.Element => {
  const token = Cookies.get('token')
  const [{ fetching, data }] = useEmployeesQuery({
    variables: {
      inputs: {
        role: "any",
      },
      token: token
    },
  });
  const [, removeEmployee] = useRemoveEmployeeMutation();

  const columns = [
    { name: "FirstName", selector: "firstName", sortable: true },
    { name: "LastName", selector: "lastName", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    { name: "Role", selector: "role", sortable: true },
    {
      name: "",
      button: true,
      cell: row => (
        <Button size="sm" onClick={() => remove(row)} colorScheme="red">
          Remove
        </Button>
      ),
    },
  ];
  const remove = (row) => {
    handleRemove(row, removeEmployee);
  };
  const handleRemove = async (row, removeEmployee) => {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete user " + row.firstName + " " + row.lastName,
      icon: "warning",
      //@ts-ignore
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
				let inputs = row
        removeEmployee(row.id);
        swal("User removed", {
          icon: "success",
        });
      }
    });
  };

  let body = null;
  if (fetching) body = <p>loading...</p>;
  if (data)
    body = (
      <Box>
        <DataTable data={data.employees} columns={columns} selectableRows />
      </Box>
    );

  return body;
};
