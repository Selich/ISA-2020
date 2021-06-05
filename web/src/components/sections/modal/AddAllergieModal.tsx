import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  useAddAllergieMutation,
  useShopQuery,
} from "../../../generated/graphql";

export interface Item {
  label: string;
  value: string;
}

export const AddAllergieModal: any = ({ onOpen, isOpen, onClose }) => {
  let [{ data, fetching }] = useShopQuery();
  const token = Cookies.get('token')
  let [_, addAllergie] = useAddAllergieMutation();
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
  const [pickerItems, setPickerItems] = React.useState([]);

  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };


  const columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Type", selector: "type", sortable: true },
    { name: "Form", selector: "form", sortable: true },
    { name: "Rating", selector: "rating", sortable: true },
    {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => handle(row)}>
            Check
          </Button>
        ),
    }
  ]

  const handle = (row) => {

    delete row.__typename
    const res =  addAllergie({
        inputs: row,
        token: token
        
    }).then(res => console.log(res));


  }

  let body = null;
  if (fetching) body = <div> loading </div>;
  else if (!data) body = <div> loading </div>;
  else
    body = (
      <>
      <DataTable
      data={data.shop}
      columns={columns}
      />

      </>
    );

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="1xl">Add Allergie:</Text>{" "}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
