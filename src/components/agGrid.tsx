import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS

interface AgGridProps {
  setGridApi: any;
  gridApi: { [key: string]: any };
  onClickRow: (e: any, idx: string) => void;
  data: any;
  setData?: any;
  column: { [index: string]: any }[];
  idx?: string;
  type?: any;
}

export const AgGrid: React.FC<AgGridProps> = ({
  setGridApi,
  gridApi,
  onClickRow,
  data,
  column,
  idx = "0",
  type = "single",
}) => {
  const gridRef = useRef<any>();

  const [gridColumnApi, setGridColumnApi] = useState(null);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  //  When the grid is initialised, it will call gridReady
  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const updateData = (data: any) => params.api.setRowData(data);
  };

  // checkbox 선택 시
  const onSelectionChanged = () => {
    const selectedData = gridApi.getSelectedRows();
    console.log("Selection Changed", selectedData);
  };

  return (
    <div
      className="ag-theme-alpine-dark" // pick theme
      style={{ width: "100%", height: 500, position: "relative" }}
    >
      <AgGridReact
        ref={gridRef} // Ref for accessing Grid's API
        rowData={data} // Row Data for Rows
        columnDefs={column} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection={type} // Options - allows click selection of rows
        onCellClicked={(e) => onClickRow(e, idx)} // Optional - registering for Grid Event
        sideBar={{
          toolPanels: ["columns", "filters"],
        }}
        onGridReady={onGridReady}
        // enableRangeSelection={true}
        suppressRowClickSelection={true}
        pagination={true}
        paginationAutoPageSize={true}
        groupSelectsChildren={true}
        onSelectionChanged={onSelectionChanged}
      ></AgGridReact>
    </div>
  );
};
