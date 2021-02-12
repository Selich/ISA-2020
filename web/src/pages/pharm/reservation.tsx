import React, {useState, useEffect} from "react";
import NextLink from "next/link";
import { HStack, Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {  usePickupReservationMutation } from '../../generated/graphql';


export default function Reservation() {

	let token = localStorage.getItem('token')
	token = JSON.parse(token)
	const [{fetching,data}] = useEmployeeQuery({
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
					</HStack>	
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
						<NextLink href="/user/prescription">
							<Button w={180}>Prescription</Button> 
						</NextLink>
					</Box>
				</Box>
			</SimpleGrid>
      </Box>
		</>
	)
}
