import React from "react";
import { Box, Link, Flex, Button, Heading, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { LoginModal } from "../sections/modal/LoginModal";
import { RegisterModal } from "../sections/modal/RegisterModal";


const GuestMenu: any = ({setUser}) => {
  const loginModal = useDisclosure()
  const registerModal = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();
  return (
    <>
      <Flex align="center">
        {/* @ts-ignore */}
        <Button onClick={loginModal.onOpen} as={Link} mr={4}>
          Login
        </Button>
        <Button onClick={registerModal.onOpen} as={Link} mr={4}>
          Register
        </Button>
      </Flex>
      <LoginModal
        setUser={setUser}
        onOpen={loginModal.onOpen}
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
      />
      <RegisterModal
        onOpen={registerModal.onOpen}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
      />
    </>
  );
};
export default GuestMenu;