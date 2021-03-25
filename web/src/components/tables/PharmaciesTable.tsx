import { usePatientQuery } from "../../generated/graphql";
import {
  Avatar,
  Box,
  Image,
  Button,
  HStack,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import DataTable from "react-data-table-component";
import {
  usePharmaciesQuery,
  useSubscribeMutation,
} from "../../generated/graphql";
import { MapViewModal } from "../sections/modal/MapViewModal";
import { RateModal } from "../sections/modal/RateModal";
import { SubscribeModal } from "../sections/modal/SubscribeModal";
import Cookies from "js-cookie";
import { calcDistance } from "../../utils/distance";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <HStack>
      <Input
        id="search"
        type="text"
        placeholder="Search"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <Button type="button" onClick={onClear}>
        X
      </Button>
    </HStack>
  </>
);

let styles = {
  cells: {
    style: {
      color: "black",
      fontSize: "1.3em",
    },
  },
};

export const PharmaciesTable = (): JSX.Element => {
  let token = Cookies.get("token");
  let [patientQuery] = usePatientQuery({
    variables: {
      token: token,
    },
  });
  const [_, subscribe] = useSubscribeMutation();
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  let [{ data, error, fetching }] = usePharmaciesQuery();
  const columns = [
    {
      name: "",
      selector: "name",
      grow: 0,
      cell: (row) => (
        <Image
          boxShadow="0 4px 4px 2px #aaa"
          width={321}
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cd2b7c34220499.56c86beef2327.jpg"
          margin={4}
          pd={3}
        />
      ),
    },
    { name: "Name", selector: "name", sortable: true },
    { name: "City", selector: "address.city", sortable: true },
    { name: "Rating", selector: "averageRating", sortable: true },
    { name: "Distance (in meters)", selector: "distance", sortable: true },
  ];
  const router = useRouter();
  async function handleSubscribe(row) {
    const res = await subscribe(row.id);
  }
  let body = null;
  if (error) alert(error);
  if (fetching) {
    body = <p> loading </p>;
  } else if (!data.pharmacies) {
    body = <p> no pharmacies </p>;
  } else {
    let pharmacies = data.pharmacies
    if(patientQuery.data){
        let patient = patientQuery.data.patient
        pharmacies.map(item => item['distance'] = Math.floor(calcDistance(
            item.address.lat, item.address.long, patient.address.lat, patient.address.long)
            ))
    }
    body = (
      <>
        <DataTable
          columns={columns}
          title="Pharmacy List"
          data={pharmacies}
          pagination
          customStyles={styles}
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          persistTableHead
          expandableRows
          expandableRowsComponent={<ExpandedComponent data={this} />}
        />
      </>
    );
  }
  return body;
};
const ExpandedComponent = ({ data }) => {
  const subscribeModal = useDisclosure();
  const rateModal = useDisclosure();
  const mapModal = useDisclosure();
  return (
    <>
      <SimpleGrid columns={3}>
        {/* <Box m={6}>
                    <Image boxShadow="0 4px 4px 2px #aaa" width={321} src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cd2b7c34220499.56c86beef2327.jpg" margin={4} pd={3} />
                </Box> */}
        <Box m={6} p={5}>
          <Text fontWeight={600} fontSize="1.5em">
            {data.name}
          </Text>
          <hr />
          <Text fontSize="1em" p={2}>
            Address:{" "}
            {data.address.street +
              "," +
              data.address.city +
              "," +
              data.address.country}
          </Text>
          <Text fontSize="1em" p={2}>
            Coord: <br/>
            long: {data.address.long}
            <br/>
            lat: {data.address.lat}
          </Text>
          <Text fontSize="1em" p={2}>
            Rating: {data.rating}
          </Text>
        </Box>
        <Box m={6} p={5}>
          <HStack p={5}>
            <Button
              size="md"
              onClick={(val) => mapModal.onOpen()}
              colorScheme="teal"
            >
              Map
            </Button>
            <Button
              size="md"
              onClick={(val) => rateModal.onOpen()}
              colorScheme="teal"
            >
              Rate
            </Button>
            <Button
              size="md"
              onClick={(val) => subscribeModal.onOpen()}
              colorScheme="teal"
            >
              Subscribe
            </Button>
          </HStack>
        </Box>
      </SimpleGrid>
      <MapViewModal
        data={data}
        onOpen={mapModal.onOpen}
        isOpen={mapModal.isOpen}
        onClose={mapModal.onClose}
      />
      <RateModal
        onOpen={rateModal.onOpen}
        isOpen={rateModal.isOpen}
        data={data}
        onClose={rateModal.onClose}
      />
      <SubscribeModal
        data={data}
        onOpen={subscribeModal.onOpen}
        isOpen={subscribeModal.isOpen}
        onClose={subscribeModal.onClose}
      />
    </>
  );
};

export default PharmaciesTable;
