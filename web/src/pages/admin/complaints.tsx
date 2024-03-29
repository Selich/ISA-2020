import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { ComplaintModal } from "../../components/sections/modal/ComplaintModal";

interface IFormInputs {
  email: string
  password: string
}

const data = [
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
]
const columns: IDataTableColumn<any>[] = [
	{name: "Pharmacy", selector:"pharmacy"},
	{name: "Type", selector:"type"},
	{name: "Price", selector:"price", sortable:true},
	// {cell: row => <div><Button size="sm" colorScheme='teal'>Update</Button></div> },
]


export default function Catalogue() {
  const modal = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();
  return (
    <>
		<Box m={10} mx={20}>
		<Button onClick={modal.onOpen} colorScheme="teal">Create New Tier</Button>
	  <DataTable
      data={data}
      columns={columns}
      selectableRows
    />
		</Box>
      <ComplaintModal
        onOpen={modal.onOpen}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      />
    </>
  );
}
