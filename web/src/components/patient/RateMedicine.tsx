import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useRateMedicineMutation, useRatingMedicineQuery } from "../../generated/graphql";
import { Loading } from "../Loading";

export const RateMedicine = () => {
  const token = Cookies.get("token");
  const createModal = useDisclosure();
  const [{ fetching, data }] = useRatingMedicineQuery({ variables: { token: token }, });
  const [selected,setSelected] = useState({})

  const handler = (row) => {
    setSelected(row)
    createModal.onOpen()

  };
  const columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Rating", selector: "rating", sortable: true },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button colorScheme="teal" size="sm" onClick={() => handler(row)}>
          Rate
        </Button>
      ),
    },
  ];
  let body = null
  if (fetching) body = <Loading/>;
  else if (!data) body = <Loading/>;
  else {
    body = <DataTable title='Rate Medicine' data={data.ratingMedicine} columns={columns} />;
  }
  return (
    <>
    {body}
      <CreateModal
        selected={selected}
        token={token}
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
    </>
  )
};

export const CreateModal = ({ token, selected, isOpen, onClose }) => {
  const [,rate] = useRateMedicineMutation();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              rating: '3',
            }}
            onSubmit={(data, { setSubmitting }) => {
              let inputs = {
                id: parseInt(selected.id),
                rating: parseInt(data.rating)
              }
              rate({inputs, token}).then(res => {
                console.log(res)
                onClose()

              })
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                <ModalHeader>Choose Rating</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <div>
                  Rating:
                  <Field as="select" name="rating">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Field>
                </div>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit">Submit</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
