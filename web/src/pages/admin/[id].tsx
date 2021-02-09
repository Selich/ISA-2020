
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { usePharmacyMutation } from '../../generated/graphql';

export default function PharmacyID() {
	const router = useRouter()
  const [{ fetching }, pharmacy] = usePharmacyMutation();
	const [ data, setData ] = useState({})
	const { id } = router.query
	let body = null
	let user = null
	useEffect(() =>  {
		//@ts-ignore
		if(fetching){

		} else {
			pharmacy(id).then(ret => console.log(ret.data?.pharmacy))

		}

	}, [])
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
				<>
          <Avatar  src="" size="2xl" margin={4} pd={3} />
          <Text></Text>
          <Text fontSize={17}>{data.name}</Text>
					 <Text fontSize={17} ></Text>

          <Text fontSize={17}></Text>
						  <Text fontSize={14}></Text>
					<hr/>
          <Text fontSize={17}></Text>
				  <Text fontSize={17}></Text>
					
				</>
        </Box>
			</SimpleGrid>
      </Box>
    </>
  );
}


