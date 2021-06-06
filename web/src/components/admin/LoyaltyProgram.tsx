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
  useDisclosure
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import React from "react";
import DataTable from "react-data-table-component";
import {
  useCreateTierMutation, useTiersQuery
} from "../../generated/graphql";
import { Loading } from "../Loading";

export const LoyaltyProgram = () => {
  const createModal = useDisclosure();
  const defCol = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Discount %", selector: "discount", sortable: true },
  ];
  const [definitions] = useTiersQuery();
  let dList = null;

  if (definitions.fetching) dList = <Loading/>;
  else if (!definitions.data) dList = <Loading/>;
  else{
      dList = (
        <DataTable
          columns={defCol}
          title='Tiers'
          data={definitions.data.tiers}
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
              Add Tier
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
  const [, add] = useCreateTierMutation();
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
              discount: 1,
              scoreMin: 1,
              scoreMax: 1,
            }}
            onSubmit={async (values, { setErrors }) => {
              let inputs = {
                name: values.name,
                discount: values.discount,
                scoreMin: values.scoreMin,
                scoreMax: values.scoreMax
              }
              console.log(inputs)
              add({inputs}).then((res) => {
                console.log(res)
                alert("Tier created.");
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
                  Discount
                  <Field type="number" name="discount" />
                </div>
                <div>
                  Score Min
                  <Field type="number" name="scoreMin" />
                </div>
                <div>
                  Score Max
                  <Field type="number" name="scoreMax" />
                </div>

                <Button type="submit">Create Tier</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
