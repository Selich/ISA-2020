import React from "react";
import { Image, Box, Link, Flex, Button, Heading, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import LoginLayout from '../layouts/LoginLayout'
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GrBasket } from 'react-icons/gr'
import UserMenu from "./UserMenu";

interface NavBarProps { }

export const Header: any = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <Flex align="center">
        <Button onClick={props.onOpen} as={Link} mr={4}>
          Login
      </Button>
        <NextLink href="/register">
          <Button as={Link} mr={4}>
            Register
        </Button>
        </NextLink>
      </Flex>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
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
                  <TableCaption>Imperial to metric conversion factors</TableCaption>
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
        <Menu>
          <MenuButton as={Button} rightIcon={<Avatar name={data.me.email.split('@')[0]} src="" size="sm" pd={2} />} >
            {(data.me.role === "patient") ?
              data.me.email.split('@')[0] :

              data.me.role
            }
          </MenuButton>
          <UserMenu />
        </Menu>

      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="gray.200" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Image src="../resources/logo.png"></Image>
          </Link>
        </NextLink>
        <NextLink href="/shop">
          <Button as={Link} mr={4}>
            Shop
          </Button>
        </NextLink>
        <NextLink href="/pharmacies">
          <Button as={Link} mr={4}>
            Pharmicies
        </Button>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
