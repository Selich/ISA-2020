import React from 'react'
import { Header } from '../../components/sections/Header'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import EPrescriptionsTable from '../../components/tables/EPrescriptionsTable'


const EPrescriptions = (): JSX.Element => {

    return (
        <>
            <Box m={10} mx={20}>
                <EPrescriptionsTable/>
            </Box>
        </>
    )

}

export default EPrescriptions;
