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
	const [{fetching, data}] = useAvailableQuery({
		variables:{
			id: pharmId
		}
	});
  const columns = [
    { name: "Begin", selector: "begin", sortable: true },
    { name: "Dermatologist", selector: "employee.firstName", sortable: false },
    { name: "Price", selector: "price", sortable: true },
    { name: "Rating", selector: "employee.averageRating", sortable: true },
  ];
	let body = null
	let rows = []
  if (fetching) {
    body = <p> loading </p>;
  } else if(data){
		(!data) ? rows = [] : rows = data.available
    body = (
      <>
        <DataTable
          columns={columns}
          data={rows}
          pagination
          persistTableHead
          expandableRows
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
