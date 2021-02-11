import React, {useState, useEffect} from "react";
import NextLink from "next/link";
import { HStack, Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMeQuery,useRouter } from "next/router";

import { MyCalendar } from '../../components/sections/Calendar' 

export default function Index() {
	const [data, setData] = useState({})
	if(data){ 
	}


	useEffect(() => {
		let user = localStorage.getItem('user')
		user = JSON.parse(user)
		setData(user)

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
			<Box align="left" >
          <Text fontSize={28}>Welcome!</Text>
					<hr/>
          <Text fontSize={18} m={2}>Your daily stats:</Text>
					<HStack>
						<Text fontSize={17} m={2}>Penalty: </Text>
						<Text fontSize={19}> {data.penalty}</Text>

					</HStack>	
          <Text fontSize={17} m={2}>Score: {data.score}</Text>
      </Box>
        <Box align="right">
					<Box> 
						<NextLink href="/user/consultation">
						<Button w={180} >Consultation</Button> 
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
					<Box> <Button w={180} >Reservations</Button> </Box>
					<Box> <Button w={180} >Subscriptions</Button> </Box>
					<Box> 
						<Button w={180} >Report Issue</Button> 
					</Box>
					<Box> <Button w={180} >Get Medicine</Button> </Box>
				</Box>
			<Box align="right">
					<MyCalendar/>
      </Box>
			</SimpleGrid>
      </Box>
		</>
	)
}
