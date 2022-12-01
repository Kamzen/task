import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "Team",
    width: 300,
    editable: true,
    sortable: false,
  },
  {
    field: "id",
    headerName: "PL",
    width: 300,
    editable: true,
    sortable: false,
  },
  {
    field: "firstName",
    headerName: "GD",
    width: 100,
    editable: true,
    sortable: false,
  },
  {
    field: "lastName",
    headerName: "Pts",
    width: 100,
    editable: true,
    sortable: false,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon" },
  { id: 2, lastName: "Lannister", firstName: "Cersei" },
  { id: 3, lastName: "Lannister", firstName: "Jaime" },
  { id: 4, lastName: "Stark", firstName: "Arya" },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys" },
  { id: 6, lastName: "Melisandre", firstName: null },
  { id: 7, lastName: "Clifford", firstName: "Ferrara" },
  { id: 8, lastName: "Frances", firstName: "Rossini" },
  { id: 9, lastName: "Roxie", firstName: "Harvey" },
];

export default function LeagueTable() {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={rows.length}
        rowsPerPageOptions={[rows.length]}
        editMode={"row"}
        disableColumnFilter={true}
        disableColumnMenu={true}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}
