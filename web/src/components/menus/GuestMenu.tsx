import React from "react";
import { Box, Link, Flex, Button, Heading, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { LoginModal } from "../sections/LoginModal";
import { RegisterModal } from "../sections/RegisterModal";


export const GuestMenu: any = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();
  return (
    <>
      <Flex align="center">
        <Button onClick={onOpen} as={Link} mr={4}>
          Login
        </Button>
        <Button onClick={onOpen} as={Link} mr={4}>
          Register
        </Button>
      </Flex>
      <LoginModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
      <RegisterModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
