import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";


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
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
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
                {/* <Text>{data.me.name}</Text> */}
                <Text fontSize={17}>Address:</Text>
                {/* <Text fontSize={14}>
                  {data.me.address.street + " "
                    + data.me.address.city + " "
                    + data.me.address.country}
                </Text> */}
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
