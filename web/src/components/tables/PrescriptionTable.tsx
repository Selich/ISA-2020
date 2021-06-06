import { Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React from "react";
import DataTable from "react-data-table-component";
import { useAddComplaintMutation, useCancelReservationMutation, useGetPrescriptionsByPatientQuery, useReservationsQuery, } from "../../generated/graphql";
import { Loading } from "../Loading";

export const PrescriptionTable = () => {
  let token = Cookies.get("token");
  const [{ fetching, data }] = useGetPrescriptionsByPatientQuery({
    variables: { token: token },
  });
  const [, report] = useAddComplaintMutation();

  const handler = (row) => {

  };
  const columns = [
    { name: "Deadline", selector: "deadline", sortable: true },
  ];

  let body = null;
  if (fetching) body = <Loading/>;
  else if (!data) body = <Loading/>;
  else {
    body = <DataTable title="Prescriptions" data={data.getPrescriptionsByPatient} columns={columns} />;
  }
  return body;
};
