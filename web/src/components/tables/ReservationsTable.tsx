import { Center, HStack, SimpleGrid, Select, FormLabel, Switch, Input, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Link, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import React from "react";
import DataTable from "react-data-table-component";
import { useReservationsQuery } from "../../generated/graphql";
import { TableComponent } from "./TableComponent";

const columns = [
	{name: "Pharmacy", selector:"pharmacy"},
	{name: "Type", selector:"type"},
	{name: "Price", selector:"price", sortable:true},
]

export function ReservationsTable() {
	let token = localStorage.getItem('token')
	let variables = { token: token }


	const Cancel = () => {

	}

  return (
	  <TableComponent
			query={useReservationsQuery}
			handler={[Cancel]}
      columns={columns}
    />
  );
}
