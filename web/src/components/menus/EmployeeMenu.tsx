import React, {useState} from "react";
import NextLink from "next/link";
import { Flex, Button, Heading, Menu, MenuButton, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr, MenuItem, MenuList } from "@chakra-ui/react";
import { Basket } from "../layouts/Basket";
import EPrescriptionDrawer from "../sections/EPrescriptionDrawer";
import { useLogoutMutation } from "../../generated/graphql";

const EmployeeMenu: any = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const btnRef = React.useRef()
  return (
    <Flex align="center">
      <Basket />
      <Menu>
        <MenuButton as={Button} rightIcon={<Avatar name={user.email.split('@')[0]} src="" size="sm" pd={2} />} >
          {(user.role === "patient") ?
            user.email.split('@')[0] :
            user.role
          }
        </MenuButton>
        <MenuList>
					{user.role === 'derm' && 
						<NextLink href="/derm">
							<MenuItem minH="48px">
								<span>Home</span>
							</MenuItem>
					</NextLink>
					}
					{user.role === 'pharm' && 
						<NextLink href="/pharm">
							<MenuItem minH="48px">
								<span>Home</span>
							</MenuItem>
					</NextLink>
					}
					{user.role === 'derm' && 
						<NextLink href="/derm/profile">
							<MenuItem minH="48px">
								<span>Profile</span>
							</MenuItem>
					</NextLink>
					}
					{user.role === 'pharm' && 
						<NextLink href="/pharm/profile">
							<MenuItem minH="48px">
								<span>Profile</span>
							</MenuItem>
					</NextLink>
					}
          <NextLink href="/:id/appointments">
            <MenuItem minH="48px">
              <span>Appointment</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/:id/complaints">
            <MenuItem minH="48px">
              <span>Complaints</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/:id/history">
            <MenuItem minH="48px">
              <span>History</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/:id/reservations">
            <MenuItem minH="48px">
              <span>Reservations</span>
            </MenuItem>
          </NextLink>
          <MenuItem ref={btnRef} onClick={onOpen} minH="48px">
            <span>E-prescription (Modal)</span>
          </MenuItem>
          <MenuItem
            mr={4}
            onClick={() => {
              logout();
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

export default EmployeeMenu;