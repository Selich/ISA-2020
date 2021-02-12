import React from "react";
import DataTable from 'react-data-table-component'
import { Image, Box, Link, Flex, Button, Heading, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GrBasket } from 'react-icons/gr'

interface NavBarProps { }

export const Basket: any = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Rating',
            selector: 'rating',
            sortable: true,
        },
        {
            name: '',
            button: true,
            cell: () => <Button onClick={(val) => buyItemModal.onOpen()} colorScheme='teal' >Buy</ Button>,
        }
    ];

  const btnRef = React.useRef()
  const router = useRouter();
  let body = null;
  // data is loading
  return(
    <>
        <Button ref={btnRef} onClick={onOpen}>
          <Icon as={GrBasket} />
        </Button>
        <Drawer
          size="md"
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Shopping Cart</DrawerHeader>

              <DrawerBody>
              <DataTable
                  columns={columns}
                  subHeader
                  persistTableHead
              />
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button color="teal">Buy</Button>
              </DrawerBody>

              <DrawerFooter>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        </>
  )
};
