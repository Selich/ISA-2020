import {
  Text,
  SimpleGrid,
  Box,
  Button,
  Avatar,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ReactStars from "react-rating-stars-component";
import Cookies from "js-cookie";

import { useAppointmentsByUserQuery } from "../../generated/graphql";
import { useRateMutation } from "../../generated/graphql";

const columns = [
  { name: "Date", selector: "begin", sortable: true },
  { name: "Length", selector: "length", sortable: true },
  { name: "Price", selector: "price", sortable: true },
  { name: "Doctor", selector: "employee.lastName", sortable: true },
  {
    cell: (row) => (
      <div>
        <Button size="sm" colorScheme="teal">
          Schedule
        </Button>
      </div>
    ),
  },
];

export function FreeExamsTable() {
  let token = Cookies.get("token");
  let [{ fetching, data }] = useAppointmentsByUserQuery({
    variables: {
      token: token,
      from: new Date() + '',
      until: '',
    },
  });
  let body = null;
  if (fetching) body = <p> Loading </p>;
  else if (!data) body = <p> Loading </p>;
  else if (data.appointmentsByUser) {
    body = (
      <DataTable
        data={data.appointmentsByUser}
        expandableRows
        title="Free Examinations"
        expandableRowsComponent={<ExpandedComponent data={this} />}
        columns={columns}
      />
    );
  }
  return (
    <>
      <Box>{body}</Box>
    </>
  );
}

export const ExpandedComponent = ({ data }) => {
  const [rating, setRating] = useState(0);
  const [{ fetching: rateFetch }, rate] = useRateMutation();
  return (
    <>
      <SimpleGrid columns={2}>
        <Box m={6} style={{ textAlign: "left" }}>
          <Avatar margin={4} pd={3} />
          <Text fontSize={18}>
            {data.employee.firstName} {data.employee.lastName}
          </Text>
          <Text fontSize={18}>Email: {data.employee.email}</Text>
          <Text fontSize={18}>Rating: {data.employee.averageRating}</Text>
          <Text fontSize={18}>Date: {data.begin}</Text>
        </Box>
        <Box m={6}>
          <Button>Report</Button>
        </Box>
      </SimpleGrid>
    </>
  );
};
//<AppointmentDetailsTable />
