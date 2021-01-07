import { Avatar, Text, Center, HStack, SimpleGrid, Select, FormLabel, Switch, Input, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Link, Button, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import DataTable from "react-data-table-component";


const data = [
    {
        doctor: {
            firstName: "Nikola",
            lastName: "Selic",
            email: "selich.work@gmail.com",
            averageRating: 4.13,
        }, type: "Dherm", pharmacy: "Pharmacy1", price: 200, from: "12/12/2012"
    },
]
const columns = [
    { name: "Doctor", selector: "doctor.lastName" },
    { name: "Pharmacy", selector: "pharmacy" },
    { name: "Type", selector: "type" },
    { name: "Price", selector: "price", sortable: true },
    { name: "Date", selector: "from", sortable: true },
    // {cell: row => <div><Button size="sm" colorScheme='teal'>Subscribe</Button></div> },
]


export default function AppointmentTable() {
    return (
        <>
            <Box>
                <DataTable
                    data={data}
                    expandableRows
                    expandableRowsComponent={<ExpandedComponent data={this} />}
                    columns={columns}
                />
            </Box>
        </>
    );
}

export const ExpandedComponent = ({ data }) => {

    return (
        <>
            <SimpleGrid columns={2}>
                <Box m={6}>
                    <Avatar margin={4} pd={3} />
                    <Text>{data.doctor.firstName} {data.doctor.lastName}</Text>
                    <Text>Email: {data.doctor.email}</Text>
                    <Text>Rating: {data.doctor.averageRating}</Text>
                    <Text>Date: {data.from}</Text>
                </Box>
            </SimpleGrid>
            <Button disabled={true}>Rate</Button>
            <Button disabled={true}>Report</Button>
        </>
    )

}