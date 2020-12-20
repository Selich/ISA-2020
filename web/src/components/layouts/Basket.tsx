import React from "react";
import { Image, Box, Link, Flex, Button, Heading, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import LoginLayout from '../layouts/LoginLayout'
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GrBasket } from 'react-icons/gr'

interface NavBarProps { }

export const Basket: any = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();
  let body = null;
  // data is loading
  return(
    <>
        <Button ref={btnRef} onClick={onOpen}>
          <Icon as={GrBasket} />
        </Button>
        <Drawer
          size="md"
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Shopping Cart</DrawerHeader>

              <DrawerBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th isNumeric>Quantity</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Aspirin</Td>
                      <Td isNumeric>1</Td>
                      <Td><Button colorScheme="red">X</Button></Td>
                    </Tr>
                    <Tr>
                      <Td>Bensedin</Td>
                      <Td isNumeric>3</Td>
                      <Td><Button colorScheme="red">X</Button></Td>
                    </Tr>
                    <Tr>
                      <Td>Cancer</Td>
                      <Td isNumeric>2</Td>
                      <Td><Button colorScheme="red">X</Button></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button color="teal">Buy</Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        </>
  )
};
