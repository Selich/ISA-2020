import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"
import React, { useState } from "react"
import { useGetReservationByCodeMutation, usePickupReservationMutation } from "../../generated/graphql"

export const ApproveReservation = () => {


  let selectedModal = useDisclosure()
  return (
    <>
      <Button onClick={() => {selectedModal.onOpen() }}>Approve Reservation</Button>
      <ApproveModal
      isOpen={selectedModal.isOpen}
      onClose={selectedModal.onClose}
      />
    </>

  )

}

const ApproveModal = ({isOpen, onClose}) => {

  let selectedModal = useDisclosure()
  const [, getReservationByCode] = useGetReservationByCodeMutation()
  const [reservation,setReservation] = useState(null)

  return (
    <>
   <Modal  isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Approve Reservation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              code: "",
            }}
            onSubmit={(values, { setSubmitting }) => {

              let code = values.code
              console.log(code)

              getReservationByCode({code}).then(
                res => {
                    console.log(res)
                  if(!res.data.getReservationByCode) {
                    alert('Reservation was not found.')

                  } else {
                    setReservation(res.data.getReservationByCode)
                    selectedModal.onOpen()
                    onClose()
                  }
                }
              )
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                Input Code
                <Field  type="text" id="code" name="code" />
                <Button p={2} type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
      <ConfirmReservation
      reservation={reservation}
      isOpen={selectedModal.isOpen}
      onClose={selectedModal.onClose}
      />
      </>
  )
}

const ConfirmReservation = ({reservation, isOpen, onClose}) => {
  const [, pickUp] = usePickupReservationMutation()

  console.log(reservation)
  return (
   <Modal  isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Approve Reservation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {reservation && (
            <>
            <div>
            Medicine: {reservation.medicineItem.details.name}
            </div>
            </>

          )}
          <Formik
            initialValues={{
              date: "",
            }}
            onSubmit={(data, { setSubmitting }) => {
              let inputs ={
                id: parseInt(reservation.id),
              } 

              pickUp({inputs}).then(res => {
                console.log(res)
                alert('Reservation picked up.')
                onClose()

              })
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                <Button type="submit" colorScheme='teal'>Picked Up</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>

  )

}
