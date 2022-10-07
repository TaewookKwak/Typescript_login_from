import Table from "@/components/table";
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

const ManagementCardView = ({
  title,
  btnList,
  tableData,
}: CardViewProps): JSX.Element => {
  return (
    <div className="card">
      <p className="card__title">{title}</p>
      <Table tableData={tableData} />
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

export default ManagementCardView;
