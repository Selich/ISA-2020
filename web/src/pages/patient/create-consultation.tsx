import React, {useState, useEffect} from "react";
import NextLink from "next/link";
import { HStack, Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { usePatientQuery } from '../../generated/graphql';


export default function CreateConsultation() {
	const [{fetching,data}] = usePatientQuery()

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
        <Box align="right">
				</Box>
			</SimpleGrid>
      </Box>
		</>
	)
}
