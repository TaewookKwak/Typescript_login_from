import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { MyModalNoFooter } from "@/components/MyModal";

const ICON = require("@/assets/imgs/icon_machine_learning2.png");

interface Type {
  data: { value: string; date: string };
}

const Header = () => {
  const header = useRef<HTMLDivElement>(null);
  const { data } = useQuery("sensorData", {
    initialData: "",
    staleTime: Infinity,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 스크롤 시 해더 fixed
  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= 100) {
      header.current?.classList.add("active");
    } else {
      header.current?.classList.remove("active");
    }
  });

  const onSelectMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const event = e.target as HTMLDivElement;
  };

  return (
    <header className="main-header" ref={header}>
      <div className="header_title">
        <img className="icon" src={ICON} alt="" />
        {/* <h1>측위알고리즘 시험 검증 시스템</h1> */}
        <h1>행동인식 데이터 수집 및 모델 생성 </h1>
      </div>

      <nav className="nav-bar-container">
        <NavLink
          onClick={(e) => onSelectMenu(e)}
          to={"/Home"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </NavLink>

        <NavLink
          onClick={(e) => onSelectMenu(e)}
          to={"/Dataset/Management"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          데이터세트관리
        </NavLink>
        <NavLink
          onClick={(e) => onSelectMenu(e)}
          to={"/Dataset/FetchData"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          데이터가져오기
        </NavLink>
        <NavLink
          onClick={(e) => onSelectMenu(e)}
          className={({ isActive }) => (isActive ? "link active" : "link")}
          to={"/Management"}
        >
          측위자원관리
        </NavLink>
        <NavLink
          onClick={(e) => onSelectMenu(e)}
          className={({ isActive }) => (isActive ? "link active" : "link")}
          to={"/Training"}
        >
          학습모델관리
        </NavLink>
        <NavLink
          onClick={(e) => onSelectMenu(e)}
          className={({ isActive }) => (isActive ? "link active" : "link")}
          to={"/Monitoring"}
        >
          수집모니터링
        </NavLink>

        {data && (
          <DownloadIcon
            onClick={() => setIsModalOpen(true)}
            whileTap={{ scale: 1.3 }}
            animate={{
              // scale: [1, 2, 2, 1, 1],
              rotate: [0, 30, 0, -30, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <FontAwesomeIcon
              icon={faCloudArrowDown}
              size="2x"
              className="download-icon"
            />
          </DownloadIcon>
        )}
      </nav>
      <AnimatePresence>
        {isModalOpen && (
          <MyModalNoFooter
            title="다운로드 진행 상황"
            onCancel={() => setIsModalOpen(false)}
          >
            <p>{data}</p>
          </MyModalNoFooter>
        )}
      </AnimatePresence>
    </header>
  );
};

const DownloadIcon = styled(motion.button)`
  cursor: pointer;
`;

export default Header;
