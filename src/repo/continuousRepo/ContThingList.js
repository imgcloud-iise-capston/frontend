import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import "../../css/ImgList.css";
import Checkbox from "@mui/material/Checkbox";

const ContThingList = ({ onSelectedIdsChange }) => {
  const { contThingRepo } = useAppContext();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleCheckboxChange = (file) => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = prevSelectedFiles.some(
        (f) => f.thingId === file.thingId
      )
        ? prevSelectedFiles.filter((f) => f.thingId !== file.thingId)
        : [...prevSelectedFiles, file];
      onSelectedIdsChange(newSelectedFiles);
      return newSelectedFiles;
    });
  };

  return (
    <div className="list">
      {contThingRepo.map((img) => (
        <div key={img.id} className="sort">
          <div className="blank">
            <Checkbox
              checked={selectedFiles.some(
                (file) => file.thingId === img.thingId
              )}
              onChange={() => handleCheckboxChange(img)}
            />
            <img
              src={URL.createObjectURL(img.file)}
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
              alt={img.imageTitle}
            />
          </div>
          <div className="filename">{img.file.name}</div>
          <div className="score">{img.score}</div>
        </div>
      ))}
    </div>
  );
};

export default ContThingList;
