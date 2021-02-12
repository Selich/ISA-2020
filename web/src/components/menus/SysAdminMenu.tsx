import React from "react";
import NextLink from "next/link";
import { Flex, Button, Heading, Menu, MenuButton, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr, MenuItem, MenuList, Link } from "@chakra-ui/react";
<<<<<<< HEAD
import { Basket } from "../layouts/Basket";
import EPrescriptionDrawer from "../sections/EPrescriptionDrawer";
import { useLogoutMutation } from "../../generated/graphql";
import { CreateEmployeeModal } from "../sections/modal/CreateEmployeeModal";
=======
import { useLogoutMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
>>>>>>> dev


export const SysAdminMenu: any = ({ user }) => {
  const createEmployee = useDisclosure()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const btnRef = React.useRef()
<<<<<<< HEAD
=======
  const router = useRouter();
>>>>>>> dev
  return (
    <Flex align="center">
      <Menu>
        <MenuButton as={Button} rightIcon={<Avatar name={user.email.split('@')[0]} src="" size="sm" pd={2} />} >
          {(user.role === "patient") ?
            user.email.split('@')[0] :
            user.role
          }
        </MenuButton>
        <MenuList>
<<<<<<< HEAD
          <NextLink href="/sysadmin/">
=======
          <NextLink href="/">
>>>>>>> dev
            <MenuItem minH="48px">
              <span>Home</span>
            </MenuItem>
          </NextLink>
<<<<<<< HEAD
=======
          <NextLink href="/sysadmin">
            <MenuItem minH="48px">
              <span>Panel</span>
            </MenuItem>
          </NextLink>
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
>>>>>>> dev
				</MenuList>
      </Menu>

    </Flex>
  );
};
