// TODO: FIX PATIENT PROFILE
// dermatologa (samo ukoliko je imao održan bar jedan pregled kod tog dermatologa),
// farmaceuta (samo ukoliko je imao održano bar jedno savetovanje kod tog farmaceuta),
// lek (samo ukoliko je bar jednom rezervisao i preuzeo lek ili mu je prepisan putem Recepta),
// apoteku (samo ukoliko je bar jednom rezervisao i preuzeo lek ili mu je prepisan putem eRecepta ili je imao održan bar jedan pregled ili jedno

import { Tabs, TabList, Tab, TabPanel, Button, TabPanels } from "@chakra-ui/react";
import React from "react";
import { RateDerm } from "./RateDerm";
import { RateMedicine } from "./RateMedicine";
import { RatePharmacists } from "./RatePharmacist";
import { RatePharmacy } from "./RatePharmacy";

export const Rate = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Examinations</Tab>
        <Tab>Consultation</Tab>
        <Tab>Medicines</Tab>
      </TabList>
            <TabPanels>
      <TabPanel>
        <RateDerm />
      </TabPanel>
      <TabPanel>
        <RatePharmacists />
      </TabPanel>
      <TabPanel>
        <RateMedicine />
      </TabPanel>
            </TabPanels>
    </Tabs>
  );
};

// -uto.