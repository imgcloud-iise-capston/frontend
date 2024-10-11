import React, { useState } from "react";
import Sort from "./header/Sort";
import ContRepoNavi from "./continuousRepo/ContRepoNavi";
import ContThingList from "./continuousRepo/ContThingList";

const ContThingRepo = () => {
  const style = {
    width: "50%",
    height: "95vh",
    padding: "15px 0px",
    boxSizing: "border-box",
    borderLeft: "1px solid #d9d9d9",
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSelectedIdsChange = (files) => {
    setSelectedFiles(files);
  };

  return (
    <div style={style}>
      <ContRepoNavi
        repoName="전체 영역 품질 분석"
        repoType="contThing"
        selectedFiles={selectedFiles}
      />
      <Sort />
      <ContThingList onSelectedIdsChange={handleSelectedIdsChange} />
    </div>
  );
};

export default ContThingRepo;
