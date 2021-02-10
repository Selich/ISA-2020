import React from "react";
import NextLink from "next/link";
import { Flex, Button, Heading, Menu, MenuButton, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr, MenuItem, MenuList, Link } from "@chakra-ui/react";
import { Basket } from "../layouts/Basket";
import EPrescriptionDrawer from "../sections/EPrescriptionDrawer";
import { useLogoutMutation } from "../../generated/graphql";
import { CreateEmployeeModal } from "../sections/modal/CreateEmployeeModal";


export const SysAdminMenu: any = ({ user }) => {
  const createEmployee = useDisclosure()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const btnRef = React.useRef()
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
          <NextLink href="/sysadmin/">
            <MenuItem minH="48px">
              <span>Home</span>
            </MenuItem>
          </NextLink>
				</MenuList>
      </Menu>

    </Flex>
  );
};
