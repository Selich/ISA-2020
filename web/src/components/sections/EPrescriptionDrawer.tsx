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
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation } from "../../generated/graphql";

const EPrescriptionDrawer: any = ({ onClose }) => {

  return (
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
        <Button color="teal">Buy</Button>
      </DrawerFooter>
    </DrawerContent>
  );
}


export default EPrescriptionDrawer;

