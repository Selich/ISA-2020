import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  useCreateDefinitionMutation,
  useCreatePharmacyMutation,
  useDefinitionsQuery,
  usePharmaciesQuery,
} from "../../generated/graphql";
import { Loading } from "../Loading";

export const AppointmentDefinition = () => {
  const createModal = useDisclosure();
  const defCol = [
    { name: "Type", selector: "kind", sortable: true },
    { name: "Score", selector: "score", sortable: true },
    { name: "Price", selector: "price", sortable: true },
  ];
  const [definitions] = useDefinitionsQuery();
  let dList = null;

  if (definitions.fetching) dList = <Loading/>;
  else if (!definitions.data) dList = <Loading/>;
  else{
      dList = (
        <DataTable
          columns={defCol}
          title='Appointment Definitions'
          data={definitions.data.definitions}
          persistTableHead
        />
      );
  }

  return (
    <>
      <SimpleGrid columns={2} spacing={0} maxH="600px">
        <Box align="center">{dList}</Box>
        <Box align="right">
          <Box>
            <Button onClick={() => createModal.onOpen()} w={180}>
              Add Definition
            </Button>
          </Box>
        </Box>
      </SimpleGrid>
      <CreateModal
        onOpen={createModal.onOpen}
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
    </>
  );
};

const CreateModal = ({ onOpen, isOpen, onClose }) => {
  const [, add] = useCreatePharmacyMutation();
  const [{ fetching, data }] = usePharmaciesQuery();
  const [selected, setSelected] = useState({});
  const token = Cookies.get("token");
  const addModal = useDisclosure();

  const handler = (row) => {
    setSelected(row);
    addModal.onOpen();
    onClose();
  };
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
          Pick
        </Button>
      ),
    },
  ];

  let body = null;
  if (fetching) body = <Loading />;
  else if (!data) body = <Loading />;
  else {
    body = <DataTable data={data.pharmacies} columns={columns} noHeader/>;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="">
        <ModalOverlay />
        <ModalContent maxW="56rem" maxH="106rem">
          <ModalHeader>
            <Text fontSize="xl">Pick Pharmacy:</Text>
          </ModalHeader>
          <ModalBody>{body}</ModalBody>
        </ModalContent>
      </Modal>
      <CreateDefinitionModal
        selected={selected}
        onOpen={addModal.onOpen}
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
      />
    </>
  );
};
const CreateDefinitionModal = ({ selected, onOpen, isOpen, onClose }) => {
  const [, add] = useCreateDefinitionMutation();
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
              kind: "derm",
              score: 10,
              price: 10 
            }}
            onSubmit={async (values, { setErrors }) => {
              let inputs = {
                  kind: values.kind,
                  score: values.score,
                  price: values.price,
                  pharmId: parseInt(selected.id), 
              }
              console.log(inputs)
              add({inputs}).then((res) => {
                console.log(res)
                alert("Definition created.");
                onClose();
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  Role:
                  <Field as="select" name="kind">
                    <option value="derm">Examination</option>
                    <option value="pharm">Consultation</option>
                  </Field>
                </div>
                <div>
                  Score
                  <Field type="number" name="score" />
                </div>
                <div>
                  Price
                  <Field type="number" name="price" />
                </div>

                <Button type="submit">Create Definition</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
