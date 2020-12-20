import React from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Stack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  Table,
  TableCaption,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation } from "../../generated/graphql";

const EPrescriptionDrawer: any = ({ onClose }) => {
  const { isOpen, onOpen } = useDisclosure()

  return (
    <>
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>E-prescription</DrawerHeader>

      <DrawerBody>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Upload</Tab>
            <Tab>Webcam</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onOpen} color="teal">Buy</Button>
      </DrawerFooter>
    </DrawerContent>
    <Modal isOpen={isOpen} size="full" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pharmacy List</ModalHeader>
          <ModalBody pb={6}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Pharmacy</Th>
                  <Th>Address</Th>
                  <Th isNumeric>Sum Price</Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Pharmacy</Td>
                  <Td>Bulevar despota Stefana 7a</Td>
                  <Td isNumeric>100</Td>
                  <Td></Td>
                  <Td>
                    <Button colorScheme="teal" color="white">
                      <Icon></Icon>
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="teal" color="white">
                      <Icon></Icon>
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>

          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  );
}


export default EPrescriptionDrawer;

