import React from 'react'
import { Box } from "@chakra-ui/react"
import PharmaciesTable from '../components/tables/PharmaciesTable'

const Pharmacies = ({user}): JSX.Element => (
    <Box m={10} mx={20}>
        <PharmaciesTable user={user} />
    </Box>
)

export default Pharmacies;
