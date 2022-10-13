import {
  getKeysInObject,
  sortAscendingBy,
  sortDescendingBy,
} from "@/utils/common/commonUtils";
import React, { useEffect } from "react";
import { useState } from "react";
interface TableDataInterface {
  [key: string]: any;
}

type TableDataType = {
  tableData: Array<TableDataInterface>;
  tableId?: string;
  checkedIdx?: Array<number>;
};

const Table = ({ tableData, tableId }: TableDataType) => {
  const [data, setData] = useState<Array<TableDataInterface>>(tableData);
  const [checkedData, setCheckedData] = useState(new Set());
  const tableColumn = getKeysInObject(tableData[0]);

  const getAllIdxToSet = () => {
    return data.map((list) => list.Idx);
  };

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

  const onCheckBoxAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const checked = target.checked;
    const idxs = getAllIdxToSet();

    checkedData.clear();

    if (checked) {
      idxs.forEach((item) => {
        checkedData.add(item);
      });
    } else if (!checked) {
      checkedData.clear();
    }
    setCheckedData(new Set(checkedData));
  };

  const onCheckBox = (e: React.ChangeEvent<HTMLInputElement>, _idx: number) => {
    const target = e.target;

    const checked = target.checked;
    if (checked) {
      checkedData.add(_idx);
      setCheckedData(new Set(checkedData)); // new Set 을 안붙이면 state 업데이트 안됨
    } else if (!checked && checkedData.has(_idx)) {
      checkedData.delete(_idx);
      setCheckedData(new Set(checkedData));
    }
  };

  return (
    <div className="card__table">
      <table id={tableId}>
        <thead>
          <tr>
            <th className="fixed-header">
              <div className="flex-row-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  className="card__table__checkbox"
                  onChange={onCheckBoxAll}
                />
                <label htmlFor="checkbox-all">전체</label>
              </div>
            </th>
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
                <td className="align-center">
                  <input
                    onChange={(e) => onCheckBox(e, list.Idx)}
                    checked={checkedData.has(list.Idx)}
                    type="checkbox"
                    className="card__table__checkbox"
                  />
                </td>
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
