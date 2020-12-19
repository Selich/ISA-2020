import React from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Stack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation } from "../../generated/graphql";
import EPrescriptionDrawer from "./EPrescriptionDrawer";

const UserMenu: any = ({ }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const btnRef = React.useRef()

  return (
    <>
      <MenuList>
        <NextLink href="/admin-pharmacy/create-medicine">
          <MenuItem minH="48px">
            <span>Create Medicine</span>
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
          <EPrescriptionDrawer onClose={onClose}/>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}


export default UserMenu;
