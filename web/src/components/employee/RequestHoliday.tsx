import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import Cookies from "js-cookie"
import React, { useState } from "react"
import { useRequestHolidayMutation } from "../../generated/graphql"
import { DatePickerField } from "../../pages/shop"

export const RequestHoliday = () => {

  let selectedModal = useDisclosure()
  return (
    <>
      <Button onClick={() => {selectedModal.onOpen() }}>Request Holiday</Button>
      <RequestHolidayModal
      isOpen={selectedModal.isOpen}
      onClose={selectedModal.onClose}
      />
    </>
  )

}

const RequestHolidayModal = ({isOpen, onClose}) => {

  const token = Cookies.get('token')
  const [, requestHoliday] = useRequestHolidayMutation() 
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
              from: "",
              until: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              let inputs = {
                from: values.from,
                until: values.until
              }
              requestHoliday({inputs, token}).then( res =>
                {
                  console.log(res)
                  onClose()
                }
              )

            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                <div>
                From
                 <DatePickerField name="from" />
                </div>
                <div>
                Until
                 <DatePickerField name="until" />
                </div>
                <Button colorScheme='teal' type="submit">Request</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
      </>
  )
}
