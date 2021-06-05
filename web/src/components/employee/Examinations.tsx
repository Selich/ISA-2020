import React from "react";
import DataTable from "react-data-table-component";

export const DermExaminations = ({events}) => {


	console.log(events)
  const columns = [
    { name: "Patient Name", selector: "patient.firstName", sortable: true },
    { name: "Patient Surname", selector: "patient.lastName", sortable: true },
    { name: "From", selector: "from", sortable: true },
  ];

  return (
			<DataTable
						columns={columns}
						data={events}
			/>
	)


};
