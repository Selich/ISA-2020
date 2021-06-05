import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Text, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useFreeAppointmentsQuery, useFreePharmsQuery, usePharmacyQuery, useScheduleMutation } from "../../generated/graphql";
import { ListFreeAppModal } from "../../components/sections/modal/ListFreeAppModal";
import { FreeExamsTable } from "../../components/tables/FreeExamsTable";
import { AppointmentsTable } from "../../components/tables/AppointmentsTable";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";

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
      data={data.freeAppointments}
      columns={columns}
      />
    )

  }

  return body
}
export default function PharmacyID({ user }) {
  const modal = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const [{ fetching, data }] = usePharmacyQuery({
    variables: {
      inputs: {
        // @ts-ignore
        id: parseInt(id),
      }
    },
  });

  let body = null;
  if (fetching) {
    body = <p> Fetching </p>;
  } else if (data) {
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
            <FreeApp id={id}/>
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
