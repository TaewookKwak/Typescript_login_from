import React, { useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
const ICON = require("@/assets/imgs/icon_machine_learning2.png");
const Header = () => {
  const header = useRef<HTMLDivElement>(null);
  const location = useLocation();
  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= 100) {
      header.current?.classList.add("active");
    } else {
      header.current?.classList.remove("active");
    }
  });

  const onSelectMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const event = e.target as HTMLDivElement;
    const pages = event.parentElement?.children;
  };
  return (
    <header ref={header}>
      <div className="header_title">
        <img className="icon" src={ICON} alt="" />
        {/* <h1>측위알고리즘 시험 검증 시스템</h1> */}
        <h1>행동인식 데이터 수집 및 모델 생성 </h1>
      </div>

      <nav>
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
      </nav>
    </header>
  );
};

export default Header;
