import React, { useState } from "react";
import ManagementCardView from "@/pages/MANAGEMENT/views/managementCardView";
import ManagementBoxView from "@/pages/MANAGEMENT/views/managementBoxView";

const FAKE_JSON_DATA = require("@/assets/json/fake.json");
const ManagementContainer = () => {
  let btnList: string[] = ["Post Processing", "Delete Dataset"];
  const btnList2: string[] = [
    "Create Training Dataset",
    "Delete PPTraining Dataset",
    "Post Processing Status",
  ];
  return (
    <main>
      <ManagementBoxView />
      <ManagementCardView
        title="측위자원 수집 데이터세트"
        btnList={btnList}
        tableData={FAKE_JSON_DATA}
        idx={1}
      />
      <ManagementCardView
        title="후처리된 데이터세트"
        btnList={btnList2}
        tableData={FAKE_JSON_DATA}
        idx={2}
      />
    </main>
  );
};

export default ManagementContainer;
