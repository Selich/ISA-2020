import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import DataTable from 'react-data-table-component';
// import { PriceModal } from "../../components/sections/PriceModal";



const data = [
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
	{type: "Dherm", pharmacy: "Pharmacy1", price:200},
]
const columns = [
	{name: "Pharmacy", selector:"pharmacy"},
	{name: "Type", selector:"type"},
	{name: "Price", selector:"price", sortable:true},
	{name: '', cell: row => <div><Button size="sm" colorScheme='teal'>Confirm</Button></div> },
]

export default function Holidays() {
  const modal = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();

  return (
    <>
		<Box m={10} mx={20}>
		<Button onClick={modal.onOpen} colorScheme="teal">Create New Price</Button>
	  <DataTable
      data={data}
      columns={columns}
      selectableRows
    />
		</Box>
      {/* <PriceModal
        onOpen={modal.onOpen}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      /> */}
    </>
  );
}
