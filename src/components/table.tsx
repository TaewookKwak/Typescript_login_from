import {
  getKeysInObject,
  sortAscendingBy,
  sortDescendingBy,
} from "@/utils/common/commonUtils";
import React from "react";
import { useState } from "react";
interface TableDataInterface {
  [key: string]: any;
}

type TableDataType = {
  tableData: Array<TableDataInterface>;
};

const Table = ({ tableData }: TableDataType) => {
  const [data, setData] = useState<Array<TableDataInterface>>(tableData);
  const tableColumn = getKeysInObject(tableData[0]);

  const onSort = (
    list: string,
    event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
  ) => {
    const target = event.target as HTMLDivElement;
    const dataset = target.dataset;

    let newTableData: Array<TableDataInterface> = [{}];

    if (dataset.ariaSort === "acsending") {
      dataset.ariaSort = "decsending";
      newTableData = data.sort(sortAscendingBy(list));
    } else if (dataset.ariaSort === "decsending") {
      dataset.ariaSort = "acsending";
      newTableData = data.sort(sortDescendingBy(list));
    }

    setData([...newTableData]);
  };

  return (
    <div className="card__table">
      <table>
        <thead>
          <tr>
            {tableColumn.map((list) => {
              return (
                <th
                  data-aria-sort="acsending"
                  onClick={(e) => onSort(list, e)}
                  className="fixed-header clickable"
                >
                  {list}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((list) => {
            return (
              <tr>
                {tableColumn.map((column) => {
                  return <td>{list[column]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
