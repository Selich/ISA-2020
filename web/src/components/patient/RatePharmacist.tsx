import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useRateDermMutation, useRatePharmMutation, useRatingDermQuery, useRatingPharmQuery } from "../../generated/graphql";
import { Loading } from "../Loading";

export const RatePharmacists = () => {
  const token = Cookies.get("token");
  const createModal = useDisclosure();
  const [selected,setSelected] = useState({})
  const [{ fetching, data }] = useRatingPharmQuery({ variables: { token: token }, });
  const handler = (row) => {
    setSelected(row)
    createModal.onOpen()

  };
  const columns = [
    { name: "FirstName", selector: "firstName", sortable: true },
    { name: "LastName", selector:"lastName", sortable:true},
    { name: "Rating", selector: "averageRating", sortable: true },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button size="sm" onClick={() => handler(row)}>
          Rate
        </Button>
      ),
    },
  ];
  let body = null
  if (fetching) body = <Loading/>;
  else if (!data) body = <Loading/>;
  else {
    body = <DataTable title='Rate Employee' data={data.ratingPharm} columns={columns} />;
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
  const [,rate] = useRatePharmMutation();

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
                averageRating: data.rating
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
