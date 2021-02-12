import {
  Center,
  HStack,
  SimpleGrid,
  Select,
  FormLabel,
  Switch,
  Input,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Link,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  useRemoveEmployeeMutation,
  useEmployeesQuery,
} from "../../generated/graphql";
import DataTable from "react-data-table-component";
import swal from "sweetalert";

export const EmployeeTable = (): JSX.Element => {
  const [{ fetching, data }] = useEmployeesQuery({
    variables: {
      inputs: {
        role: "any",
      },
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
