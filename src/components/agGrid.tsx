import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS

export const AgGrid = () => {
  const gridRef = useRef<any>(); // Optional - for accessing Grid's API
  const [gridApi, setGridApi] = useState<any>(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "make",
      filter: true,
      headerCheckboxSelection: true, // 헤더에도 checkbox 추가
      checkboxSelection: true, // check box 추가
      cellStyle: { fontFamily: "Pretendard" },
    },
    { field: "model", filter: true, cellStyle: { fontFamily: "Pretendard" } },
    { field: "price", cellStyle: { fontFamily: "Pretendard" } },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    // console.log("cellClicked", event);
    console.log(gridRef.current.api);
  }, []);

  //  When the grid is initialised, it will call gridReady
  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const updateData = (data: any) => params.api.setRowData(data);
    console.log(params);
  };

  // checkbox 선택 시
  const onSelectionChanged = () => {
    const selectedData = gridApi.getSelectedRows();
    console.log("Selection Changed", selectedData);
  };

  // Example load data from sever
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div
      className="ag-theme-alpine-dark" // pick theme
      style={{ width: "100%", height: 500, position: "relative" }}
    >
      <AgGridReact
        ref={gridRef} // Ref for accessing Grid's API
        rowData={rowData} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection="multiple" // Options - allows click selection of rows
        onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        sideBar={{
          toolPanels: ["columns", "filters"],
          defaultToolPanel: "",
        }}
        onGridReady={onGridReady}
        // enableRangeSelection={true}
        suppressRowClickSelection={true}
        pagination={true}
        paginationAutoPageSize={true}
        groupSelectsChildren={true}
        onSelectionChanged={onSelectionChanged}
      ></AgGridReact>
      <div className="ag-btn-container">
        <button>전처리전처리하기</button>
      </div>
    </div>
  );
};
