import { useDisclosure, Box, Avatar, SimpleGrid, Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import DataTable from 'react-data-table-component'
import React from "react";
import { addItem } from "../../../utils/cart";


export const PharmacyBuyModal: any = ({ onOpen, isOpen, onClose }) => {
    const pharms = [
        {
            name: "asser",
            price: 1231,
        }
  ]
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [filterText, setFilterText] = React.useState('');
  const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
        },
        {
            name: '',
            button: true,
            cell: () => <Button onClick={(val) => onClose()} colorScheme='teal' >Buy</ Button>,
        }
  ];
  return (
    <Modal  isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader><Text fontSize="3xl">Pharmacies: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <DataTable
                columns={columns}
                data={pharms}
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                persistTableHead
            />
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
