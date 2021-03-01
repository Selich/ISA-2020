import React , {useEffect}from 'react'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import MedicinesTable from '../components/tables/MedicinesTable';


const Shop = (): JSX.Element => {
    return (
            <Box m={10} mx={20}>
                <MedicinesTable/>
            </Box>
    )

}

export default Shop;
