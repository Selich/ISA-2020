import { Avatar, Text, Center, HStack, SimpleGrid, Select, FormLabel, Switch, Input, Box, Link, Button, Flex, useDisclosure } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";


const columns = [
    { name: "Pharmacy", selector: "pharmacy.name" },
    { name: "Doctor", selector: "employee.lastName" },
    { name: "Type", selector: "type" },
    { name: "Date", selector: "begin", sortable: true },
    { name: "Price", selector: "price", sortable: true },
]


export default function AppointmentTable() {
	  const [data, setData] = useState()
		useEffect(() => {
			let temp = localStorage.getItem('user')
			setData(JSON.parse(temp).appointments)



		}, [])

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
                    <Text>{data.employee.firstName} {data.employee.lastName}</Text>
                    <Text>Email: {data.employee.email}</Text>
                    <Text>Rating: {data.employee.averageRating}</Text>
                    <Text>Date: {data.begin}</Text>
                </Box>
            </SimpleGrid>
            <Button disabled={true}>Rate</Button>
            <Button disabled={true}>Report</Button>
        </>
    )

}
