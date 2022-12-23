import { MyButton } from "@/components/MyButton";
import Container from "@/components/container";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MyInputType1 } from "@/components/MyInput";
const FetchDataContainer = () => {
  const [isShow2ndContainer, setIsShow2ndContainer] = useState(false);
  const [isShow3rdContainer, setIsShow3rdContainer] = useState(false);
  const [payload, setPayload] = useState([
    {
      name: "username",
      label: "이름",
      value: "",
      placeholder: "입력해주세요",
      isFocus: false,
      isWrong: "잘못된 이름입니다.",
    },
    {
      name: "age",
      label: "나이",
      value: "",
      placeholder: "입력해주세요",
      isFocus: false,
    },
    {
      name: "pw",
      label: "비밀번호",
      value: "",
      placeholder: "입력해주세요",
      isFocus: false,
    },
  ]);
  return (
    <main className="mainContainer">
      <motion.div className="containers">
        <Container
          title="데이터 가져오기"
          addedCls={
            isShow3rdContainer
              ? "flex3"
              : isShow2ndContainer
              ? "flex5"
              : "flex7"
          }
        >
          <MyButton
            onClickBtn={() => {
              setIsShow2ndContainer(!isShow2ndContainer);
            }}
            title="가져오기"
          />
          <MyButton
            onClickBtn={() => {
              setIsShow3rdContainer(!isShow3rdContainer);
            }}
            title="데이터세트 정보 입력하기"
          />
        </Container>
        <AnimatePresence exitBeforeEnter={true}>
          {isShow2ndContainer && (
            <Container
              title="데이터 진행 상태"
              cls="basicContainer2nd"
              addedCls={
                isShow3rdContainer
                  ? "flex3"
                  : isShow2ndContainer
                  ? "flex5"
                  : "flex3"
              }
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
          )}

          {isShow3rdContainer && (
            <Container
              title="데이터세트 정보 입력"
              cls="basicContainer2nd"
              addedCls="flex3"
            >
              <MyInputType1 payload={payload} setPayload={setPayload} />
              <MyButton onClickBtn={() => {}} title="저장하기" />
            </Container>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default FetchDataContainer;
