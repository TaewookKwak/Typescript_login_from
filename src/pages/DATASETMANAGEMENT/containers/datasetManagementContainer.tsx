import { AgGrid } from "@/components/agGrid";
import Container from "@/components/container";
import React from "react";

const DatasetManagementContainer = () => {
  return (
    <main className="mainContainer">
      <Container title="데이터세트 목록">
        <AgGrid />
      </Container>
    </main>
  );
};

export default DatasetManagementContainer;
