import React from 'react';
import { Box } from "@chakra-ui/react";
import MedicinesTable from '../components/tables/MedicinesTable';

const Shop = (): JSX.Element => (
    <Box m={10} mx={20}>
        <MedicinesTable />
    </Box>
)

export default Shop;
