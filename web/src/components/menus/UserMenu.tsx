import React from "react";
import NextLink from "next/link";
import { Text, Flex, Button, Heading, Menu, MenuButton, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr, MenuItem, MenuList, Center } from "@chakra-ui/react";
import { Basket } from "../layouts/Basket";
import EPrescriptionDrawer from "../sections/EPrescriptionDrawer";
import { useLogoutMutation } from "../../generated/graphql";
import { useRouter } from "next/router";


export const UserMenu: any = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const router = useRouter();
  const btnRef = React.useRef()
  return (
    <Flex align="center">
      <Basket />
      <Menu>
        <MenuButton as={Button} rightIcon={<Avatar name={user.email.split('@')[0]} src="" size="sm" pd={2} />} >
        </MenuButton>
        <MenuList>
          <NextLink href="/[role]/[id]" as={`/${user.role}/${user.id}`}>
          <Center>
          <Avatar name={user.email.split('@')[0]} src="" size="lg" margin={3} pd={3} />
          </Center>
          </NextLink>
          <NextLink href="/[role]/[id]" as={`/${user.role}/${user.id}`}>
          <Center>
            <Text color='grey' pd={1} fontSize='md' margin={2}>
          {(user.role === "patient") ?
            user.email.split('@')[0] + '@' :
            user.role
          }
            </Text>
          </Center>
          </NextLink>
          <hr/>
          <NextLink href="/user/appointments">
            <MenuItem minH="48px">
              <span>Appointments</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/user/consultations">
            <MenuItem minH="48px">
              <span>Consultations</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/user/complaints">
            <MenuItem minH="48px">
              <span>Complaints</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/user/history">
            <MenuItem minH="48px">
              <span>History</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/user/reservations">
            <MenuItem minH="48px">
              <span>Reservations</span>
            </MenuItem>
          </NextLink>
          <MenuItem ref={btnRef} onClick={onOpen} minH="48px">
            <span>E-prescription (Modal)</span>
          </MenuItem>
          <hr/>
          <MenuItem
            mr={4}
            onClick={() => {
              logout();
              router.push("/");
            }}
            isLoading={logoutFetching}
            variant="link"
            minH="48px">
            <span>Logout</span>
          </MenuItem>
        </MenuList>
        <Drawer
          size="md"
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <EPrescriptionDrawer onClose={onClose} />
          </DrawerOverlay>
        </Drawer>
      </Menu>

    </Flex>
  );
};
