import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import "../../css/ImgList.css";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DetailModal from "./DetailModal";

const PeopleList = ({ onSelectedIdsChange }) => {
  const { peopleRepo, setPeopleRepo } = useAppContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchPeopleImages = async () => {
    try {
      const response = await axios.get("/load/people", {
        params: { userId },
      });
      setPeopleRepo(response.data);
      console.log(peopleRepo);
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
      onSelectedIdsChange(newSelectedFiles);
      return newSelectedFiles;
    });
  };

  const handleDetailClick = async (img) => {
    try {
      console.log("people ID : ", img.peopleId);
      const response = await axios.get("/load/meta/people", {
        params: {
          peopleId: img.peopleId,
        },
      });
      const metadata = response.data;

      console.log("metadata : ", metadata);

      setSelectedDetail({ ...img, metadata });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching metadata", error);
    }
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
            <Button variant="contained" onClick={() => handleDetailClick(img)}>
              상세보기
            </Button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <DetailModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          detailData={selectedDetail}
        />
      )}
    </div>
  );
};

export default PeopleList;
