import { Table, Thead, TableCaption, Tr, Th, Td, Grid, Center, Tabs, TabList, Tab, TabPanel, Flex, TabPanels, GridItem, Tbody } from '@chakra-ui/react';
import React from "react";
import { Header } from '../components/sections/Header';


interface IFormInputs {
  email: string
  password: string
}


export default function Pharmacies() {
  return (
    <>
      <Header />
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        p={10}
      >
        <Grid p={10} templateColumns="repeat(10, 3fr)" gap={1}>
          <GridItem colStart={2} colEnd={16}>

            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Table variant="simple">
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                      </Tr>
                      <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td isNumeric>30.48</Td>
                      </Tr>
                      <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
        </Grid>

      </Flex>
    </>
  );
}
