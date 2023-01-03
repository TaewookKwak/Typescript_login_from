import { COLOR } from "@/constants/constant";
import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { isTwoObjectsTheSame } from "@/utils/common/commonUtils";
import { motion } from "framer-motion";
interface DropDownType1 {
  payload: any[];
  setPayload: (e: any) => void;
}
export const MyDropdown: React.FC<DropDownType1> = ({
  payload,
  setPayload,
}) => {
  const variants = {
    open: {
      rotate: 180,
    },
    close: {
      rotate: 0,
    },
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
              }}
            >
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
      <div style={{ position: "absolute", bottom: -20, zIndex: 30 }}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </div>
    </FlexDiv>
  );
};

// styled-components

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledDropDown = styled.div<any>`
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
