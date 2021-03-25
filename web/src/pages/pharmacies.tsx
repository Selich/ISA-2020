import React from 'react'
import { Box } from "@chakra-ui/react"
import PharmaciesTable from '../components/tables/PharmaciesTable'

const Pharmacies = (): JSX.Element => (
    <Box m={10} mx={20}>
        <PharmaciesTable />
    </Box>
)

export default Pharmacies;
