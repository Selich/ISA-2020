import React from "react";
import DataTable from "react-data-table-component";

export const Patients = ({ events }) => {
  const columns = [
    { name: "Id", selector: "id", sortable: true },
    { name: "Patient Name", selector: "patient.firstName", sortable: true },
    { name: "Patient Surname", selector: "patient.lastName", sortable: true },
    { name: "From", selector: "begin", sortable: true },
  ];

  return <DataTable columns={columns} data={events} />;
};
