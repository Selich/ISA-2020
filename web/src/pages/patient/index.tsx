import { Box, Button, SimpleGrid, Text, HStack } from "@chakra-ui/react";
import Cookies from 'js-cookie'
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { usePatientQuery } from "../../generated/graphql";


export default function Index() {
    let token = Cookies.get('token')
  	const router = useRouter();
	let [{fetching, data}] = usePatientQuery({variables:{
		token: token
	}})
	let body = null
	if(!token) router.push('/')

	if(fetching) body = (<p>Loading</p>)
	else if(!data) body = (<p> Loading </p>)
	else if (data.patient)
		body = (
			<HStack>
				<Text fontSize={17}>Penalty: {data.patient.penalty}</Text>
				<Text fontSize={17}>Score: {data.patient.score}</Text>
			</HStack>
		)
	return (
		<>
			<Box m="4" p="8" fontSize="2rem" >
				<SimpleGrid columns={2} spacing={2} maxH="600px">
					<Box align="left" >
						<Text fontSize={28}>Welcome {data.patient.firstName}!</Text>
						<hr />
						{body}
					</Box>
					<Box align="right">
						<Box>
							<NextLink href="/user/consultation">
								<Button w={180} >Consultation</Button>
							</NextLink>
						</Box>
						<Box>
							<NextLink href="/user/pharmacies">
								<Button w={180} >Pharmacies</Button>
							</NextLink>
						</Box>
						<Box>
							<NextLink href="/user/create-appointment">
								<Button w={180} >Create Appointment</Button>
							</NextLink>
						</Box>
						<Box>
							<NextLink href="/user/create-consultation">
								<Button w={180} >Create Consultation</Button>
							</NextLink>
						</Box>
						<Box>
							<NextLink href="/user/examinations">
								<Button w={180} >Examinations</Button>
							</NextLink>
						</Box>
						<Box> <Button w={180} >Schedule</Button> </Box>
						<Box>
							<NextLink href="/user/eprescriptions">
								<Button w={180} >Eprescriptions</Button>
							</NextLink>
						</Box>
						<Box>
							<NextLink href="/user/reservations">
								<Button w={180} >Reservations</Button>
							</NextLink>
						</Box>
						<Box> <Button w={180} >Reservations</Button> </Box>
						<Box> <Button w={180} >Subscriptions</Button> </Box>
						<Box>
							<Button w={180} >Report Issue</Button>
						</Box>
						<Box> <Button w={180} >Get Medicine</Button> </Box>
					</Box>
				</SimpleGrid>
			</Box>
		</>
	)
}
