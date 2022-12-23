import React from "react";
import styled from "styled-components";
interface Payload {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  isFocus?: boolean;
  isWrong?: string;
}

interface MyInputType1 {
  payload: Payload[];
  setPayload: (e: any) => void;
}

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input<any>`
  width: 100%;
  height: 2em;
  border: none;
  border-bottom: 5px solid grey;
  font-size: 1em;
  outline: none;
  margin-bottom: 1em;
`;

const InputContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: transparent;
  width: 100%;
  & > label {
    font-size: 14px;
    font-weight: 700;
    color: ${(props: any) => {
      if (props.data.isWrong) {
        return "red";
      } else {
        return "grey";
      }
    }};
  }

  ${StyledInput} {
    border-bottom: 5px solid
      ${(props: any) => {
        if (props.data.isWrong) {
          return "red";
        } else {
          return "grey";
        }
      }};
    &:focus {
      border-bottom: 5px solid lightblue;
    }
  }
`;

export const MyInputType1: React.FC<MyInputType1> = ({
  payload,
  setPayload,
}) => {
  return (
    <FlexDiv>
      {payload.map((list: any) => {
        return (
          <InputContainer data={list}>
            <label htmlFor="input">{list.label}</label>
            <StyledInput
              name={list.name}
              data={list}
              placeholder={list.placeholder}
            ></StyledInput>
          </InputContainer>
        );
      })}
    </FlexDiv>
  );
};
