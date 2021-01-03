import React from 'react'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import { Header } from '../components/sections/Header';
import MedicinesTable from '../components/tables/MedicinesTable';


const EPrescriptions = (): JSX.Element => {

    return (
        <>
            <Header />
            <Box m={10} mx={20}>
                <MedicinesTable/>
            </Box>
        </>
    )

}

export default EPrescriptions;
