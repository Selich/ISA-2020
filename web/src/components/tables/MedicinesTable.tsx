import {
  Box,
  Button,
  FormLabel,
  Grid,
  HStack,
  Input,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
// import { FaCancel } from 'react-icons'
import DataTable from "react-data-table-component";
import { useShopQuery } from "../../generated/graphql";
import { PharmacyBuyModal } from "../sections/modal/PharmacyBuyModal";

const FilterComponent = ({ filterText, onFilter, onClear }) => {
  let [{ data, fetching }] = useShopQuery();
  let ret = null;
  if (fetching) {
    ret = <p> loading </p>;
  } else {
    if (!data.shop) {
      ret = <p> no data </p>;
    } else {
      let types = [];
      //@ts-ignore
      data.shop.forEach((element) => types.push(element.type));
      data.shop.forEach((element) => alert(element));
      //@ts-ignore
      let unique = [...new Set(types)];
      // if (unique.size == 0){
      // 	ret = (<p value="option1">test</p>)
      // } else {
      // 	ret = (
      // 	  <Select size="sm" placeholder="All">
      // 		</Select>

      // 	)

      // }
    }
  }
  return (
    <>
      <HStack gap={3}>
        <FormLabel>Name:</FormLabel>
        <Input
          size="sm"
          id="search"
          type="text"
          placeholder="Search"
          aria-label="Search Input"
          value={filterText}
          onChange={onFilter}
        />
        <FormLabel>Type:</FormLabel>

        {ret}
        <FormLabel>Rating:</FormLabel>
        <FormLabel>1</FormLabel>
        <Slider aria-label="slider-ex-1" defaultValue={30}>
          <SliderTrack defaultValue={5}>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <FormLabel>5</FormLabel>
        <Button type="button" onClick={onClear}>
          X
        </Button>
      </HStack>
    </>
  );
};

const MedicinesTable = (): JSX.Element => {
  const [resetPaginationToggle, _] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const buyItemModal = useDisclosure();
  const columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Type", selector: "type", sortable: true },
    { name: "Form", selector: "form", sortable: true },
    { name: "Rating", selector: "rating", sortable: true },
    {
      name: "",
      button: true,
      cell: (row) => (
        <Button
          size="sm"
          onClick={(val) => {
            setItem(row);
            buyItemModal.onOpen();
          }}
          colorScheme="teal"
        >
          Buy
        </Button>
      ),
    },
  ];
  useEffect(() => {
    setItem(item);
  }, [item]);

  let [{ data, error, fetching }] = useShopQuery();
  let body = null;
  if (error) alert(error);
  if (fetching) {
    body = <p> loading </p>;
  } else {
    if (!data.shop) {
      body = <p> no data </p>;
    } else {
      body = (
        <>
          <Grid columns={2}>
            <Box m={10}>
              <DataTable
                columns={columns}
                data={data.shop}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                expandableRows
                persistTableHead
                expandableRowsComponent={<ExpandedComponent data={this} />}
              />
            </Box>
          </Grid>
          <PharmacyBuyModal
            onOpen={buyItemModal.onOpen}
            isOpen={buyItemModal.isOpen}
            onClose={buyItemModal.onClose}
            item={item}
          />
        </>
      );
    }
  }
  return body;
};
export default MedicinesTable;

export const ExpandedComponent = ({ data }) => {
  return (
    <>
      <SimpleGrid columns={3}>
        <Box m={6}>
          <FormLabel>Name: {data.name}</FormLabel>
          <FormLabel>Type: {data.type}</FormLabel>
          <FormLabel>Form: {data.form}</FormLabel>
          <FormLabel>Rating: {data.rating}</FormLabel>
        </Box>
        <Box m={6}>
          <FormLabel>
            Prescription Required? {data.isPrescriptionRequired ? "Yes" : "No"}
          </FormLabel>
          <FormLabel>Producer:</FormLabel>
          <FormLabel>{data.producer}</FormLabel>
          <FormLabel>Information:</FormLabel>
          <FormLabel>{data.info}</FormLabel>
          <FormLabel>Points Earned: {data.points}</FormLabel>
        </Box>
        <Box m={6}>
          <Button md={3} disabled={true}>
            Rate
          </Button>
        </Box>
      </SimpleGrid>
    </>
  );
};
