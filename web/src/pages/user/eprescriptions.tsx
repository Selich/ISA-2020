import React from 'react'
import { Header } from '../../components/sections/Header'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import PharmaciesTable from '../../components/tables/PharmaciesTable'
import AppointmentTable from '../../components/tables/AppointmentsTable'
import EPrescriptionsTable from '../../components/tables/EPrescriptionsTable'


const EPrescriptions = (): JSX.Element => {
    const createExamModal = useDisclosure()
    const createConsultModal = useDisclosure()

    return (
        <>
            <Header />
            <Box m={10} mx={20}>
                <EPrescriptionsTable/>
            </Box>
        </>
    )

}

export default EPrescriptions;
