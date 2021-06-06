import {
  Button,
  Container,
  Input
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  usePatientsQuery
} from "../../generated/graphql";
import { Loading } from "../Loading";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
  <Container alignSelf="right">
    <Input
      id="search"
      type="text"
      w={500}
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <Button type="button" onClick={onClear}>
      X
    </Button>
  </Container>
  </>
);

export const PatientSearch = () => {
  const token = Cookies.get("token");
  const [filterText, setFilterText] = useState("");

  const [{ fetching, data }] = usePatientsQuery();

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText]);

  let columns = [
    { name: "FirstName", selector: "firstName", sortable: true },
    { name: "LastName", selector: "lastName", sortable: true },
  ];

  let body = null;
  if (fetching) body = <Loading />;
  else if (!data) body = <Loading />;
  else {
    const filteredItems = data.patients.filter(
      (item) =>
        item.firstName && item.firstName.toLowerCase().includes(filterText.toLowerCase())
    );
    body = (
      <>
        <DataTable 
        data={filteredItems}
        subHeader
      subHeaderComponent={subHeaderComponentMemo}
        columns={columns} />
      </>
    );
  }
  return <div>{body}</div>;
};
