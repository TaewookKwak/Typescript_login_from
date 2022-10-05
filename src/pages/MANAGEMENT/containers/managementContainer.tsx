import React, { useState } from "react";
import ManagementCardView from "@/pages/MANAGEMENT/views/managementCardView";
import ManagementBoxView from "@/pages/MANAGEMENT/views/managementBoxView";

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
      <ManagementCardView title="측위자원 수집 데이터세트" btnList={btnList} />
      <ManagementCardView title="후처리된 데이터세트" btnList={btnList2} />
    </main>
  );
};

export default ManagementContainer;
