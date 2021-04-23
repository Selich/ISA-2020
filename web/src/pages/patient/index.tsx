import React, {useState, useEffect} from "react";
import { Box, Button, SimpleGrid, Text, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePatientQuery } from "../../generated/graphql";
import { PatientDetails } from "../../components/layouts/patient/PatientDetails";
import { getUserDetails } from "../../utils/getUserDetails";

const View = ({data}) => (
			<>
				<Box m="4" p="8" fontSize="2rem" >
					<SimpleGrid columns={2} spacing={2} maxH="600px">
						<Box align="left" >
							 <PatientDetails data={data}/>
						</Box>
						<Box align="right">
							<Box> <Button w={180}>Consultation</Button> </Box>
							<Box> <Button w={180}>Pharmacies</Button> </Box>
							<Box> <Button w={180}>Create Exam</Button> </Box>
							<Box> <Button w={180}>Create Consultation</Button> </Box>
      				<NextLink href="/patient/exam">
							<Box> <Button w={180}>Examinations</Button> </Box>
      				</NextLink>
							<Box> <Button w={180}>Eprescriptions</Button> </Box>
							<Box> <Button w={180}>Reservations</Button> </Box>
							<Box> <Button w={180}>Subscriptions</Button> </Box>
							<Box> <Button w={180}>Issue</Button> </Box>
						</Box>
					</SimpleGrid>
				</Box>
			</>
)

export default function Index() {
	return getUserDetails(<View data/>, usePatientQuery)
}
