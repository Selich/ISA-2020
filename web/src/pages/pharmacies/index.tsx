import {
  Box, Button, useDisclosure
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Loading } from "../../components/Loading";
import { MapViewModal } from "../../components/sections/modal/MapViewModal";
import { RateModal } from "../../components/sections/modal/RateModal";
import { SubscribeModal } from "../../components/sections/modal/SubscribeModal";
import { TableComponent } from "../../components/tables/TableComponent";
import { usePharmaciesQuery, usePharmacyQuery } from "../../generated/graphql";


const PharmaciesTable = () => {
  const router = useRouter();
  const subscribeModal = useDisclosure();
  const rateModal = useDisclosure();
  const mapModal = useDisclosure();
  const [selected,setSelected] = useState({})
  const [{ fetching, data }] = usePharmaciesQuery();

  const columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Street", selector: "address.street", sortable: true },
    { name: "City", selector: "address.city", sortable: true },
    { name: "Rating", selector: "averageRating", sortable: true },
        {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => Map(row)}>
          Map
          </Button>
        ),
      },
        {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => Subscribe(row)}>
          Subscribe
          </Button>
        ),
      }
  ];

  const Details = (val) => {
    router.push("/pharmacies/" + val.id + "");
  };
  const Subscribe = (val) => {
    setSelected(val)
    subscribeModal.onOpen()
  };
  const Map = (val) => {
    setSelected(val)
    mapModal.onOpen()
  };
  const Rate = (val) => {
    rateModal.onOpen()
  };
  let body = null;
  if (fetching) body = <Loading/>;
  else if (!data) body = <Loading/>;
  else {
    body = (
      <Box>
        <DataTable
          //@ts-ignore
          data={data.pharmacies}
          columns={columns}
        />
      </Box>

    )
  }

  return (
      <>
      {body}
      <MapViewModal
        selected={selected}
        onOpen={mapModal.onOpen}
        isOpen={mapModal.isOpen}
        onClose={mapModal.onClose}
      />
      <SubscribeModal
        selected={selected}
        onOpen={subscribeModal.onOpen}
        isOpen={subscribeModal.isOpen}
        onClose={subscribeModal.onClose}
      />
     </>
  );
};

const Pharmacies = (): JSX.Element => (
  <Box m={10} mx={20}>
    <PharmaciesTable />
  </Box>
);

export default Pharmacies;
