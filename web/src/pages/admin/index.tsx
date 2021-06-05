import {
  Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { DermExaminations } from "../../components/employee/Examinations";
import { DermHolidays } from "../../components/employee/Holidays";
import { MyCalendar } from "../../components/employee/MyCalendar";
import { Patients } from "../../components/employee/PatientsComponent";
import {
  useAppointmentsQuery, useApproveHolidayMutation, useDenyHolidayMutation, useHolidayQuery
} from "../../generated/graphql";

const TabMenu = () => (
  <TabList>
    <Tab>Pharmacy</Tab>
    <Tab>Employees</Tab>
    <Tab>Inventory</Tab>
    <Tab>Order</Tab>
    <Tab>Derm Examinations</Tab>
    <Tab>Add Pharmacists</Tab>
    <Tab>Holidays</Tab>
  </TabList>
);


export default function Index() {
  let token = Cookies.get("token");
  const [{ fetching, data }] = useAppointmentsQuery({
    variables: {
      token: token,
      inputs: {
        employee: null,
      },
    },
  });
  let body = null;
  if (fetching) body = <div>test</div>;
  else if (!data) body = <div>test</div>;
  else {
    // @ts-ignore
    let events = [];
		let temp = data.appointments

    // @ts-ignore
    temp.forEach((item) => {
    // @ts-ignore
      item.begin = new Date(item.begin);
    // @ts-ignore
			item['end'] = moment(item.begin).add(item.length,'m').toDate()
      events.push(item);
    });

    console.log(events);

    // @ts-ignore
    body = (
      <>
        <Box m="4" p="8" fontSize="2rem">
          <Box>
            <Tabs isFitted colorScheme="green">
              <TabMenu />
              <TabPanels>
                <TabPanel>
                  {/* <Patients events={data.appointments}/> */}
                </TabPanel>
                <TabPanel>
                  {/* <DermExaminations events={data.appointments}/> */}
                </TabPanel>
                <TabPanel>
                  <MyCalendar events={events} />
                </TabPanel>
                <TabPanel>
                  {/* <DermHolidays /> */}
                </TabPanel>
                <TabPanel>{/* <Profile/> */}</TabPanel>
                <TabPanel>
                  <AdminHolidays/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </>
    );
  }
  return body;
}

const CommentModal = ({setComment, dis, selected}) => {

  return (
    <>
    <Modal isOpen={dis.isOpen} onClose={dis.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
    <Input onChange={(e) => setComment(e.target.value)}></Input>
    <Button>Submit</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}

const AdminHolidays = () => {
  const token = Cookies.get('token')
  const [{fetching,data}] = useHolidayQuery({variables:{token:token}})
  const [comment, setComment] = useState('')
  const [selected, setSelected] = useState({})
  const commentModal = useDisclosure()
  const [,approveHoliday] = useApproveHolidayMutation()
  const [,denyHoliday] = useDenyHolidayMutation()
  const approve = (row) => {
    delete row.__typename
    approveHoliday({
      inputs: row,
      token: token
    }).then(res => console.log(res))
  }
  const deny = (row) => {
    delete row.__typename
    denyHoliday({
      inputs: row,
      token: token
    }).then(res => console.log(res))

  }
  const columns = [
		{ name: "Doctor", selector: "employee.lastName", sortable: true },
		{ name: "From", selector: "from", sortable: true },
		{ name: "Until", selector: "until", sortable: true },
        {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => {
            setSelected(row)
            commentModal.onOpen()}
            }>
              Approve
          </Button>
        ),
      },
        {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => {
            setSelected(row)
            commentModal.onOpen()}
            }>
              Deny
          </Button>
        ),
      }
  ]
  let body = null
  if(fetching) body = <div>Loading</div>
  else if(!data) body = <div>Loading</div>
  else {
    console.log(data.holiday)
    body = (
      <>
      <DataTable
      columns={columns}
        data={data.holiday}
      />
      <CommentModal
        setComment={setComment}
        selected={selected}
        dis={commentModal}

      />
      </>
  )
    }

  return body
}

