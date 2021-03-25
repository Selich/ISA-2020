import React, {useState, useEffect} from "react";
import { Box, Button, SimpleGrid, Text, HStack } from "@chakra-ui/react";
import Cookies from 'js-cookie'
import NextLink from "next/link";
import { useRouter } from "next/router";
import { usePatientQuery } from "../../generated/graphql";
import { PatientDetails } from "../../components/layouts/patient/PatientDetails";

export default function Index() {
	let [active, setActive] = useState('PatientDetails')
	let token = Cookies.get('token')
	const router = useRouter();
	let [{ fetching, data }] = usePatientQuery({
		variables: {
			token: token
		}
	})
	let body = null

	if (fetching) body = (<p> Loading </p>)
	else if (!data) body = (<p> Loading </p>)
	else if (data.patient) {
		body = (
			<>
				<Box m="4" p="8" fontSize="2rem" >
					<SimpleGrid columns={2} spacing={2} maxH="600px">
						<Box align="left" >
							{(active === 'Home') && ( <PatientDetails data={data} /> )}
							{(active === 'Consultations') && ( <PatientDetails data={data} /> )}
						</Box>
						<Box align="right">
							<Box> <Button w={180}>Consultation</Button> </Box>
							<Box> <Button w={180}>Pharmacies</Button> </Box>
							<Box> <Button w={180}>Create Appointment</Button> </Box>
							<Box> <Button w={180}>Create Consultation</Button> </Box>
							<Box> <Button w={180}>Examinations</Button> </Box>
							<Box> <Button w={180}>Eprescriptions</Button> </Box>
							<Box> <Button w={180}>Reservations</Button> </Box>
							<Box> <Button w={180}>Subscriptions</Button> </Box>
							<Box> <Button w={180}>Issue</Button> </Box>
						</Box>
					</SimpleGrid>
				</Box>
			</>
		)

	}
	return body
}
