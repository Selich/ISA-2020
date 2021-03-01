import React from 'react'
import { Box, Button, useDisclosure, } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import AppointmentTable from '../../components/tables/AppointmentsTable'
import HistoryTableDerm from '../../components/tables/HistoryTableDerm'
import HistoryTablePharm from '../../components/tables/HistoryTablePharm'


const History = (): JSX.Element => {
    const createExamModal = useDisclosure()
    const createConsultModal = useDisclosure()

    return (
        <>
            <Box m={10} mx={20}>
                <Tabs variant="enclosed">
                    <TabList>
                        <Tab>Examinations</Tab>
                        <Tab>Consultations</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <HistoryTableDerm/>
                        </TabPanel>
                        <TabPanel>
                            <HistoryTablePharm/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )

}

export default History;
