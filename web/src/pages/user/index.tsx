import React, {useState, useEffect} from "react";
import NextLink from "next/link";
import { HStack, Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {  usePatientQuery } from '../../generated/graphql';


export default function Index() {


	let token = localStorage.getItem('token')
	token = JSON.parse(token)
	const [{fetching,data}] = usePatientQuery({
		variables: {
			token: token
		}
	});


	let body = null
	if(fetching) body = <p>test</p>
		if(data) body = (
			<Box align="left" >
          <Text fontSize={28}>Welcome!</Text>
					<hr/>
          <Text fontSize={18} m={2}>Your daily stats:</Text>
					<HStack>
						<Text fontSize={17} m={2}>Penalty: </Text>
						<Text fontSize={19}> {data.patient.penalty}</Text>
					</HStack>	
          <Text fontSize={17} m={2}>Score: {data.patient.score}</Text>
      </Box>

		)


	return(
		<>
      <Box
        m="4"
        p="8"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
        bg="grey.200"
        color="#2d383c"
        fontSize="2rem"
        textAlign="center"
        h="1200px"
      >
      <SimpleGrid columns={2} spacing={0}  maxH="600px">
		{body}
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
