import { COLOR } from "@/constants/constant";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import LoadingSpinner from "@/components/loadingSpinner";
import { Portal } from "react-portal";
import MyPortal from "./MyPortal";
interface Dragover {
  dragover: boolean;
}

export const MyUpload: React.FC<Dragover> = ({ dragover }) => {
  const [fileList, setFileList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const refUploadInput = useRef<HTMLInputElement>(null);
  const refUploadContainer = useRef<HTMLDivElement>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = e.target.files;
    setFileList(files);
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (refUploadInput.current !== null) {
      refUploadInput.current.setAttribute("directory", "");
      refUploadInput.current.setAttribute("webkitdirectory", "");
    }
  }, [refUploadInput]);

  if (isLoading) {
    return (
      <MyPortal selector="#portal">
        <LoadingSpinner />
      </MyPortal>
    );
  }
  return (
    <>
      <StyledUploadContainer
        ref={refUploadContainer}
        dragover={dragover}
        onDragEnter={() => {
          if (refUploadContainer.current)
            refUploadContainer.current.classList.add("dragEnter");
        }}
        onDragLeave={() => {
          if (refUploadContainer.current)
            refUploadContainer.current.classList.remove("dragEnter");
        }}
        onDrop={() => {
          if (refUploadContainer.current)
            refUploadContainer.current.classList.remove("dragEnter");
        }}
      >
        <StyledUploadInput
          type="file"
          multiple
          ref={refUploadInput}
          onChange={(e) => {
            onChangeFile(e);
          }}
        />
      </StyledUploadContainer>
      {/* 리스트 */}
      <StyledUploadList>
        {fileList?.map((list: any) => {
          console.log(list);
        })}
        <li></li>
      </StyledUploadList>
    </>
  );
};

//styled-component
const StyledUploadContainer = styled.div<Dragover>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px dashed ${COLOR.GREEN_PR};
  border-radius: 20px;
  padding: 2em;
  height: 10em;

  &:hover {
    opacity: 0.6;
  }
`;

const StyledUploadInput = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const StyledUploadList = styled.ul`
  & > li {
    font-size: 2em;
  }
`;
