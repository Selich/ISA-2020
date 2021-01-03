import React from 'react'
import { Header } from '../../components/sections/Header'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import PharmaciesTable from '../../components/tables/PharmaciesTable'
import AppointmentTable from '../../components/tables/AppointmentsTable'


const Appointments = (): JSX.Element => {
    const createExamModal = useDisclosure()
    const createConsultModal = useDisclosure()

    return (
        <>
            <Header />
            <Box m={10} mx={20}>
                <Button onClick={createExamModal.onOpen} colorScheme="teal">Schedule Exam</Button>
                <Button onClick={createConsultModal.onOpen} colorScheme="teal">Schedule Consultations</Button>
                <AppointmentTable/>
            </Box>
        </>
    )

}

export default Appointments;
