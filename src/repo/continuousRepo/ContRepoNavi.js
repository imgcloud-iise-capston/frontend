import "../../css/RepoNavi.css";
import React, { useRef } from "react";
import ContImgUpload from "./ContImgUpload";
import ContPersonImgUpload from "./ContPersonImgUpload";

// 나중에 .png .svg 파일로 바꾸기
const ContRepoNavi = ({ repoName, repoType }) => {
  const imgUploadRef = useRef(null);

  const handleUploadClick = () => {
    imgUploadRef.current.triggerFileInput();
  };

  return (
    <div className="RepoNavi">
      <div className="RepoName">{repoName}</div>
      <div className="buttonList">
        {repoType === "contThing" ? (
          <ContImgUpload ref={imgUploadRef} repoType={repoType} />
        ) : (
          <ContPersonImgUpload ref={imgUploadRef} />
        )}
        <div className="button" onClick={handleUploadClick}>
          <img src="img/upload.png" />
          <div>사진 올리기</div>
        </div>
      </div>
    </div>
  );
};

export default ContRepoNavi;
