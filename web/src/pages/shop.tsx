import React from 'react'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import { Header } from '../components/sections/Header';
import MedicinesTable from '../components/tables/MedicinesTable';


const Shop = (): JSX.Element => {

    return (
        <>
            <Box m={10} mx={20}>
                <MedicinesTable user={user}/>
            </Box>
        </>
    )

}

export default Shop;
