import { Select, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

import * as R from 'rambda'
import { ExaminationModal } from "../sections/modal/ExaminationModal";

const localizer = momentLocalizer(moment);

export const MyCalendar = ({events}) => {


  const [selectedPharm, setSelectedPharm] = useState('any')
  const [appointment, setAppointment] = useState({})
  const examModal = useDisclosure()

  // @ts-ignore

  const byPharm = R.groupBy(function(events) {
  // @ts-ignore
  if(events.pharmacy){

  // @ts-ignore
    return events.pharmacy.id
  }
  // @ts-ignore
  })

  const arr = byPharm(events)

  useEffect(() => {

  }, [])
  

  const handleSelect = (e) => {
    setAppointment(e)

    examModal.onOpen()

  }

  return (
  <div>
    <Select onChange={(e) => setSelectedPharm(e.target.value)}>
      {
        Object.keys(arr).map(item => (<option>{item}</option>))
      }
    </Select>
    <Calendar
      step={60}
      onKeyPressEvent={() => alert('test')}
      onSelectEvent={handleSelect}
      components={{event: Event}}
      style={{ height: 600, width: "100%" }}
      localizer={localizer}
      events={events}
      startAccessor="begin"
      endAccessor="end"
    />
    <ExaminationModal
      appointment={appointment}
      onOpen={examModal.onOpen}
      onClose={examModal.onClose}
      isOpen={examModal.isOpen}
    />
  </div>

  )
};

const Event = (event) => {
  return (
    <>
    <div>
      {/* {event.event.patient.firstName  + " " 
      + event.event.patient.lastName} */}
    </div>
    <div>
      {moment(event.event.begin).calendar()}
    </div>
    </>

  )
}