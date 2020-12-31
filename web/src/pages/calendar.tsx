import React, { Component } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { CreateAppointmentModal } from '../components/sections/CreateAppointmentModal'
import { ExaminationModal } from '../components/sections/ExaminationModal'
import { Header } from '../components/sections/Header'
import { HStack, useDisclosure,Link,Box,Flex,Button } from '@chakra-ui/react'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const MyCalendar: any = () => {
  const modal = useDisclosure()
  const appModal = useDisclosure()
  const events = [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Dusan Urosevic: Tegoba duse",
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
	const Event =({ event }) => {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}

const EventAgenda = ({ event }) => {
  return (
    <span>
			<HStack>
		  <Button size="sm" onClick={appModal.onOpen}>Join</Button>
      <em style={{ fontSize: 19 }}>{event.title}</em>
      <p>{event.desc}</p>
		</HStack>
    </span>
  )
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
          events={events}
					defaultView={Views.AGENDA}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
		    	components={{
						event: Event,
						agenda: {
							event: EventAgenda,
						},
					}}
          resizable
          style={{ height: "550px" }}
        />
		</Box>
      <CreateAppointmentModal
        onOpen={modal.onOpen}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      />
      <ExaminationModal
        onOpen={appModal.onOpen}
        isOpen={appModal.isOpen}
        onClose={appModal.onClose}
      />
	</>
    );
}

export default MyCalendar;
