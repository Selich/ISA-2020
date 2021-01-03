import React from "react";
import { Box, Link, Flex, Button, Text, Heading, SimpleGrid, Menu, MenuButton, MenuItem, MenuList, Avatar, Icon, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HistoryModal } from "../../components/sections/modal/HistoryModal";
import { SubscriptionModal } from "../../components/sections/modal/SubscriptionModal";
import { AppointmentsModal } from "../../components/sections/modal/AppointmentsModal";
import { Header } from "../../components/sections/Header";
import { useMeQuery } from "../../generated/graphql";
import { ScheduleExamModal } from "../../components/sections/modal/ScheduleExamModal";



export default function Profile() {
  let [{ data, fetching }] = useMeQuery();
  const subModal = useDisclosure()
  const histModal = useDisclosure()
  const appModal = useDisclosure()
  const scheduleModal = useDisclosure()
	data = {
		me: {
			email: "selich.work@gmail.com",
			address: {
				street: "Poenkareova",
				city: "Novi Sad",
				country: "Serbia",
			}
		}
	}
  return (
    <>
      <Box
        m="4"
        p="8"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
        bg="grey.200"
        color="#2d383c"
        fontSize="2rem"
        textAlign="center"
        h="400px"
      >
      <SimpleGrid columns={2}>
        <Box align="left">
          <Avatar name={data.me.email.split('@')[0]} src="" size="2xl" margin={4} pd={3} />
          <Text>{data.me.firstName} {data.me.lastName}</Text>
          <Text fontSize={17}>Address:</Text>
          <Text fontSize={14}>
            {data.me.address.street + " "
            + data.me.address.city + " "
            + data.me.address.country}
          </Text>
        </Box>
        <Box align="right">
					<Box> <Button w={180} onClick={subModal.onOpen}>Subscription</Button> </Box>
					<Box> <Button w={180} onClick={histModal.onOpen}>History</Button> </Box>
					<Box> <Button w={180} onClick={appModal.onOpen}>Appointments</Button> </Box>
					<Box> <Button w={180} onClick={scheduleModal.onOpen}>Schedule Appointment</Button> </Box>
        </Box>
			</SimpleGrid>
      </Box>
      <HistoryModal
        onOpen={histModal.onOpen}
        isOpen={histModal.isOpen}
        onClose={histModal.onClose}
      />
      <AppointmentsModal
        onOpen={appModal.onOpen}
        isOpen={appModal.isOpen}
        onClose={appModal.onClose}
      />
      <SubscriptionModal
        onOpen={subModal.onOpen}
        isOpen={subModal.isOpen}
        onClose={subModal.onClose}
      />
      <ScheduleExamModal
        onOpen={scheduleModal.onOpen}
        isOpen={scheduleModal.isOpen}
        onClose={scheduleModal.onClose}
      />
    </>
  );
}


