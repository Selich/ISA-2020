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

  // ! TODO: Link by user id
  return (
    <>
      <MenuList>
        <NextLink href="/:id/appointments">
          <MenuItem minH="48px">
            <span></span>
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
        <NextLink href="/[id]/profile">
          <MenuItem minH="48px">
            <span>Profile</span>
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

