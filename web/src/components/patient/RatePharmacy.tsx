import { Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React from "react";
import DataTable from "react-data-table-component";
import { useRatingDermQuery } from "../../generated/graphql";
import { Loading } from "../Loading";

export const RatePharmacy = () => {
  const token = Cookies.get("token");
  const [{ fetching, data }] = useRatingDermQuery({ variables: { token: token }, });
  const handler = (row) => {};
  const columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Code", selector:"code", sortable:true},
    { name: "Rating", selector: "averageRating", sortable: true },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button colorScheme="red" size="sm" onClick={() => handler(row)}>
          Rate
        </Button>
      ),
    },
  ];
  let body = null
  if (fetching) body = <Loading/>;
  else if (!data) body = <Loading/>;
  else {
    body = <DataTable title='Rate Pharmacy' data={data.ratingDerm} columns={columns} />;
  }
  return body;
};