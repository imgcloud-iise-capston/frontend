import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import "../../css/ImgList.css";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const ThingList = ({ onSelectedIdsChange }) => {
  const { thingRepo, setThingRepo } = useAppContext();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchThingImages = async () => {
    try {
      const response = await axios.get("/load/thing", {
        params: { userId },
      });
      setThingRepo(response.data);
    } catch (error) {
      console.error("Error fetching thing images", error);
    }
  };

  const handleCheckboxChange = (file) => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = prevSelectedFiles.some(
        (f) => f.thingId === file.thingId
      )
        ? prevSelectedFiles.filter((f) => f.thingId !== file.thingId)
        : [...prevSelectedFiles, file];
      onSelectedIdsChange(newSelectedFiles); // 부모 컴포넌트로 선택된 파일들 전달
      return newSelectedFiles;
    });
  };

  useEffect(() => {
    fetchThingImages();
  }, [userId, setThingRepo]);

  return (
    <div className="list">
      {thingRepo.map((img) => (
        <div key={img.thingId} className="sort">
          <div className="blank">
            <Checkbox
              checked={selectedFiles.some(
                (file) => file.thingId === img.thingId
              )}
              onChange={() => handleCheckboxChange(img)}
            />
            <img
              src={img.smallImageUrl}
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
            />
          </div>
          <div className="filename">{img.imageTitle}</div>
          <div className="score">{img.brisqueScore}</div>
          <div className="detail">
            <Button variant="contained">상세보기</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThingList;
