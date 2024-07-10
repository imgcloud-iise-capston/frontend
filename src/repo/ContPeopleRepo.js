import React, { useState } from "react";
import ContPeopleList from "./continuousRepo/ContPeopleList";
import Sort from "./header/Sort";
import ContRepoNavi from "./continuousRepo/ContRepoNavi";

const ContPeopleRepo = () => {
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
      <ContRepoNavi repoName="인물 연속사진" repoType="contPeople" />
      <Sort />
      <ContPeopleList onSelectedIdsChange={handleSelectedIdsChange} />
    </div>
  );
};

export default ContPeopleRepo;
