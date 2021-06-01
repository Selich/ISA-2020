import {
  Box, Button, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { setDefaultLocale } from "react-datepicker";
import { TableComponent } from "../tables/TableComponent";
import { CurrentlyScheduled } from "./CurrentlyScheduled";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const onFileUpload = () => {
    let data = {
      file,
    };
    axios.post("http://localhost:4000/eprescriptions", data).then(
      res => {
        alert('File Uploaded')
        setIsUploaded(true)
        setData(res.data)
      }
    ).catch(err => alert(err));
  };

  return (
    <SimpleGrid columns={2}>
      <Box>
      <Text fontSize={17}>Upload QR code:</Text>
      <input
        style={{ fontSize: "14px" }}
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
      />
      <Button onClick={onFileUpload}>Upload</Button>
      </Box>
      <Box>
        <DataTable
          data={[]}
          columns={[]}
        />
      </Box>
    </SimpleGrid>
  );
};

export const EPrescriptions = () => {
  return (
    <Tabs colorScheme="green">
      <TabList>
        <Tab>Upload</Tab>
        <Tab>Previous E-Prescriptions</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Upload />
        </TabPanel>
        <TabPanel>
          <CurrentlyScheduled />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
