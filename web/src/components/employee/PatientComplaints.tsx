import {
  Button, Container, Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  useComplaintsPatientQuery, useCreateComplaintMutation
} from "../../generated/graphql";
import { Loading } from "../Loading";

export const PatientComplaints = () => {
  const createModal = useDisclosure();
  const [selected, setSelected] = useState({});
  const token = Cookies.get('token')
  const [{ fetching, data }] = useComplaintsPatientQuery({
    variables: {
      token: token,
    },
  });

  let columns = [
    { name: "Employee", selector: "employee.firstName", sortable: true },
    { name: "", selector: "employee.lastName", sortable: true },
    { name: "Complaint", selector: "description", sortable: true },
    { name: "Created", selector: "createdAt", sortable: true },
  ];

  let body = null;
  if (fetching) body = <Loading />;
  else if (!data) body = <Loading />;
  else {
    body = (
      <>
        <Button onClick={() => createModal.onOpen()}>Create Complaint</Button>
        {body}
        <DataTable
          //@ts-ignore
          expandableRows
          expandableRowsComponent={<ExpandedComponent />}
          data={data.complaintsPatient}
          // data={[]}
          columns={columns}
        />
        <CreateModal
          onOpen={createModal.onOpen}
          isOpen={createModal.isOpen}
          onClose={createModal.onClose}
        />
      </>
    );
  }
  return <div>{body}</div>;
};

const ExpandedComponent = (row) => {
  let body = (
    <Container>
      <Text fontSize={16}>Complaint:{row.data.description}</Text>
    </Container>
  );

  return body;
};

const CreateModal = ({ onOpen, isOpen, onClose }) => {
  const [, add] = useCreateComplaintMutation();
  const token = Cookies.get("token");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Create Complaint:</Text>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
              address: {
                street: "",
                city: "",
                country: "",
              },
              telephone: "",
              role: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              let variables = {
                inputs: {
                  name: values.name,
                  address: {
                    street: values.address.street,
                    city: values.address.city,
                    country: values.address.country,
                  },
                },
                token: token,
              };
              console.log(variables);

              add(variables).then((res) => {
                alert("Pharmacy Created.");
                onClose();
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  Name
                  <Field type="text" name="name" />
                </div>
                <div>
                  Street
                  <Field type="text" name="address.street" />
                </div>
                <div>
                  City
                  <Field type="text" name="address.city" />
                </div>
                <div>
                  Country
                  <Field type="text" name="address.country" />
                </div>
                <div>
                  <Button type="submit">Create</Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
