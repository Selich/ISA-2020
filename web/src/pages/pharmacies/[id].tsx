import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Text, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { usePharmacyQuery, useScheduleMutation } from "../../generated/graphql";
import { ListFreeAppModal } from "../../components/sections/modal/ListFreeAppModal";
import { FreeExamsTable } from "../../components/tables/FreeExamsTable";
import { AppointmentsTable } from "../../components/tables/AppointmentsTable";
import Cookies from "js-cookie";

const Schedule = (row) => {
  const [, schedule] = useScheduleMutation();
  let token = Cookies.get("token");
  let inputs = row;
  delete inputs.employee.__typename;
  delete inputs.__typename;

  schedule({ token: token, inputs: inputs }).then((res) => console.log(res));
};
export default function PharmacyID({ user }) {
  const modal = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const [{ fetching, data }] = usePharmacyQuery({
    variables: {
      id: id + "",
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
            <AppointmentsTable
              kind={"schedule"}
              variables={{ pharmacy: { id: id }, patient: null }}
              handler={[Schedule]}
              buttonName={"Schedule"}
            />
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
