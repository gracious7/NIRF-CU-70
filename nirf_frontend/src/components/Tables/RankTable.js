import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useLocation } from "react-router-dom";

const RankTable = () => {
  const location = useLocation();
  console.log(location.state);
  const data = location.state.rows;
  const report_name = location.state.name;

  const columnDefs = [];
  const [inputColumnSum, setInputColumnSum] = useState(0);
  const [headSum, setHeadSum] = useState(0);
  const [male, setmale] = useState(0);
  const [female, setfemale] = useState(0);
  const [selectedCellValue, setSelectedCellValue] = useState(null);
  const [downloadClicked, setdownloadClicked] = useState(false);
  const [rows, setRows] = useState(data.length);
  const gridApiRef = useRef(null);
  const gridRef = useRef();
  const gridColumnApiRef = useRef(null);

  const filterParams = {
    filter: "agDateColumnFilter",
    filterOptions: [
      "contains",
      "notContains",
      "startsWith",
      "endsWith",
      "equals",
      "notEqual",
    ],
  };

  const dateFilterParams = {
    filter: "agTextColumnFilter", // Use text filter for date column
    filterOptions: [
      "contains",
      "notContains",
      "startsWith",
      "endsWith",
      "equals",
      "notEqual",
      "greaterThan",
    ],
  };

  // Generate column definitions dynamically from the keys of the first data object
  if (data.length > 0) {
    const firstObject = data[0];
    for (const key in firstObject) {
      if (firstObject.hasOwnProperty(key)) {
        const columnDef = {
          headerName: key,
          field: key,
          wrapText: true,
          autoHeight: true,
          // initialWidth: 200,
          sortable: key === "sortableColumn", // Example: Make a specific column sortable
          filter:
            key === "column" ? "agDateColumnFilter" : "agSetColumnFilter", // Example: Add a filter to a specific column
          // filter: key === 'agSetColumnFilter', // Example: Add a filter to a specific column
        };
        columnDefs.push(columnDef);
      }
    }
  }

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [data]);

  return (
    <div>
      <h1>{report_name} Rank</h1>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100vw" }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={data}
        // domLayout="autoWidth"
        />
      </div>
    </div>
  );
};

export default RankTable;
