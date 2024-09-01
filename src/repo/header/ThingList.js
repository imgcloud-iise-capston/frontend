import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import "../../css/ImgList.css";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DetailModal from "./DetailModal";

const ThingList = ({ onSelectedIdsChange }) => {
  const { thingRepo, setThingRepo } = useAppContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

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

  const handleDetailClick = async (img) => {
    try {
      console.log("thing ID : ", img.thingId);
      const response = await axios.get("/load/meta/thing", {
        params: {
          thingId: img.thingId,
        },
      });

      let imgId;

      if (img.peopleId) {
        imgId = "people";
      } else {
        imgId = "thing";
      }

      console.log("이미지 분류 : ", imgId);
      console.log("id 타입 : ", typeof img.thingId);

      const getBase64 = await axios.post(
        `/base64?id=${img.thingId}&detail=${imgId}`
      );

      const metadata = response.data;
      const base64 = getBase64.data;

      console.log("metadata : ", metadata);

      setSelectedDetail({ ...img, metadata, base64 });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching metadata", error);
    }
  };

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

export default ThingList;
