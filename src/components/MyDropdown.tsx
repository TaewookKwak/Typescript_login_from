import { COLOR } from "@/constants/constant";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { isTwoObjectsTheSame } from "@/utils/common/commonUtils";
import { AnimatePresence, motion } from "framer-motion";
import { MyButton } from "./MyButton";
import { MyModalNoFooter } from "./MyModal";
interface DropDownType1 {
  payload: any[];
  setPayload: (e: any) => void;
}
export const MyDropdown: React.FC<DropDownType1> = ({
  payload,
  setPayload,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const variants = {
    open: {
      rotate: 180,
    },
    close: {
      rotate: 0,
    },
  };

  const onCancelModal = () => {
    const updatedList = payload.map((_list) => {
      return {
        ..._list,
        isFocus: !_list.isFocus,
      };
    });
    setPayload(updatedList);
    setIsModalOpen(false);
  };
  return (
    <FlexDiv>
      {payload.map((list: any) => {
        return (
          <DropDownContainer focus={list.isFocus}>
            <StyledText>{list.label}</StyledText>
            <StyledDropDown
              data={list}
              onClick={() => {
                const updatedList = payload.map((_list) => {
                  if (isTwoObjectsTheSame(list, _list)) {
                    return {
                      ..._list,
                      isFocus: !_list.isFocus,
                    };
                  } else {
                    return {
                      ..._list,
                      isFocus: !_list.isFocus,
                    };
                  }
                });

                setPayload(updatedList);
                setIsModalOpen(true);
              }}
            >
              <PlaceHolder>선택해주세요</PlaceHolder>
              <IconContainer
                animate={list.isFocus ? "open" : "closed"}
                variants={variants}
                transition={{
                  duration: 0.05,
                  type: "tween",
                }}
              >
                <FontAwesomeIcon size="1x" icon={faCaretDown} />
              </IconContainer>
            </StyledDropDown>
          </DropDownContainer>
        );
      })}
      <AnimatePresence>
        {isModalOpen && (
          <MyModalNoFooter title="선택하기" onCancel={onCancelModal}>
            <DropDownSelection
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
            >
              <p>선택1</p>
              <p>
                <FontAwesomeIcon
                  size="1x"
                  icon={faCheck}
                  color={COLOR.YELLOW_PR}
                />
              </p>
            </DropDownSelection>
            <DropDownSelection
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
            >
              <p>선택1</p>
              <p>
                <FontAwesomeIcon
                  size="1x"
                  icon={faCheck}
                  color={COLOR.YELLOW_PR}
                />
              </p>
            </DropDownSelection>{" "}
            <DropDownSelection
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
            >
              <p>선택1</p>
              <p>
                <FontAwesomeIcon
                  size="1x"
                  icon={faCheck}
                  color={COLOR.YELLOW_PR}
                />
              </p>
            </DropDownSelection>
          </MyModalNoFooter>
        )}
      </AnimatePresence>
    </FlexDiv>
  );
};

// styled-components

const DropDownSelection = styled(motion.div)`
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlaceHolder = styled.p`
  color: grey;
`;

const StyledDropDown = styled.div<any>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  height: 2em;
  border: none;
  border-bottom: 3px solid grey;
  font-size: 1em;
  outline: none;
  margin-bottom: 1em;
  background-color: transparent;
  color: white;
  ${PlaceHolder} {
  }
`;

const StyledText = styled.p<any>`
  font-size: 1em;
  font-weight: 600;
`;

const IconContainer = styled(motion.div)<any>`
  width: fit-content;
  height: fit-content;
  position: absolute;
  right: 0;
  transition: all ease 0.4s;
  transform: ${({ focus }: any) => focus && "rotate(180deg)"};
`;

const DropDownContainer = styled.div<any>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  ${StyledDropDown} {
    border-bottom: 3px solid
      ${(props: any) => {
        return props?.focus ? `${COLOR.GREEN_PR}` : "grey";
      }};
  }
`;
