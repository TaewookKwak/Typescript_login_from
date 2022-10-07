import Table from "@/components/table";
import { getKeysInObject } from "@/utils/common/commonUtils";
import React from "react";
type CardViewProps = {
  btnList: string[];
  title: string;
  tableData: Array<TableDataInterface>;
};

interface TableDataInterface {
  Idx: number;
  ScenarioName: string;
  SiteId: string;
  BuildingId: string;
  Floor: string;
  Route_wp: string;
  Date: string;
}

const TrainingCardView = ({ title, btnList, tableData }: CardViewProps) => {
  return (
    <div className="card flex8">
      {/* 제목 */}
      <p className="card__title">{title}</p>
      {/* 테이블 */}
      <Table tableData={tableData} />
      {/* 버튼 */}
      <div className="card__table__btn-container">
        {btnList.map((list) => {
          return (
            <button key={list} className="card__table__btn">
              {list}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingCardView;
