import { COLOR } from "@/constants/constant";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import LoadingSpinner from "@/components/loadingSpinner";
import MyPortal from "./MyPortal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileCsv,
  faFileExcel,
  faFileImage,
  faFilePdf,
  faFilePowerpoint,
  faFileText,
  faFileVideo,
  faFileWord,
  faFolderOpen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
interface Dragover {
  dragover: boolean;
}

interface onDelete {
  (file: File): void;
}

export const MyUpload: React.FC<Dragover> = ({ dragover }) => {
  const [fileList, setFileList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const refUploadInput = useRef<HTMLInputElement>(null);
  const refUploadContainer = useRef<HTMLDivElement>(null);

  const animation = useAnimation();

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const files = e.target.files;
    let filesArray: File[] = [];
    if (files) {
      filesArray = Array.from(files).map((file: any) => file);
    }

    setFileList(filesArray);
    setIsLoading(false);

    // 초기화 : 같은 파일 구축 가능
    e.target.value = "";
  };

  const onDelete: onDelete = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList?.indexOf(file), 1);
    setFileList(updatedList);
  };

  function imgByType(type: string) {
    if (type.includes("pdf")) {
      return <FontAwesomeIcon size="2x" icon={faFilePdf} />;
    } else if (type.includes("csv")) {
      return <FontAwesomeIcon size="2x" icon={faFileCsv} />;
    } else if (type.includes("excel") || type.includes("xlsx")) {
      return <FontAwesomeIcon size="2x" icon={faFileExcel} />;
    } else if (
      type.includes("word") ||
      type.includes("docx") ||
      type.includes("hwp")
    ) {
      return <FontAwesomeIcon size="2x" icon={faFileWord} />;
    } else if (type.includes("pptx")) {
      return <FontAwesomeIcon size="2x" icon={faFilePowerpoint} />;
    } else if (type.includes("image")) {
      return <FontAwesomeIcon size="2x" icon={faFileImage} />;
    } else if (type.includes("text")) {
      return <FontAwesomeIcon size="2x" icon={faFileText} />;
    } else if (type.includes("video")) {
      return <FontAwesomeIcon size="2x" icon={faFileVideo} />;
    } else return <FontAwesomeIcon size="2x" icon={faFile} />;
  }

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
        <FontAwesomeIcon icon={faFolderOpen} size="4x" />
        <span style={{ marginTop: "1em" }}>Drag or Drop directory here</span>
      </StyledUploadContainer>
      {/* 리스트 */}
      <StyledUploadList>
        {fileList.map((file: any, index: number) => {
          return (
            <AnimatePresence exitBeforeEnter={true}>
              <StyledUploadListContainer
                key={file.name}
                animate={animation}
                exit={{ opacity: 0, translateX: -200 }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {imgByType(file.type)}
                  <li>{file?.name}</li>
                </div>
                <motion.div
                  whileHover={{
                    scale: 1.2,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  // onTap={async (e, info) => {
                  //   await animation.start((j) => {
                  //     if (i === j) {
                  //       console.log("here");
                  //       return {
                  //         opacity: 0,
                  //         x: -100,
                  //         transition: { delay: i * 0.3 }
                  //       };
                  //     } else {
                  //       return {
                  //         opacity: 1
                  //       };
                  //     }
                  //   });
                  //   setArr(arr.filter((item) => item.id !== id));
                  // }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="clickable"
                    size="1x"
                    onClick={() => onDelete(file)}
                  />
                </motion.div>
              </StyledUploadListContainer>
            </AnimatePresence>
          );
        })}
      </StyledUploadList>
    </>
  );
};

//styled-component
const StyledUploadListContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #504c4c;
  border-radius: 20px;
  margin-bottom: 1em;
`;

const StyledUploadContainer = styled.div<Dragover>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px dashed ${COLOR.GREEN_PR};
  border-radius: 20px;
  padding: 2em;
  margin-bottom: 2em;

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
  cursor: pointer;
`;

const StyledUploadList = styled.ul`
  overflow: auto;
  max-height: 60vh;
  li {
    font-size: 1em;
    margin-left: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
