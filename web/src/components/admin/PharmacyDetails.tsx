import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Text, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useFreeAppointmentsQuery, useFreePharmsQuery, usePharmacyQuery, useScheduleMutation } from "../../generated/graphql";
import { ListFreeAppModal } from "../sections/modal/ListFreeAppModal";
import { FreeExamsTable } from "../tables/FreeExamsTable";
import { AppointmentsTable } from "../tables/AppointmentsTable";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import { Loading } from "../Loading";

const Schedule = (row) => {
  const [, schedule] = useScheduleMutation();
  let token = Cookies.get("token");
  let inputs = row;
  delete inputs.employee.__typename;
  delete inputs.__typename;

  schedule({ token: token, inputs: inputs }).then((res) => console.log(res));
};

const FreeApp = ({id}) => {
  const token = Cookies.get('token')

  let variables = {
    pharmacyId: id + '',
    token: token,
    kind: 'derm'
  }
  const[{fetching, data}] = useFreeAppointmentsQuery({variables})

	const columns = [
		{ name: "Price", selector: "price", sortable: true },
		{ name: "Date", selector: "begin", sortable: true },
		{ name: "Rating", selector: "employee.averageRating", sortable: true },
		{ name: "Doctor", selector: "employee.lastName", sortable: true },
	];

  let body = null;
  if (fetching) {
    body = <p> Fetching </p>;
  } else if (!data) 
    body = <p> Fetching </p>;
  else {
    body = (
      <DataTable
      title='Free Appointments'
      data={data.freeAppointments}
      columns={columns}
      />
    )

  }

  return body
}
export const PharmacyDetails = () => {
  const modal = useDisclosure();
  const router = useRouter();
  const token = Cookies.get("token");
  const [{ fetching, data }] = usePharmacyQuery({
    variables: {
      inputs: {
        // @ts-ignore
        id: 0,
      },
      token: token
    },
  });

  let body = null;
  if (fetching) body = <Loading/>;
  else if (!data) body = <Loading/>;
  else{
    body = (
      <>
        <SimpleGrid columns={2}>
          <Box align="left">
            <h1>{data.pharmacy.name}</h1>
            <hr />
            <Text fontSize={19}>{data.pharmacy.address.street} </Text>
            <Text fontSize={19}>{data.pharmacy.address.city} </Text>
            <Text fontSize={19}>{data.pharmacy.address.country} </Text>
          </Box>
          <Box align="right">
            <FreeApp id={data.pharmacy.id}/>
          </Box>
        </SimpleGrid>
      </>
    );

  }

  return (
    <Box m="4" p="8" fontSize="2rem">
      {body}
    </Box>
  );
}
