import { Tabs, TabList, Tab, TabPanels, TabPanel, Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React from "react";
import DataTable from "react-data-table-component";
import { useAppointmentsPatientQuery, useUnschedulePatientMutation } from "../../generated/graphql";
import { CurrentlyScheduled } from "./CurrentlyScheduled";

export const Examinations = () => {
  return (
    <Tabs colorScheme="green">
      <TabList>
        <Tab>Currently Scheduled</Tab>
        <Tab>History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CurrentExam type={'current'} />
        </TabPanel>
        <TabPanel>
          <CurrentExam type={'history'} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const CurrentExam = ({type}) => {
  const token = Cookies.get('token')
  let [{ fetching, data }] = useAppointmentsPatientQuery({
    variables: {
      token: token,
      inputs: {
        kind: 'derm'
      },
      type: type
    },
  });
  let [,unschedulePatient] = useUnschedulePatientMutation()

  const handler = (row) => {
    const variables = {
      inputs: {
        id: parseInt(row.id),
        begin: row.begin

      },
      token: token
    }
    console.log(variables)

    unschedulePatient(variables).then(
      res => {
        console.log(res)
        if(!res.data.unschedulePatient) alert('Less then 24h from the consulations')

      }
    )

  }
    const columns = [
      { name: "Begin", selector: "begin", sortable: true },
      { name: "Kind", selector: "kind", sortable: true },
      { name: "Price", selector: "price", sortable: true },
      { name: "Pharmacy", selector: "pharmacy.name", sortable: true },
      // { name: "Doctor", selector: "employee.lastName", sortable: true },
      {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button hidden={type === 'history'} size="sm" onClick={() => handler(row)}>
            Cancel
          </Button>
        ),
      }
    ];
  
  let body = null
  if(fetching) body = <div>Loading</div>
  else if(!data) body = <div>Loading</div>
  else {
    if(!data.appointmentsPatient) body = <div>Empty</div>
    else{
      console.log(data.appointmentsPatient)

    body = (
    <DataTable
      data={data.appointmentsPatient}
      columns={columns}

    />

    )
    }
  }

  return body
}