import { Text, HStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React from "react";
import { usePatientQuery } from "../../../generated/graphql";
import { Loading } from "../../Loading";

export const PatientDetails = () => {

	const token = Cookies.get('token')
	const [{ fetching, data }] = usePatientQuery({variables: {token:token}})

  let body = null;
  if (fetching) body = <Loading/>;
  else if (!data) body = <Loading/>;
  else {
		body = (
			<>
			<Text fontSize={28}>Welcome {data.patient.firstName}!</Text>
			<hr />
			<Text fontSize={22}>Penalty: {data.patient.penalty}</Text>
			<Text fontSize={22}>Score: {data.patient.score}</Text>
			<Text fontSize={22}>Tier: {data.patient.tier.name}</Text>
			</>
		)
	}


	return (
		<HStack>
			{body}
		</HStack>

	)

}
