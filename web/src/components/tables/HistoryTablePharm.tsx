import { Text, SimpleGrid, Box, Button, Avatar } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Cookies from "js-cookie";

import { useAppointmentsByUserQuery } from "../../generated/graphql";
import { useRateMutation } from "../../generated/graphql";
import { useUnscheduleMutation } from "../../generated/graphql";
import swal from "sweetalert";

export function HistoryTablePharm({ kind }) {
  let token = Cookies.get("token");
  const [_, unschedule] = useUnscheduleMutation();
  let [{ fetching, data }] = useAppointmentsByUserQuery({
    variables: {
      token: token,
      inputs: {
      // @ts-ignore
        from: "2020-12-22",
      // @ts-ignore
        until: "2020-12-26",

      }
    },
  });
  let body = null;
  if (fetching) body = <p> Loading </p>;
  else if (!data) body = <p> Loading </p>;
  else if (data.appointmentsByUser) {
    let arr = [];
    if (kind === "history") {
      arr = data.appointmentsByUser.filter((item) => item.isVisited);
    } else {
      arr = data.appointmentsByUser.filter((item) => !item.isVisited);
    }
    const columns = [
      { name: "Price", selector: "price", sortable: true },
      { name: "Date", selector: "begin", sortable: true },
      {
        cell: (row) => (
          <div>
            <Button
              onClick={() => {
                swal({
                  title: "Cancel selected appointment?",
                  text: "Are you sure you want to cancel selected appointment?",
                  icon: "warning",
                  dangerMode: true,
                  buttons: ["Cancel", "OK"],
                }).then((willRemove) => {
                  if (willRemove) {
                    let inputs = row;
                    inputs.kind = "derm";
                    delete inputs.patient;
                    delete inputs.employee;
                    delete inputs.__typename;
										console.log(inputs)
                    unschedule({ inputs: row }).then((res) => {
                      console.log(res);
                      swal("Appointment canceled", {
                        icon: "success",
                      });
                    });
                  }
                });
              }}
              size="sm"
              colorScheme="red"
            >
              Cancel
            </Button>
          </div>
        ),
      },
    ];
    body = (
      <DataTable
        data={arr}
        expandableRows
        expandableRowsComponent={<ExpandedComponent data={this} />}
        // @ts-ignore
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
          Rating:
          <Button>Report</Button>
        </Box>
      </SimpleGrid>
    </>
  );
};
//<AppointmentDetailsTable />
