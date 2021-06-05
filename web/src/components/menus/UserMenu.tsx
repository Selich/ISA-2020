import { Avatar, Button, Center, Drawer, DrawerOverlay, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { JsonWebTokenError } from "jsonwebtoken";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, usePatientQuery } from "../../generated/graphql";
import { Basket } from "../layouts/Basket";
import EPrescriptionDrawer from "../sections/EPrescriptionDrawer";


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
				<MenuButton as={Button} rightIcon={<Avatar src="https://bit.ly/dan-abramov" size="sm" pd={2} />} >
        </MenuButton>
        <MenuList>
          <NextLink href="/[role]/[id]" as={`/${user.role}/${user.id}`}>
            <Center>
              <Avatar name={user.email.split('@')[0]} src="https://bit.ly/dan-abramov"  size="lg" margin={3} pd={3} />
            </Center>
          </NextLink>
          <NextLink href="/[role]/[id]" as={`/${user.role}/${user.id}`}>
            <Center>
              <Text color='grey' pd={1} fontSize='lg' margin={2}>
                {(user.role === "patient") ?
                  user.firstName :
                  user.role
                }
              </Text>
            </Center>
          </NextLink>
          <hr />
          <NextLink href={`/${user.role}`}>
            <MenuItem minH="48px">
              <span>Home</span>
            </MenuItem>
          </NextLink>
					<NextLink href={`/profile`}>
            <MenuItem minH="48px">
              <span>Profile</span>
            </MenuItem>
          </NextLink>
          <MenuItem
            mr={4}
            onClick={() => {
              logout();
              setUser(null)
              Cookies.remove('token')
              
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
