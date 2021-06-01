import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component'
import NextLink from "next/link";
import {
  Box,
  Button,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useTiersQuery, useDefinitionsQuery } from '../../../generated/graphql'

export default function Loyalty() {
    const defCol = [
        { name: 'Type', selector: 'type', sortable: true, },
        { name: 'Score', selector: 'score', sortable: true, },
        { name: 'Price', selector: 'price', sortable: true, },
        { name: '', button: true, cell: row => <Button size="sm" colorScheme='teal'> Buy</Button>}
    ];
    const tierCol = [
        { name: 'Name', selector: 'name', sortable: true, },
        { name: 'Discount', selector: 'discount', sortable: true, },
        { name: 'Min', selector: 'scoreMin', sortable: true, },
        { name: 'Max', selector: 'scoreMax', sortable: true, },
        { name: '', button: true, cell: row => <Button size="sm" colorScheme='teal'>Edit</Button>}
    ];
  const [tiers] = useTiersQuery();
  const [definitions] = useDefinitionsQuery();
	let tList = null
	let dList = null

	if (tiers.fetching){ } else { 
	if (!tiers.data.tiers)
		 tList = <p> no data </p> 
	else {
      tList = <DataTable columns={tierCol} data={tiers.data.tiers} persistTableHead />
	}}


	if (definitions.fetching){ } else { 
	if (!definitions.data.definitions)
			dList = <p> no data </p>
	else {
      dList = <DataTable columns={defCol} data={definitions.data.definitions} persistTableHead />
	} }

  return (
    <>
      <Box
        m="4"
        p="8"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
        bg="grey.200"
        color="#2d383c"
        fontSize="2rem"
        textAlign="center"
        h="1200px"
      >
        <SimpleGrid columns={3} spacing={0} maxH="600px">
          <Box align="left">
            <Box>
              <NextLink href="/sysadmin">
								<Button w={180}>Home</Button>
              </NextLink>
            </Box>
          </Box>

          <Box align="center">
						{tList}
						{dList}
					</Box>

          <Box align="right">
            <Box>
                <Button w={180}>Add Tier</Button>
            </Box>
            <Box>
                <Button w={180}>Change Score</Button>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
	</>
  );
}
