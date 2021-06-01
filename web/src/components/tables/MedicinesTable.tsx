import React, {useState} from "react";
import { useShopQuery } from "../../generated/graphql";
import { useDisclosure, } from "@chakra-ui/react";
import { PharmacyBuyModal } from "../sections/modal/PharmacyBuyModal";
import { ModalComponent } from "../sections/modal/PharmacyBuyModal";
import { TableComponent } from './TableComponent'
import Cookies from "js-cookie";

export const MedicinesTable = (): JSX.Element => {
  const token = Cookies.get("token");
	const [medicine,setMedicine] = useState()
	const [pharmacy,setPharmacy] = useState()
	const [date,setDate] = useState()

  const buyItemModal = useDisclosure();

	const handleSubmit = () => {

	}

  let columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Type", selector: "type", sortable: true },
    { name: "Form", selector: "form", sortable: true },
    { name: "Rating", selector: "rating", sortable: true },
	]
 
	let variables = { token: token }

	return	(
	<>
		<TableComponent 
			query={useShopQuery}
			handler={setMedicine}
			modal={buyItemModal}
			columns={columns}
			buttonName={'Buy'}
		/>
		<ModalComponent
			handler={setPharmacy}
			disclosure={buyItemModal}
			title={'Pharmacy'}
		>
		</ModalComponent>
	</>

	)
};

/**
export const ExpandedComponent = ({ data, patient }) => {
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
 **/
