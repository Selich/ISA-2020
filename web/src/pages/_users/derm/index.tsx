import React, {useState, useEffect} from "react";
import NextLink from "next/link";
import { HStack, Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {  useGetScheduleQuery, useEmployeeQuery } from '../../../generated/graphql';

import { MyCalendar } from '../../../components/sections/Calendar' 

export default function Index() {
	let [employees, setEmployees] = useState({})
	let [scheduleData, setScheduleData] = useState([])


	useEffect(() => {
		let token = localStorage.getItem('token')
		token = JSON.parse(token)
		const [employee] = useEmployeeQuery({
			variables: {
				token: token
			}
		});
			//@ts-ignore
		if(!employee.fetching)
			if(employee.data)
				setEmployees(employee.data.employee)
		const [schedule] = useGetScheduleQuery({
			variables: {
				token: token
			}
		});
			//@ts-ignore
		if(!schedule.fetching) 
			if(schedule.data)
				setScheduleData(schedule.data.getSchedule)
	}, [])


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
      <SimpleGrid columns={3} spacing={0}  maxH="600px">
        <Box align="left">
					<Box> 
						<NextLink href="/user/prescription">
							<Button w={180}>Prescription</Button> 
						</NextLink>
					</Box>
				</Box>
        <Box align="center">
							{scheduleData}
				</Box>
        <Box align="left">
					<Box> 
						<MyCalendar schedule={scheduleData}/>
					</Box>
				</Box>
			</SimpleGrid>
      </Box>
		</>
	)
}
