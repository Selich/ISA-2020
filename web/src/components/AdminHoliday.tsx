import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useHolidayQuery, useApproveHolidayMutation, useDenyHolidayMutation } from "../generated/graphql";

export const AdminHolidays = () => {
  const token = Cookies.get("token");
  const [{ fetching, data }] = useHolidayQuery({ variables: { token: token } });
  const [comment, setComment] = useState("");
  const [selected, setSelected] = useState({});
  const commentModal = useDisclosure();
  const [, approveHoliday] = useApproveHolidayMutation();
  const [, denyHoliday] = useDenyHolidayMutation();
  const approve = (row) => {
    delete row.__typename;
    approveHoliday({
      inputs: row,
      token: token,
    }).then((res) => console.log(res));
  };
  const deny = (row) => {
    delete row.__typename;
    denyHoliday({
      inputs: row,
      token: token,
    }).then((res) => console.log(res));
  };
  const columns = [
    { name: "Doctor", selector: "employee.lastName", sortable: true },
    { name: "Role", selector: "employee.role", sortable: true },
    { name: "From", selector: "from", sortable: true },
    { name: "Until", selector: "until", sortable: true },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button
          size="sm"
          onClick={() => {
            setSelected(row);
            commentModal.onOpen();
          }}
        >
          Approve
        </Button>
      ),
    },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button
          size="sm"
          onClick={() => {
            setSelected(row);
            commentModal.onOpen();
          }}
        >
          Deny
        </Button>
      ),
    },
  ];
  let body = null;
  if (fetching) body = <div>Loading</div>;
  else if (!data) body = <div>Loading</div>;
  else {
    console.log(data.holiday);
    body = (
      <>
        <DataTable columns={columns} data={data.holiday} />
        <CommentModal
          setComment={setComment}
          selected={selected}
          dis={commentModal}
        />
      </>
    );
  }

  return body;
};
const CommentModal = ({ setComment, dis, selected }) => {
  return (
    <>
      <Modal isOpen={dis.isOpen} onClose={dis.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={(e) => setComment(e.target.value)}></Input>
            <Button>Submit</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
