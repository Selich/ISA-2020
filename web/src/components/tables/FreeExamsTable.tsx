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

import { useFreeAppointmentsQuery } from "../../generated/graphql";
import { useRateMutation } from "../../generated/graphql";
import { useScheduleMutation } from "../../generated/graphql";


export function FreeExamsTable({user, pharmacyId}) {
  let [{ fetching, data }] = useFreeAppointmentsQuery({ variables: { pharmacyId: '20', }, });
  const [_, schedule] = useScheduleMutation();
  let body = null;

	useEffect(() => {  }, [user])
  if (fetching) body = <p> Loading </p>;
  else if (!data) body = <p> Loading </p>;
  else if (data.freeAppointments) {
	const columns = [
		{ name: "Date", selector: "begin", sortable: true },
		{ name: "Price", selector: "price", sortable: true },
		{ name: "Doctor", selector: "employee.lastName", sortable: true },
		{ name: "Rating", selector: "employee.averageRating", sortable: true },
		{
			cell: (row) => (
				<div>
					<Button 
				disabled={!user}
				onClick={() => {
					let inputs = row
					inputs.patient = user
					inputs.employee.averageRating = inputs.employee.averageRating + ''
					inputs.pharmacy = {id: pharmacyId}
					inputs.kind = 'derm'
					inputs.length = 0
					delete inputs.patient.__typename
					delete inputs.employee.__typename
					delete inputs.__typename


					console.log('Request')
					console.log(inputs)
					schedule({inputs: inputs}).then(res => console.log(res))

				}}
				size="sm" colorScheme="teal">
				{(!user) ?  'Not Logged In' :  'Schedule'}
					</Button>
				</div>
			),
		},
	];
    body = (
      <DataTable
        data={data.freeAppointments}
        expandableRows
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
