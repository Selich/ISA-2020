import { Header } from '../../components/sections/Header'
import {
    Link,
    Tabs,
    TabList,
    Tab,
    Box,
    SimpleGrid,
    useDisclosure,
    TabPanel,
    TabPanels,
    Button,
} from "@chakra-ui/react"
import React from 'react'
import { ProfileModal } from '../../components/sections/modal/ProfileModal'
import { AppointmentsModal } from '../../components/sections/modal/AppointmentsModal'
import { HolidayModal } from '../../components/sections/modal/HolidayModal'
import { CreateAppointmentModal } from '../../components/sections/modal/CreateAppointmentModal'
import MyCalendar from '../../components/sections/Calendar'
import AppointmentTable from '../../components/tables/AppointmentsTable'
import PatientTable from '../../components/tables/PatientTable'

const Index = (): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // ! GET USERS DATA
    // const [{ data }] = usePharmsQuey({});
    const profileModal = useDisclosure()
    const appointmentModal = useDisclosure()
    const holidayModal = useDisclosure()

    return (
        <>
            <Header onOpen={onOpen} />
            <SimpleGrid minChildWidth="410px">
                <Box
                    m="4"
                    p="8"
                    border="1px"
                    rounded="2px"
                    borderColor="gray.300"
                    boxShadow="md"
                    bg="grey.200"
                    color="#2d383c"
                    textAlign="center"
                >
                    <Button onClick={profileModal.onOpen} as={Link} mr={4}>
                    Profile
                    </Button>
                    <Button onClick={appointmentModal.onOpen} as={Link} mr={4}>
                    Create Appointment
                    </Button>
                    <Button onClick={holidayModal.onOpen} as={Link} mr={4}>
                    Schedule Holiday
                    </Button>
                    <Tabs align='center'>
                        <TabList>
                            <Tab>Patients</Tab>
                            <Tab>Appointments</Tab>
                            <Tab>Calendar</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <PatientTable/>
                            </TabPanel>
                            <TabPanel>
                                <AppointmentTable/>
                            </TabPanel>
                            <TabPanel>
                                <MyCalendar/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </Box>
            </SimpleGrid>
            <ProfileModal
                onOpen={profileModal.onOpen}
                isOpen={profileModal.isOpen}
                onClose={profileModal.onClose}
            />
            <HolidayModal
                onOpen={holidayModal.onOpen}
                isOpen={holidayModal.isOpen}
                onClose={holidayModal.onClose}
            />
            <CreateAppointmentModal
                onOpen={appointmentModal.onOpen}
                isOpen={appointmentModal.isOpen}
                onClose={appointmentModal.onClose}
            />
        </>
    )

}


export default Index;