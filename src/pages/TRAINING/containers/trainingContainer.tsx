import React, { useState } from "react";
import TrainingBoxView from "@/pages/TRAINING/views/trainingBoxView";
import TrainingCardView from "@/pages/TRAINING/views/trainingCardView";
import TrainingCardInfoView from "@/pages/TRAINING/views/trainingCardInfoView";
export interface FileListInterface {
  filename: string;
  size: string;
}

const TrainingContainer = () => {
  const btnList: string[] = ["Run Training", "Delete Dataset"];
  const btnList2: string[] = ["Cancel Training", "Delete Dataset"];
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
      <TrainingBoxView />
      <div className="flex-column">
        <div className="flex-row">
          <TrainingCardView title="학습 데이터세트 목록" btnList={btnList} />
          <TrainingCardInfoView
            title="데이터세트 상세정보"
            fileList={fileList}
          />
        </div>

        <div className="flex-row">
          <TrainingCardView title="학습 모델 목록" btnList={btnList2} />
          <TrainingCardInfoView title="모델정보" fileList={fileList} />
        </div>
      </div>
    </main>
  );
};

export default TrainingContainer;
