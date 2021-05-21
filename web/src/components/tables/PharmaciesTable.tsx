import React, { useEffect, useState } from "react";
import { usePatientQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import {
  Box,
  Image,
  Button,
  HStack,
  SimpleGrid,
	Select,
	Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { usePharmaciesQuery } from "../../generated/graphql";
import Cookies from "js-cookie";
import { MapViewModal } from "../sections/modal/MapViewModal";
import { RateModal } from "../sections/modal/RateModal";
import { SubscribeModal } from "../sections/modal/SubscribeModal";
import { calcDistance } from "../../utils/distance";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Input id="search"  placeholder="Filter By Name" value={filterText} onChange={onFilter} />
  </>
);

export const PharmaciesTable = ({ user }): JSX.Element => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  let [{ data, error, fetching }] = usePharmaciesQuery();
  let [patientQuery] = usePatientQuery({ variables: { token: token } });
  let patient = null;
  if (patientQuery.fetching) {
  } else if (!patientQuery.data) {
  } else { patient = patientQuery.data.patient; }


  const handleClick = (e, val) => {
    e.preventDefault();
    router.push("/pharmacies/" + val + "");
  };


  const columns = [
    {
      name: "",
      selector: "name",
      grow: 0,
      cell: (row) => (
        <Image
          boxShadow="0 4px 4px 2px #aaa"
          width={521}
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cd2b7c34220499.56c86beef2327.jpg"
          margin={4}
          pd={3}
        />
      ),
    },
    { name: "Name", selector: "name", sortable: true },
    { name: "Street", selector: "address.street", sortable: true },
    { name: "City", selector: "address.city", sortable: true },
    { name: "Rating", selector: "averageRating", sortable: true },
    { name: "Distance (in meters)", selector: "distance", sortable: true },
    { name: "", button: true, cell: (row) => <a onClick={(e) => handleClick(e, row.id)}>Details</a>, },
  ];

	let filteredItems = []
  let body = null;
  if (error) alert(error);
  if (fetching) {
    body = <p> loading </p>;
  } else if (!data.pharmacies) {
    body = <p> no pharmacies </p>;
  } else {
		filteredItems = data.pharmacies.filter(
			(item) =>
				item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
		);
    if (!patient) {
      filteredItems.map((item) => (item["distance"] = "Unknown"));
    } else {
      filteredItems.map(
        (item) => (item["distance"] = Math.floor(
            calcDistance(
              item.address.lat,
              item.address.long,
              patient.address.lat,
              patient.address.long
            )
          ))
      );
    }
    body = (
      <>
        <DataTable
          columns={columns}
					subHeader
			subHeaderComponent={<></>}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          persistTableHead
          expandableRows
          expandableRowsComponent={
            <ExpandedComponent user={patient} data={this} />
          }
        />
      </>
    );
  }
  return body;
};
const ExpandedComponent = ({ data, user }) => {
  const subscribeModal = useDisclosure();
  const rateModal = useDisclosure();
  const mapModal = useDisclosure();
  return (
    <>
      <SimpleGrid columns={3}>
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
            Coord: <br />
            long: {data.address.long}
            <br />
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
        user={user}
        data={data}
        onOpen={subscribeModal.onOpen}
        isOpen={subscribeModal.isOpen}
        onClose={subscribeModal.onClose}
      />
    </>
  );
};

export default PharmaciesTable;
/**
	const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
		let addresses = data.pharmacies.map(item => item.address.city)
		let add =  Array.from(new Set(addresses))

		return (
			<div>test</div>
		)
		return (
			<SimpleGrid columns={2} spacing={3}>
				<Box align="left">
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		</Box>
		<Box align="left">
			<Select placeholder="All">
			{
				add.map(item => 
					(
						<option>{item}</option>
					)
				)
			}
			</Select>
		</Box>
		</SimpleGrid>
		);
  }, [filterText, resetPaginationToggle]);

**/
