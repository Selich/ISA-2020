import {
  Text,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FieldError, useAvailableQuery } from "../../../generated/graphql";
import DataTable from "react-data-table-component";

const handleSchedule = (row) => {};

export const ListFreeAppModal: any = ({ onOpen, isOpen, onClose, pharmId }) => {
  const [data, setData] = useState([]);
  const [, available] = useAvailableQuery();
  const columns = [
    { name: "Timeslot", selector: "from", sortable: true },
    { name: "Dermatologist", selector: "employee", sortable: false },
    { name: "Price", selector: "price", sortable: true },
    { name: "Rating", selector: "employee.averageRating", sortable: true },
    {
      name: "",
      button: true,
      cell: (row) => (
        <Button
          onClick={() => handleSchedule(row)}
          size="sm"
          colorScheme="teal"
        >
          Subscribe
        </Button>
      ),
    },
  ];
	let body = null
  useEffect(() => {
		let temp = available({id: pharmId +''})
		console.log(temp)

  }, []);
  if (!data) {
    body = <p> loading </p>;
  } else {
    body = (
      <>
        <DataTable
          columns={columns}
          data={data}
          pagination
          persistTableHead
          expandableRows
          // expandableRowsComponent={<ExpandedComponent data={this} />}
        />
      </>
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="3xl">Create Tier: </Text>{" "}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
