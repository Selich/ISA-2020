import { Center, HStack, SimpleGrid, Select, FormLabel, Switch, Input, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Link, Button, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";


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
	// {cell: row => <div><Button size="sm" colorScheme='teal'>Subscribe</Button></div> },
]


export default function PatientTable() {
  const modal = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();
  return (
    <>
	<Box>
    <DataTable
      data={data}
      columns={columns}
      selectableRows
    />
		</Box>
    </>
  );
}
