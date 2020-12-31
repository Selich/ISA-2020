import { Center, HStack, SimpleGrid, Select, FormLabel, Switch, Input, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Link, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import React from "react";
import { useRouter } from "next/router";
import { Header } from "../components/sections/Header";
import { MapModal } from "../components/sections/MapModal";


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
const columns = [
	{name: "Pharmacy", selector:"pharmacy"},
	{name: "Type", selector:"type"},
	{name: "Price", selector:"price", sortable:true},
	{cell: row => <div><Button size="sm" colorScheme='teal'>Subscribe</Button></div> },
]


export default function Catalogue() {
  const modal = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();
  return (
    <>
    <Header/>
		<Box m={10} mx={20}>
		<Button onClick={modal.onOpen} colorScheme="teal">Create New Tier</Button>
	  <DataTable
      data={data}
      columns={columns}
      selectableRows
    />
		</Box>
      <TierModal
        onOpen={modal.onOpen}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      />
    </>
  );
}
