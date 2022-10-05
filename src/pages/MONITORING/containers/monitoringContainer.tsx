import React, { useState } from "react";
import MonitoringBoxView from "@/pages/MONITORING/views/monitoringBoxView";
import MonitoringCardInfoView from "@/pages/MONITORING/views/monitoringCardInfoView";
import MonitoringCardView from "@/pages/MONITORING/views/monitoringCardView";

export interface FileListInterface {
  filename: string;
  size: string;
}

const MonitoringContainer = () => {
  let btnList: string[] = ["Post Processing", "Delete Dataset"];
  const btnList2: string[] = [
    "Create Training Dataset",
    "Delete PPTraining Dataset",
    "Post Processing Status",
  ];
  const fileList: Array<FileListInterface> = [
    {
      filename: ".csv",
      size: "20KB",
    },
    {
      filename: "1.csv",
      size: "20KB",
    },
    {
      filename: "2.csv",
      size: "20KB",
    },
  ];
  return (
    <main>
      <MonitoringBoxView />
      <div className="flex-row">
        <MonitoringCardView title="수집작업 진행상황 모니터링(Collection Status Map)" />
        <MonitoringCardInfoView title="상세정보" fileList={fileList} />
      </div>
    </main>
  );
};

export default MonitoringContainer;
