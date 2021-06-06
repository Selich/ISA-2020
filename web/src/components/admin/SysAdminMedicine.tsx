import { Text, Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import React from "react";
import DataTable from "react-data-table-component";
import { useMedicineQuery, useAddMedicineDefinitionMutation } from "../../generated/graphql";

export const SysAdminMedicine = () => {
  const [{ fetching, data }] = useMedicineQuery();
  const createModal = useDisclosure();

  const columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Kind", selector: "kind", sortable: true },
    { name: "Form", selector: "form", sortable: true },
    { name: "Points", selector: "points", sortable: true },
  ];

  let body = null;
  if (fetching) body = <div>Loading</div>;
  else if (!data) body = <div>Loading</div>;
  else {
    body = (
      <DataTable
        data={data.medicines}
        columns={columns}
      />
    );
  }

  return (
    <>
      <Button onClick={() => createModal.onOpen()}>Create Medicine</Button>
      {body}
      <MedicineModal
        onOpen={createModal.onOpen}
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
    </>
  );
};
const MedicineModal = ({ onOpen, isOpen, onClose }) => {
  const [, addMedicine] = useAddMedicineDefinitionMutation();
  const token = Cookies.get("token");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Create Medicine:</Text>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
              info: "",
              kind: "",
              points: "",
              code: "",
              form: "",
              contents: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              let variables = {
                inputs: {
                  name: values.name,
                  info: values.info,
                  kind: values.kind,
                  code: values.code + "",
                  points: parseInt(values.points),
                  form: values.form,
                  contents: values.contents,
                },
              };

              addMedicine(variables).then((res) => {
                console.log(res);
                onClose();
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  Name:
                  <Field type="text" name="name" />
                </div>
                <div>
                  Info:
                  <Field type="text" name="info" />
                </div>
                <div>
                  Kind:
                  <Field type="text" name="kind" />
                </div>
                <div>
                  Code:
                  <Field type="text" name="code" />
                </div>
                <div>
                  Points:
                  <Field type="text" name="points" />
                </div>
                <div>
                  Form:
                  <Field type="text" name="form" />
                </div>
                <div>
                  Contents:
                  <Field type="text" name="contents" />
                </div>
                <Button type="submit">Create Medicine</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};