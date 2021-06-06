import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {  Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input,  Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { usePharmacyQuery } from '../../generated/graphql';
import { ListFreeAppModal } from "../../components/sections/modal/ListFreeAppModal";
import { FreeExamsTable } from '../../components/tables/FreeExamsTable'

export function PharmacyProfile({pharm}) {
  const modal = useDisclosure()

	const router = useRouter()
	const { id } = router.query
	const [{ fetching, data }] = usePharmacyQuery({
		variables:{
      inputs: {
			  id: pharm.id

      }
		}
	});

	let body = null
	if(fetching){ body = <p> Fetching </p>
	} else if (!data){ body = <p> loading </p> } else 
	{
		body = (	
		<>
      <SimpleGrid columns={2}>
			<Box align="left">
			<h1>{data.pharmacy.name}</h1>
				<hr/>
			<Text fontSize={19}>{data.pharmacy.address.street} </Text>
			<Text fontSize={19}>{data.pharmacy.address.city} </Text>
			<Text fontSize={19}>{data.pharmacy.address.country} </Text>
        </Box>
			<Box align="right">
				<FreeExamsTable user={''} pharmacyId={''} />
				
			</Box>
			</SimpleGrid>
		</>
		)
	}

  return (
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
        h="400px"
      >
		      {body}
      </Box>
      <ListFreeAppModal
        isOpen={modal.isOpen}
        onOpen={modal.onOpen}
        onClose={modal.onClose}
        data={id}
      ></ListFreeAppModal>
    </>
  );
}


