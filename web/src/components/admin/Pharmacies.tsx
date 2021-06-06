import { Text, Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Container } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useAddAdminMutation, useAddEmployeeMutation, useCreatePharmacyMutation, useFreePharmacistsQuery, useGetAdminsQuery, usePharmaciesQuery } from "../../generated/graphql";
import { Loading } from "../Loading";

export const Pharmacies = () => {
  const createModal = useDisclosure();

  const addModal = useDisclosure();
  const [selected,setSelected] = useState({});
  const [{ fetching, data }] = usePharmaciesQuery();
  const [, addEmployee] = useAddEmployeeMutation();

  const handler = (row) => {
    setSelected(row)
    addModal.onOpen()

  }
  let columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Street", selector: "street", sortable: true },
    { name: "City", selector: "city", sortable: true },
    { name: "Country", selector: "country", sortable: true },
    { name: "Rating", selector: "averageRating", sortable: true },
     {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => handler(row)}>
              Add Admin
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
      <Button onClick={() => createModal.onOpen()}>Create Pharmacy</Button>
      {body}
      <DataTable
        //@ts-ignore
        expandableRows
        expandableRowsComponent={<ExpandedComponent />}
        data={data.pharmacies}
        // data={[]}
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
  console.log(row.data)
  let variables ={
    inputs: {
      id: parseInt(row.data.id)
    }
  }
  const [{ fetching, data }] = useGetAdminsQuery({variables});
  const columns = [
    { name: "FirstName", selector: "firstName", sortable: true },
    { name: "Role", selector: "role", sortable: true },
    { name: "Email", selector: "email", sortable: true },
  ]


  let body = null;
  if (fetching) body = <Loading />;
  else if (!data) body = <Loading />;
  else {
    body = (
      <Container>

      <Text fontSize={16}>Admins:</Text>
      <DataTable
        data={data.getAdmins}
        columns={columns}
        noHeader={true}

      />
      </Container>

    )
  }
  return body
}
const AddAdmin = ({ selected,onOpen, isOpen, onClose }) => {
  const [, add] = useAddAdminMutation();
  const [{ fetching, data }] = useFreePharmacistsQuery();
  const router = useRouter()

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
      router.reload()
    })

  }

  const columns = [
    { name: "FirstName", selector: "firstName", sortable: true },
    { name: "Role", selector: "role", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button size="sm" onClick={() => handler(row)}>
          Add
        </Button>
      ),
    },
  ];
  let body = null;
  if (fetching) body = <Loading />;
  else if (!data) body = <Loading />;
  else {
    body = (
      <DataTable
        data={data.freePharmacists}
        columns={columns}
      />

    )
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Add Admin:</Text>
        </ModalHeader>
        <ModalBody>
          {body}
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
