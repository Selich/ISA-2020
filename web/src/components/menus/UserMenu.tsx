import { Avatar, Button, Center, Drawer, DrawerOverlay, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation } from "../../generated/graphql";
import { Basket } from "../layouts/Basket";
import Cookies from 'js-cookie'
import EPrescriptionDrawer from "../sections/EPrescriptionDrawer";
import { usePatientQuery } from "../../generated/graphql";


const UserMenu: any = ({ user, setUser }) => {
  let token = Cookies.get('token')
	let [{fetching, data}] = usePatientQuery({variables:{
		token: token
	}})
  if(data){
    if(!user) user = data.patient

  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const penaltiesModal = useDisclosure()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const router = useRouter();
  const btnRef = React.useRef()
  return (
    <Flex align="center">
      <Basket />
      <Menu>
        {/* @ts-ignore */}
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
              <Text color='grey' pd={1} fontSize='lg' margin={2}>
                {(user.role === "patient") ?
                  user.email.split('@')[0] :
                  user.role
                }
              </Text>
            </Center>
          </NextLink>
          <hr />
          <NextLink href="/user">
            <MenuItem minH="48px">
              <span>Home</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/user/profile">
            <MenuItem minH="48px">
              <span>Profile</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/user/appointments">
            <MenuItem minH="48px">
              <span>Appointments</span>
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
          <NextLink href="/user/subscriptions">
            <MenuItem minH="48px">
              <span>Subscriptions</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/user/eprescriptions">
            <MenuItem minH="48px">
              <span>E-prescriptions</span>
            </MenuItem>
          </NextLink>
          <MenuItem ref={btnRef} onClick={onOpen} minH="48px">
            <span>E-prescription (Modal)</span>
          </MenuItem>
          <hr />
          <MenuItem
            mr={4}
            onClick={() => {
              logout();
              setUser(null)
              router.push('/')
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

export default UserMenu;