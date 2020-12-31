import { useDisclosure, Box, Avatar, SimpleGrid, Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import React from "react";
import TierForm from "./forms/TierForm";
import { useRouter } from "next/router";


export const PharmacyProfileModal: any = ({ onOpen, isOpen, onClose }) => {
  const btnRef = React.useRef()
  const subModal = useDisclosure()
  const histModal = useDisclosure()
  const appModal = useDisclosure()
	let data = {
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
    <Modal  isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader><Text fontSize="3xl">Create Tier: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
        <Box align="right">
        </Box>
			</SimpleGrid>
      </Box>
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
