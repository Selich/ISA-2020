import { Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center } from "@chakra-ui/react";
import DataTable from 'react-data-table-component'
import React from "react";
import { FaFacebook } from 'react-icons/fa'
import EditProfileForm from "../forms/EditProfileForm";


export const SubListModal: any = ({ onOpen, isOpen, onClose }) => {
  const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: '',
            button: true,
					  cell: row => <Button onClick={() => alert(row) } size="sm" colorScheme="teal" color="white">Unsubscribe</Button>
        },
  ];
  const btnRef = React.useRef()
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
			<ModalContent >
        <ModalHeader><Text fontSize="1xl"> Update User: </Text> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <DataTable
                columns={columns}
                data={[]}
            />
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};
