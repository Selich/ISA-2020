import { Text, HStack } from "@chakra-ui/react";
import React from "react";

export const PatientDetails = ({data}) => (
		<HStack>
			<Text fontSize={28}>Welcome {data.patient.firstName}!</Text>
			<hr />
			<Text fontSize={17}>Penalty: {data.patient.penalty}</Text>
			<Text fontSize={17}>Score: {data.patient.score}</Text>
		</HStack>

)