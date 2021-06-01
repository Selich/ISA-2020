import React from "react";
import swal from "sweetalert";
import { useUnscheduleMutation } from "../../generated/graphql";
import { AppointmentsTable } from "../tables/AppointmentsTable";

export const CurrentlyScheduled = () => {
  const [, unschedule] = useUnscheduleMutation();
  const swalMsg = {
    title: "Cancel selected appointment?",
    text: "Are you sure you want to cancel selected appointment?",
    icon: "warning",
    dangerMode: true,
    buttons: ["Cancel", "OK"],
  };
  const Cancel = (row) => {
    swal(swalMsg).then((willRemove) => {
      if (willRemove) {
        let inputs = row;
        inputs.kind = "derm";
        delete inputs.patient;
        delete inputs.employee;
        delete inputs.__typename;
        console.log(inputs);
        unschedule({ inputs: row }).then((res) => {
          console.log(res);
          swal("Appointment canceled", {
            icon: "success",
          });
        });
      }
    });
  };
  return (
    <AppointmentsTable
      variables={{ isVisited: false }}
      handler={[Cancel]}
      kind={"remove"}
      buttonName={"Cancel"}
    />
  );
};
