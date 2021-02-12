import React, { Component } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { Text, HStack, useDisclosure,Link,Box,Flex,Button } from '@chakra-ui/react'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const MyCalendar: any = ({schedule}) => {
  const appModal = useDisclosure()
  const events = [
      {
        start: moment().toDate(),
        end:	moment().add(1, "days").toDate(),
        title: "Dusan Urosevic: Tegoba duse",
      }]

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

