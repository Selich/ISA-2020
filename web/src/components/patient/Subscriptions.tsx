import React from "react";
import { MdCancel } from "react-icons/md";
import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { PharmacyProfileModal } from "../../components/sections/modal/PharmacyProfileModal";
import {
  UnsubscribeDocument,
  useSubscribedPharmaciesQuery,
  useUnsubscribeMutation,
} from "../../generated/graphql";
import Cookies from "js-cookie";
import { Loading } from "../Loading";

export const Subscription = (): JSX.Element => {
  const selectedItemModal = useDisclosure();
  const token = Cookies.get("token");
  const [{ fetching, data }] = useSubscribedPharmaciesQuery({
    variables: { token: token },
  });
  const [, unsubscribe] = useUnsubscribeMutation();
  const handler = (row) => {
    let inputs = {
      pharmacy: {
        id: row.id,
      },
    };
    console.log(inputs)
    unsubscribe({ inputs, token }).then((res) => {
      console.log(res);
    });
  };
  const columns = [
    { name: "Name", selector: "name", sortable: true },
    {
      name: "",
      button: true,
      cell: (row) => (
        <Button onClick={() => handler(row)} size="sm" colorScheme="red" color="white">
          <Icon size="md" as={MdCancel} />
          Unsubscribe
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
        columns={columns}
        data={data.subscribedPharmacies}
        persistTableHead
      />
    );
  }

  return (
    <>
      {body}
      <PharmacyProfileModal
        onOpen={selectedItemModal.onOpen}
        isOpen={selectedItemModal.isOpen}
        onClose={selectedItemModal.onClose}
      />
    </>
  );
};
