import React from 'react'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import { Header } from '../components/sections/Header'
import PharmaciesTable from '../components/tables/PharmaciesTable'




const Pharmacies = (): JSX.Element => {
    const createModal = useDisclosure()

    return (
        <>
            <Header />
            <Box m={10} mx={20}>
                <PharmaciesTable/>
            </Box>
        </>
    )

}

export default Pharmacies;
