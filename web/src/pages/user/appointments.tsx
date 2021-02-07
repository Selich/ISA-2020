import React from 'react'
import { Header } from '../../components/sections/Header'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import PharmaciesTable from '../../components/tables/PharmaciesTable'
import AppointmentTable from '../../components/tables/AppointmentsTable'
import { CreateAppointmentModal, CreateConsultationsModal } from '../../components/sections/modal/CreateAppointmentModal'


const Appointments = (): JSX.Element => {
    const createExamModal = useDisclosure()
    const createConsultModal = useDisclosure()

    return (
        <>
            <Box m={10} mx={20}>
                <Button m={4} onClick={createExamModal.onOpen} colorScheme="teal">Schedule Exam</Button>
                <Button m={4} onClick={createConsultModal.onOpen} colorScheme="teal">Schedule Consultations</Button>
                <AppointmentTable/>
            </Box>
            <CreateAppointmentModal
                onOpen={createExamModal.onOpen}
                isOpen={createExamModal.isOpen}
                onClose={createExamModal.onClose}
            />
            <CreateConsultationsModal
                onOpen={createConsultModal.onOpen}
                isOpen={createConsultModal.isOpen}
                onClose={createConsultModal.onClose}
            />
        </>
    )

}

export default Appointments;
