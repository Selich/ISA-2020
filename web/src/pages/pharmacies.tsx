import { Table, Thead, TableCaption, Tr, Th, Td, Grid, Center, Tabs, TabList, Tab, TabPanel, Flex, TabPanels, GridItem, Tbody, Box, SimpleGrid } from '@chakra-ui/react';
import React from "react";
import { Header } from '../components/sections/Header';
import { usePharmsQuery } from '../generated/graphql';


interface IFormInputs {
  email: string
  password: string
}


export default function Pharmacies() {
  const [{ data, fetching }] = usePharmsQuery();

  return (
    <>
      <Header />
      <SimpleGrid minChildWidth="410px">
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
        h="400px"
      >
        <Box align="left">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Name: </Th>
                        <Th>Address: </Th>
                        <Th>Map</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data && data.pharmacies &&
                      data.pharmacies.map(pharm => (
                      <Tr>
                        <Td>{pharm.name}</Td>
                        <Td>{pharm.address.street} {pharm.address.city}</Td>
                        <Td>Show Map</Td>
                      </Tr>
                      ))}
                    </Tbody>
                  </Table>
        </Box>
      </Box>
      </SimpleGrid>
    </>
  );
}
