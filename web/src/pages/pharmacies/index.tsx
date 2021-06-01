import React from "react";
import {
  Text,
  Box,
  Button,
  HStack,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { usePatientQuery, usePharmaciesQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { TableComponent } from "../../components/tables/TableComponent";
import { MapViewModal } from "../../components/sections/modal/MapViewModal";
import { RateModal } from "../../components/sections/modal/RateModal";
import { SubscribeModal } from "../../components/sections/modal/SubscribeModal";


const PharmaciesTable = () => {
  const router = useRouter();
  const subscribeModal = useDisclosure();
  const rateModal = useDisclosure();
  const mapModal = useDisclosure();

  const columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Street", selector: "address.street", sortable: true },
    { name: "City", selector: "address.city", sortable: true },
    { name: "Rating", selector: "averageRating", sortable: true },
  ];

  const Details = (val) => {
    router.push("/pharmacies/" + val.id + "");
  };
  const Subscribe = (val) => {
    subscribeModal.onOpen()
  };
  const Map = (val) => {
    mapModal.onOpen()
  };
  const Rate = (val) => {
    rateModal.onOpen()
  };

  return (
      <>
    <TableComponent
      query={usePharmaciesQuery}
      handler={[Details, Subscribe, Map, Rate ]}
      columns={columns}
      buttonName={"Details"}
    />
      {/* <MapViewModal
        onOpen={mapModal.onOpen}
        isOpen={mapModal.isOpen}
        onClose={mapModal.onClose}
      />
      <RateModal
        onOpen={rateModal.onOpen}
        isOpen={rateModal.isOpen}
        onClose={rateModal.onClose}
      />
      <SubscribeModal
        onOpen={subscribeModal.onOpen}
        isOpen={subscribeModal.isOpen}
        onClose={subscribeModal.onClose}
      /> */}
     </>
  );
};

const Pharmacies = (): JSX.Element => (
  <Box m={10} mx={20}>
    <PharmaciesTable />
  </Box>
);

export default Pharmacies;
