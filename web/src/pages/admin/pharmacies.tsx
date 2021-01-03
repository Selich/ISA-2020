import React from 'react'
import { Header } from '../../components/sections/Header'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import PharmaciesTable from '../../components/tables/PharmaciesTable'




const Pharmacies = (): JSX.Element => {
    const createModal = useDisclosure()

    return (
        <>
            <Header />
            <Box m={10} mx={20}>
                <Button onClick={createModal.onOpen} colorScheme="teal">Create New Tier</Button>
                <PharmaciesTable/>
            </Box>
        </>
    )

}

export default Pharmacies;
