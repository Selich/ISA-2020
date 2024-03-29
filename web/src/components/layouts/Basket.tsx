import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Icon, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import DataTable from 'react-data-table-component';
import { GrBasket } from 'react-icons/gr';


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
    // { name: '',
    //   button: true,
    //   cell: () => <Button onClick={(val) => buyItemModal.onOpen()} colorScheme='teal' >Buy</ Button>,
    // }
  ];

  const btnRef = React.useRef()
  const router = useRouter();
  let body = null;
  // data is loading
  return (
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
