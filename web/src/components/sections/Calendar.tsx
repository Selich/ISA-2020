import React, { Component } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { Text, HStack, useDisclosure,Link,Box,Flex,Button } from '@chakra-ui/react'
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
      <Text fontSize={15}>{event.title}</Text>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}

const EventAgenda = ({ event }) => {
  return (
    <span>
			<HStack>
		  <Button size="sm" onClick={appModal.onOpen}>Join</Button>
      <em style={{ fontSize: 11 }}>{event.title}</em>
      <p>{event.desc}</p>
		</HStack>
    </span>
  )
}

    return (
			<>
      <Box
        mx="8"
				fontSize={14}
        p="1"
        border="1px"
        rounded="2px"
        borderColor="gray.300"
        boxShadow="md"
			  w="1000px"
		
        bg="grey.200"
				minH="550px"
			  
        textAlign="center"
      >
        <DnDCalendar
					fontSize={11}
          defaultDate={moment().toDate()}
          events={events}
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
	</>
    );
}

export default MyCalendar;

