import { MyButton } from "@/components/MyButton";
import { AgGrid } from "@/components/agGrid";
import Container from "@/components/container";
import { isEmpty } from "@/utils/common/commonUtils";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export interface DatasetRowData {
  name: string;
  date: string;
  totalframe: number | string;
  totalparticitant: number | string;
}

export interface ProcessedRowData {
  fiveposeframe: number | string;
  name: string;
  date: string;
  totalframe: number | string;
}

export interface ActorRowData {
  actor: string;
  totalframe: number | string;
  take: number | string;
}

type onClickRow = (e: any, idx: string) => void;

type detailProp = {
  [key: string]: string;
};

const column1 = [
  {
    headerName: "이름",
    field: "name",
    headerCheckboxSelection: true, // 헤더에도 checkbox 추가
    checkboxSelection: true, // check box 추가
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "날짜",
    field: "date",
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "총 프레임 수",
    field: "totalframe",
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "실험자 수",
    field: "totalparticitant",
    cellStyle: { fontFamily: "Pretendard" },
  },
];

const column2 = [
  {
    headerName: "이름",
    field: "name",
    headerCheckboxSelection: true, // 헤더에도 checkbox 추가
    checkboxSelection: true, // check box 추가
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "총 프레임 수",
    field: "totalframe",
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "5개 동작 프레임 수",
    field: "fiveposeframe",
    cellStyle: { fontFamily: "Pretendard" },
  },
];

const column3 = [
  {
    headerName: "액터",
    field: "actor",
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "총 프레임 수",
    field: "totalframe",
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "take 수",
    field: "take",
    cellStyle: { fontFamily: "Pretendard" },
  },
];

const DatasetManagementContainer = () => {
  const [datasetRowData, setDatasetRowData] = useState<DatasetRowData[]>([]);
  const [datasetDetails, setDatasetDetails] = useState<detailProp>({});
  const [processedRowData, setProcessedRowData] = useState<ProcessedRowData[]>(
    []
  );
  const [processedDetails, setProcessedDetails] = useState<detailProp>({});
  const [actorRowData, setActorRowData] = useState<ActorRowData[]>([]);

  const onClickRow: onClickRow = (e: any, idx: string) => {
    const rowData = e.data;
    if (idx === "1") {
      setDatasetDetails({ ...rowData });
    } else if (idx === "2") {
      setProcessedDetails({ ...rowData });
    }
  };

  useEffect(() => {
    const dataset = require("@/assets/json/dataset.json");
    const dataset2 = require("@/assets/json/dataset2.json");
    const actorlist = require("@/assets/json/actorlist.json");
    setDatasetRowData(dataset);
    setProcessedRowData(dataset2);
    setActorRowData(actorlist);
  }, []);

  return (
    <main className="mainContainer">
      {/* 데이터세트 목록 + 데이터세트 상세 정보 */}
      <div className="containers">
        {/*
        💌
        Container Component
        title : 제목
        addedCls : class 추가
        cls : 기본 class 이름
         */}
        <Container title="데이터세트 목록" addedCls="flex7">
          <AgGrid
            onClickRow={onClickRow}
            data={datasetRowData}
            setData={setDatasetRowData}
            column={column1}
            idx="1"
          />
          <div className="ag-btn-container">
            <MyButton title="Action" />
          </div>
        </Container>
        {!isEmpty(datasetDetails) && (
          <Container
            title="데이터세트 상세 정보"
            addedCls="flex3"
            cls="basicContainer2nd"
          >
            <div className="detailContent">
              <span>장소</span>
              <span>대전영상문화원</span>
            </div>

            <div className="detailContent">
              <span>실험장비</span>
              <span>Motion Analysis Camera 26대, Gopro Camera 6대</span>
            </div>

            <div className="detailContent">
              <span>실험기간</span>
              <span>2022. 11. 25 ~ 20 (5 Days)</span>
            </div>

            <div className="detailContent">
              <span>RGB 영상 규모</span>
              <span>2.8 TB</span>
            </div>

            <div className="detailContent">
              <span>RGB 영상 메이커</span>
              <span>{datasetDetails.name}</span>
            </div>

            <div className="detailContent">
              <span>RGB 영상 모델</span>
              <span>{datasetDetails.totalframe}</span>
            </div>

            <div className="detailContent">
              <span>RGB 영상 가격</span>
              <span>{datasetDetails.totalparticitant}</span>
            </div>
          </Container>
        )}
      </div>
      {/* 데이터세트 목록(전처리 후) + 상세 정보 */}
      <div className="containers">
        <Container title="데이터세트 목록(전처리 후)" addedCls="flex7">
          <AgGrid
            onClickRow={onClickRow}
            data={processedRowData}
            setData={setProcessedRowData}
            column={column2}
            idx="2"
          />
        </Container>
        {!isEmpty(processedDetails) && (
          <Container
            title="001_standing"
            addedCls="flex3"
            cls="basicContainer2nd"
          >
            <AgGrid
              onClickRow={onClickRow}
              data={actorRowData}
              setData={setActorRowData}
              column={column3}
            />
          </Container>
        )}
      </div>
    </main>
  );
};

export default DatasetManagementContainer;
