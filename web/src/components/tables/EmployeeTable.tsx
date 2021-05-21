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

export const EmployeeTable = ({kind}): JSX.Element => {
  const [{ fetching, data }] = useEmployeesQuery({
    variables: {
      inputs: {
        role: (kind) ? kind : "any",
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
        <Button size="sm" onClick={() => handleSelect(row)} colorScheme="red">
          Remove
        </Button>
      ),
    },
  ];
  const handleSelect = async (row) => {
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
