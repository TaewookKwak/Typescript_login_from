import { AgGrid } from "@/components/agGrid";
import Container from "@/components/container";
import React from "react";

const DatasetManagementContainer = () => {
  return (
    <main className="mainContainer">
      <div className="containers">
        <Container title="데이터세트 목록" addedCls="flex6">
          <AgGrid />
        </Container>
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
        </Container>
      </div>
    </main>
  );
};

export default DatasetManagementContainer;
