import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { CreateAppointmentModal } from '../components/sections/CreateAppointmentModal'
import { Header } from '../components/sections/Header'
import { useDisclosure,Link,Box,Flex,Button } from '@chakra-ui/react'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const MyCalendar: any = () => {
  const modal = useDisclosure()
  const events = [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title",
      },
    ]

  const onEventResize = (data) => {
		//const { start, end } = data;

		// this.setState((state) => {
		//   state.events[0].start = start;
		//   state.events[0].end = end;
		//   return { events: [...state.events] };
		//  });
  };

  const onEventDrop = (data) => {
    console.log(data);
  }

    return (
			<>
			<Header/>
			<Flex zIndex={1} position="sticky" top={0} p={2}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
          <Button as={Link} mr={3} onClick={modal.onOpen}>
            Create Appointment
          </Button>
			</Flex>
			</Flex>
      <Box
        mx="8"
        p="5"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
        bg="grey.200"
				minH="550px"
        textAlign="center"
      >
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: "550px" }}
        />
		</Box>
      <CreateAppointmentModal
        onOpen={modal.onOpen}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      />
	</>
    );
}

export default MyCalendar;

