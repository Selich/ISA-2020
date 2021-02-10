import { Center, HStack, SimpleGrid, Select, FormLabel, Switch, Input, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Link, Button, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import { useEmployeesQuery } from '../../generated/graphql'


const columns = [
	{name: "Name", selector:"firstName"},
	{name: "", selector:"lastName"},
	{name: "Role", selector:"role"},
	// {cell: row => <div><Button size="sm" colorScheme='teal'>Subscribe</Button></div> },
]


export default function EmployeeTable() {
  let [{ data, error, fetching }] = useEmployeesQuery();
  const modal = useDisclosure()
  const btnRef = React.useRef()
  const router = useRouter();
	let body = null
	if(fetching){
			body = ( <p> loading </p> )
	} else if(!data.employees){
			body = ( <p> no pharmacies </p> )
	} else {
			body = (
					<DataTable
							columns={columns}
							data={data.employees}
							pagination
							persistTableHead
					/>
	)}
  return (
		<Box>
			{body}
		</Box>
  );
}
