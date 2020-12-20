import React from "react";
import { Image, Box, Link, Flex, Button, Heading, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import LoginLayout from '../layouts/LoginLayout'
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GrBasket } from 'react-icons/gr'
import UserMenu from "./UserMenu";
import { Basket } from "../layouts/Basket";

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
        <Basket/>
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
