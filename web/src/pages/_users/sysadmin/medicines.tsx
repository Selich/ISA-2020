import React from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import MedicinesTable from "../../../components/tables/MedicinesTable";

const EPrescriptions = (): JSX.Element => {
  return (
    <>
      <Box m={10} mx={20}>
        <Button size="sm" mx={3} colorScheme="teal">
          Add New Medicine
        </Button>
        <MedicinesTable />
      </Box>
    </>
  );
};

export default EPrescriptions;
