import { MyButton } from "@/components/MyButton";
import { MyModalInfo, MyModalNoFooter } from "@/components/MyModal";
import MyPortal from "@/components/MyPortal";
import { AgGrid } from "@/components/agGrid";
import Container from "@/components/container";
import LoadingSpinner from "@/components/loadingSpinner";
import { isEmpty } from "@/utils/common/commonUtils";
import {
  api,
  getActionList,
  getActorList,
  getDatasetList,
  getDatasetListInfo,
} from "@services/api/api";
import { AnimatePresence } from "framer-motion";

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
    headerName: "데이터 세트",
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
    headerName: "데이터 세트",
    field: "dataset_name",
    headerCheckboxSelection: true, // 헤더에도 checkbox 추가
    checkboxSelection: true, // check box 추가
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "액션",
    field: "action_name",
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "총 프레임 수",
    field: "total_frames",
    cellStyle: { fontFamily: "Pretendard" },
  },
  {
    headerName: "5개 동작 프레임 수",
    field: "takes_frames",
    cellStyle: { fontFamily: "Pretendard" },
  },
];

const DatasetManagementContainer = () => {
  const column3 = [
    {
      headerName: "액터",
      field: "actor_name",
      checkboxSelection: true, // check box 추가
      cellStyle: { fontFamily: "Pretendard" },
    },
    {
      headerName: "총 프레임 수",
      field: "total_frames",
      cellStyle: { fontFamily: "Pretendard" },
    },
    {
      headerName: "take 수",
      field: "num_takes",
      cellStyle: { fontFamily: "Pretendard" },
    },
    {
      field: "athlete",
      cellRenderer: () => {
        return (
          <>
            <MyButton
              title="영상보기"
              size="s"
              onClickBtn={() => {
                const modelElement = document.getElementById("modal");
                modelElement?.classList.remove("display-none");
                setIsVideoPlayerOpen(true);
              }}
            />
            {/* <MyPortal selector="#portal">
              <MyModalInfo></MyModalInfo>
            </MyPortal> */}
          </>
        );
      },
    },
  ];
  const queryClient = useQueryClient();

  // 데이터세트 상세 정보
  const [datasetDetails, setDatasetDetails] = useState<detailProp>({});
  // 액션 상세 정보
  const [actionDetails, setActionDetails] = useState<detailProp>({});
  // ag-grid 테이블 API 목록
  const [gridApi, setGridApi] = useState<{ [key: string]: any }>({});
  const [gridApi2, setGridApi2] = useState<{ [key: string]: any }>({});
  const [gridApi3, setGridApi3] = useState<{ [key: string]: any }>({});

  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  // use-query
  const datasetQuery = useQuery<DatasetListProps>(
    "datasetList",
    getDatasetList,
    {
      staleTime: 10000,
      refetchOnWindowFocus: false,
      retry: 0,
      // enabled: false,
    }
  );

  const datasetListQuery = useQuery<DatasetListInfoProps>(
    ["datasetListInfo", datasetDetails],
    () =>
      getDatasetListInfo({
        group: "group",
        dataset_name: datasetDetails.dataset_name,
      }),
    {
      staleTime: 10000,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: !isEmpty(datasetDetails),
    }
  );

  const actionListQuery = useQuery<DatasetListProps>(
    ["actionList", datasetDetails],
    () =>
      getActionList({
        group: "group",
        dataset_name: datasetDetails.dataset_name,
      }),
    {
      staleTime: 10000,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: !isEmpty(datasetDetails),
    }
  );

  const actionActorListQuery = useQuery<DatasetListProps>(
    ["actionList", actionDetails],
    () =>
      getActorList({
        group: "group",
        dataset_name: datasetDetails?.dataset_name,
        action_name: actionDetails?.action_name,
      }),
    {
      staleTime: 10000,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: !isEmpty(actionDetails),
    }
  );

  const onClickRow: onClickRow = (e: any, idx: string) => {
    const rowData = e.data;

    if (JSON.stringify(rowData) === JSON.stringify(datasetDetails)) {
      setDatasetDetails({});
      return;
    }

    if (JSON.stringify(rowData) === JSON.stringify(actionDetails)) {
      setActionDetails({});
      return;
    }

    if (idx === "1") {
      setDatasetDetails({ ...rowData });
    } else if (idx === "2") {
      setActionDetails({ ...rowData });
    } else if (idx === "3") {
      console.log(rowData, "action");
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

  // useEffect(() => {
  //   const dataset = require("@/assets/json/dataset.json");
  //   const dataset2 = require("@/assets/json/dataset2.json");
  //   const actorlist = require("@/assets/json/actorlist.json");
  //   setDatasetRowData(dataset);
  //   setProcessedRowData(dataset2);
  //   setActorRowData(actorlist);
  // }, []);

  if (datasetQuery.isLoading) {
    return (
      <MyPortal selector="#portal">
        <LoadingSpinner />
      </MyPortal>
    );
  }

  if (datasetQuery.isError) {
    return (
      <AnimatePresence>
        <MyModalInfo title="오류 메세지">
          <h2>인터넷 상태를 확인해주세요.</h2>
        </MyModalInfo>
      </AnimatePresence>
    );
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
            column={column1}
            idx="1"
            type="multiple"
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
      {!isEmpty(datasetDetails) && (
        <div className="containers">
          <Container title="액션 목록" addedCls="flex7">
            <AgGrid
              setGridApi={setGridApi2}
              gridApi={gridApi2}
              onClickRow={onClickRow}
              data={actionListQuery?.data?.data}
              column={column2}
              idx="2"
              type="multiple"
            />
          </Container>
          {!isEmpty(actionDetails) && (
            <Container
              title={actionDetails?.action_name}
              addedCls="flex3"
              cls="basicContainer2nd"
            >
              <AgGrid
                setGridApi={setGridApi3}
                gridApi={gridApi3}
                onClickRow={onClickRow}
                data={actionActorListQuery?.data?.data}
                // setData={setActorRowData}
                column={column3}
                idx="3"
              />
            </Container>
          )}
        </div>
      )}

      {isVideoPlayerOpen && (
        <MyModalInfo title="영상보기">
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={(e: any) => {
              var numberOfVideos = e.target.files.length;
              for (var i = 0; i < numberOfVideos; i++) {
                var file = e.target.files[i];
                var blobURL = URL.createObjectURL(file);
                var video = document.createElement("video");
                video.src = blobURL;
                video.setAttribute("controls", "");
                video.classList.add("video");
                var videos = document.getElementById("videos");
                if (videos) {
                  videos.appendChild(video);
                }
              }
              // console.log(e.target.files);
              // let file = e.target.files[0];
              // let type = file.type;
              // var videoNode = document.querySelector("video");
              // if (videoNode) {
              //   var canPlay = videoNode.canPlayType(type);
              //   console.log(canPlay);
              //   var fileURL = URL.createObjectURL(file);
              //   videoNode.src = fileURL;
              // }
            }}
          />
          <div id="videos"></div>
          <button
            onClick={() => {
              console.log("재생하기");
              var videos = document.getElementsByClassName(".video");
              console.log(videos);
              if (videos) {
              }
            }}
          >
            재생하기
          </button>
          <iframe
            src="http://lo-th.github.io/olympe/BVH_player.html"
            title="Inline Frame Example"
            width="1000"
            height="600"
          ></iframe>
          {/* <video
            controls
            style={{
              width: 500,
            }}
            // src="file:///C:/Users/rhkrx/OneDrive/Desktop/a.mp4"
            // src={`http://127.0.0.1:8887/actiondata/GROUP1/ETRI_01/ch01/000_chart/tk_01/cam_01.MP4`}
            // src={`http://192.168.219.204:8090/static/Straight Leg Raise.mp4`}
          >
            <source
              src="file:///C:/Users/rhkrx/OneDrive/Desktop/a.mp4"
              type="video/mp4"
            />
          </video> */}
        </MyModalInfo>
      )}
    </main>
  );
};

export default DatasetManagementContainer;
