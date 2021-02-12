import React from "react";
import { Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMeQuery } from "../../../generated/graphql";



export default function ProfileForm({onClose}) {
  let [{ data, fetching }] = useMeQuery();
	data = {
		me: {
			email: "selich.work@gmail.com",
			address: {
				street: "Poenkareova",
				city: "Novi Sad",
				country: "Serbia",
			}
		}
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
          <Avatar name={data.me.email.split('@')[0]} src="" size="2xl" margin={4} pd={3} />
          <Text>{data.me.firstName} {data.me.lastName}</Text>
          <Text fontSize={17}>Address:</Text>
          <Text fontSize={14}>
            {data.me.address.street + " "
            + data.me.address.city + " "
            + data.me.address.country}
          </Text>
        </Box>
		</SimpleGrid>
      </Box>
    </>
  );
}


