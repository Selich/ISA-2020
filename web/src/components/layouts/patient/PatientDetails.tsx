import { Text, HStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React from "react";
import { usePatientQuery } from "../../../generated/graphql";

export const PatientDetails = () => {

	const token = Cookies.get('token')
	const [{ fetching, data }] = usePatientQuery({variables: {token:token}})

  let body = null;
  if (fetching) body = <p>loading...</p>;
  else if (!data) body = <p>Null data...</p>;
  else {
		body = (
			<>
			<Text fontSize={28}>Welcome {data.patient.firstName}!</Text>
			<hr />
			<Text fontSize={22}>Penalty: {data.patient.penalty}</Text>
			<Text fontSize={22}>Score: {data.patient.score}</Text>
			</>
		)
	}


	return (
		<HStack>
			{body}
		</HStack>

	)

}
