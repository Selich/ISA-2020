import React from "react";
import { MdCancel } from "react-icons/md";
import {
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { PharmacyProfileModal } from "../../components/sections/modal/PharmacyProfileModal";

export const SubscriptionTable = ({data}): JSX.Element => {
	console.log(data.patient)
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState( false);
  const selectedItemModal = useDisclosure();
  const columns = [
    { name: "Name", selector: "name", sortable: true, },
    { name: "Street", selector: "street", sortable: true, },
    { name: "City", selector: "city", sortable: true, },
    { name: "Rating", selector: "rating", sortable: true, },
    { name: "", button: true,
      cell: (row) => (
        <Button
					onClick={() => alert('echo')}
          size="sm"
          colorScheme="red"
          color="white"
        >
          <Icon size="md" as={MdCancel} />
          Unsubscribe
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data.patient.subscriptions}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        persistTableHead
      />
      <PharmacyProfileModal
        onOpen={selectedItemModal.onOpen}
        isOpen={selectedItemModal.isOpen}
        onClose={selectedItemModal.onClose}
      />
    </>
  );
};
