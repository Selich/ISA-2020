import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input,  Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";

import { usePharmacyMutation } from '../../generated/graphql';
import { ListFreeAppModal } from "../../components/sections/modal/ListFreeAppModal";

export default function PharmacyID() {
	const router = useRouter()
  const modal = useDisclosure()
	const [ data, setData ] = useState({})
  const [{ fetching }, pharmacy] = usePharmacyMutation();
	let body = null
	const { id } = router.query

	useEffect(() => {
		pharmacy({id: '' + id}).then(res => setData(res.data.pharmacy))
	},[])
	if(fetching){
	}else if (!data){
		body = <p> loading </p>
	} else {
		body = (	
		<>
				<Text fontSize={23}>{data.name}</Text>

				<hr/>
				<Button onClick={() => modal.onOpen()}>Free Appointments</Button>
				<Text fontSize={17}></Text>
				<Text fontSize={17}></Text>
				
		</>)
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
      <SimpleGrid columns={2}>
			<Box align="left">
		      {body}
        </Box>
			</SimpleGrid>
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


