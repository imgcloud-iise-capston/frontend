import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import "../../css/ImgList.css";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const PeopleList = ({ onSelectedIdsChange }) => {
  const { peopleRepo, setPeopleRepo } = useAppContext();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchPeopleImages = async () => {
    try {
      const response = await axios.get("/load/people", {
        params: { userId },
      });
      setPeopleRepo(response.data);
    } catch (error) {
      console.error("Error fetching people images", error);
    }
  };

  const handleCheckboxChange = (file) => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = prevSelectedFiles.some(
        (f) => f.peopleId === file.peopleId
      )
        ? prevSelectedFiles.filter((f) => f.peopleId !== file.peopleId)
        : [...prevSelectedFiles, file];
      onSelectedIdsChange(newSelectedFiles); // 부모 컴포넌트로 선택된 파일들 전달
      return newSelectedFiles;
    });
  };

  useEffect(() => {
    fetchPeopleImages();
  }, [userId]);

  return (
    <div className="list">
      {peopleRepo.map((img) => (
        <div key={img.peopleId} className="sort">
          <div className="blank">
            <Checkbox
              checked={selectedFiles.some(
                (file) => file.peopleId === img.peopleId
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

export default PeopleList;
