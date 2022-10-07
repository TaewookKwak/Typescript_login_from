import { getKeysInObject } from "@/utils/common/commonUtils";
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

  function sortBy(filed: string) {
    return function compare(a: any, b: any) {
      if (a[filed] < b[filed]) {
        return -1;
      }
      if (a[filed] > b[filed]) {
        return 1;
      }
      return 0;
    };
  }

  const onSort = (list: string) => {
    const newTableData: Array<TableDataInterface> = data.sort(sortBy(list));

    setData([...newTableData]);

    console.log(data);

    // const sortedTableData: Array<TableDataInterface> = tableData.map((data) => {
    //   console.log(data);

    //   return [];
    // });
  };

  return (
    <div className="card__table">
      <table>
        <thead>
          <tr>
            {tableColumn.map((list) => {
              return (
                <th
                  onClick={() => onSort(list)}
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
            console.log(list);

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
