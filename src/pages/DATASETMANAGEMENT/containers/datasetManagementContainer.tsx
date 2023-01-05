import { MyButton } from "@/components/MyButton";
import MyPortal from "@/components/MyPortal";
import { AgGrid } from "@/components/agGrid";
import Container from "@/components/container";
import LoadingSpinner from "@/components/loadingSpinner";
import { isEmpty } from "@/utils/common/commonUtils";
import { api, getDatasetList, getDatasetListInfo } from "@services/api/api";
import { ServerResponse } from "http";

import React, { useEffect, useState } from "react";
import { UseQueryOptions, useQuery, useQueryClient } from "react-query";

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
interface DatasetListProps {
  data: RandomObjectProps[];
  result: string;
}

interface DatasetListInfoProps {
  dataset_name: string;
  date: string;
  equipments: string;
  num_actions: string;
  num_actors: string;
  place: string;
  place_dimension: string;
  total_frames: string;
  total_rgb_video_bytes: string;
  total_skeleton_bytes: string;
  result: string;
}

interface RandomObjectProps {
  [key: string]: any;
}

const column1 = [
  {
    headerName: "이름",
    field: "dataset_name",
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
    field: "total_frames",
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "실험자 수",
    field: "num_actors",
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "액션 수",
    field: "num_actions",
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
  const queryClient = useQueryClient();

  // 데이터세트 목록
  const [datasetRowData, setDatasetRowData] = useState<DatasetRowData[]>([]);
  // 데이터세트 상세 정보
  const [datasetDetails, setDatasetDetails] = useState<detailProp>({});
  // 데이터세트 목록2
  const [processedRowData, setProcessedRowData] = useState<ProcessedRowData[]>(
    []
  );

  const [processedDetails, setProcessedDetails] = useState<detailProp>({});
  // 액터 목록
  const [actorRowData, setActorRowData] = useState<ActorRowData[]>([]);
  // ag-grid 테이블 API 목록
  const [gridApi, setGridApi] = useState<{ [key: string]: any }>({});
  const [gridApi2, setGridApi2] = useState<{ [key: string]: any }>({});
  const [gridApi3, setGridApi3] = useState<{ [key: string]: any }>({});

  // use-query
  const datasetQuery = useQuery<DatasetListProps>(
    "datasetList",
    getDatasetList,
    {
      refetchOnWindowFocus: false,
      retry: 0,
      // enabled: false,
    }
  );

  const datasetListQuery = useQuery<DatasetListInfoProps>(
    "datasetListInfo",
    () =>
      getDatasetListInfo({
        group: "group",
        dataset_name: datasetDetails.dataset_name,
      }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: !isEmpty(datasetDetails),
    }
  );

  const onClickRow: onClickRow = (e: any, idx: string) => {
    const rowData = e.data;

    if (JSON.stringify(rowData) === JSON.stringify(datasetDetails)) {
      setDatasetDetails({});
      return;
    }

    if (JSON.stringify(rowData) === JSON.stringify(processedDetails)) {
      setProcessedDetails({});
      return;
    }

    if (idx === "1") {
      setDatasetDetails({ ...rowData });
    } else if (idx === "2") {
      setProcessedDetails({ ...rowData });
    }
  };

  const onClickBtn = (e: React.MouseEvent<HTMLElement>) => {
    console.log(gridApi.getSelectedRows());
  };

  const onRefresh = async (key: string) => {
    if (key === "datasetList") {
      queryClient.refetchQueries("datasetList");
    } else if (key === "datasetListInfo") {
      queryClient.refetchQueries("datasetListInfo");
    }
  }; // 리프레쉬 하는법

  useEffect(() => {
    const dataset = require("@/assets/json/dataset.json");
    const dataset2 = require("@/assets/json/dataset2.json");
    const actorlist = require("@/assets/json/actorlist.json");
    setDatasetRowData(dataset);
    setProcessedRowData(dataset2);
    setActorRowData(actorlist);
  }, []);

  if (datasetQuery.isLoading) {
    return (
      <MyPortal selector="#portal">
        <LoadingSpinner />
      </MyPortal>
    );
  }

  if (datasetQuery.isError) {
    return <h4>Something went wrong !!</h4>;
  }

  return (
    <main className="mainContainer">
      {/* 데이터세트 목록 + 데이터세트 상세 정보 */}
      <div className="containers">
        {/*
        💌
        <Container /> 
        title : 제목
        addedCls : class 추가
        cls : 기본 class 이름
         */}
        <Container title="데이터세트 목록" addedCls="flex7">
          <AgGrid
            setGridApi={setGridApi}
            gridApi={gridApi}
            onClickRow={onClickRow}
            data={datasetQuery?.data?.data}
            setData={setDatasetRowData}
            column={column1}
            idx="1"
          />
          <div className="ag-btn-container">
            <MyButton title="Action" onClickBtn={onClickBtn} />
          </div>
        </Container>
        {!isEmpty(datasetDetails) && (
          <Container
            title="데이터세트 상세 정보"
            addedCls="flex3"
            cls="basicContainer2nd"
          >
            <div className="detailContent">
              <span>이름</span>
              <span>{datasetListQuery?.data?.dataset_name}</span>
            </div>
            <div className="detailContent">
              <span>실험기간</span>
              <span>{datasetListQuery?.data?.date}</span>
            </div>
            <div className="detailContent">
              <span>실험장비</span>
              <span>{datasetListQuery?.data?.equipments}</span>
            </div>
            <div className="detailContent">
              <span>액션 수</span>
              <span>{datasetListQuery?.data?.num_actions}</span>
            </div>
            <div className="detailContent">
              <span>액터 수</span>
              <span>{datasetListQuery?.data?.num_actors}</span>
            </div>
            <div className="detailContent">
              <span>장소</span>
              <span>{datasetListQuery?.data?.place}</span>
            </div>
            <div className="detailContent">
              <span>장소 크기</span>
              <span>{datasetListQuery?.data?.place_dimension}</span>
            </div>
            <div className="detailContent">
              <span>총 RGB 영상 규모</span>
              <span>{datasetListQuery?.data?.total_rgb_video_bytes}</span>
            </div>
            <div className="detailContent">
              <span>총 Skeleton 규모</span>
              <span>{datasetListQuery?.data?.total_rgb_video_bytes}</span>
            </div>
            <div className="detailContent">
              <span>총 프레임 수</span>
              <span>{datasetListQuery?.data?.total_frames}</span>
            </div>
          </Container>
        )}
      </div>
      {/* 데이터세트 목록(전처리 후) + 상세 정보 */}
      <div className="containers">
        <Container title="데이터세트 목록(전처리 후)" addedCls="flex7">
          <AgGrid
            setGridApi={setGridApi2}
            gridApi={gridApi2}
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
              setGridApi={setGridApi3}
              gridApi={gridApi3}
              onClickRow={onClickRow}
              data={actorRowData}
              // setData={setActorRowData}
              column={column3}
            />
          </Container>
        )}
      </div>
    </main>
  );
};

export default DatasetManagementContainer;
