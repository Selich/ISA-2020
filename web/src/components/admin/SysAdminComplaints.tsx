import { Text, Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Container, Input } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useAddAdminMutation, useAddEmployeeMutation, useComplaintsQuery, useCreatePharmacyMutation, useFreePharmacistsQuery, useGetAdminsQuery, usePharmaciesQuery } from "../../generated/graphql";
import { Loading } from "../Loading";

export const SysAdminComplaints = () => {
  const createModal = useDisclosure();
  const addModal = useDisclosure();
  const [selected,setSelected] = useState({});
  const [{ fetching, data }] = useComplaintsQuery();
  const [, addEmployee] = useAddEmployeeMutation();

  const handler = (row) => {
    setSelected(row)
    addModal.onOpen()

  }
  let columns = [
    { name: "Complaint", selector: "description", sortable: true },
     {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => handler(row)}>
            Answer
          </Button>
        ),
    }
  ];

  let body = null;
  if (fetching) body = <Loading />;
  else if (!data) body = <Loading />;
  else {
    body = (
      <>
      <DataTable
        //@ts-ignore
        expandableRows
        expandableRowsComponent={<ExpandedComponent />}
        data={data.complaints}
        title='Complaints'

        columns={columns}
      />
      <CreateModal
        onOpen={createModal.onOpen}
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
      <AddAdmin
      selected={selected}
        onOpen={addModal.onOpen}
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
      />
      </>
    )
  }
  return (
    <div>{body}</div>

  )
};

const ExpandedComponent = (row) => {

  let body = (
      <Container>
      <Text fontSize={16}>Complaint:{row.data.description}</Text>
      </Container>
  )

  return body
}
const AddAdmin = ({ selected,onOpen, isOpen, onClose }) => {
  const [, add] = useAddAdminMutation();
  const [{ fetching, data }] = useFreePharmacistsQuery();

  const handler = (row) => {
    let inputs =
    {
      email: row.email,
      pharmacy: selected.id
    }

    add({inputs}).then(res=> {
      console.log(res)
      alert('Admin added')
      onClose()
    })

  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Add Admin:</Text>
        </ModalHeader>
        <ModalBody>
          Answer
          <Input type="text"></Input>
          <Button>Submit</Button>
          
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


const CreateModal = ({ onOpen, isOpen, onClose }) => {
  const [, add] = useCreatePharmacyMutation();
  const token = Cookies.get("token");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Create Employee:</Text>
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
                    country: values.address.country
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
