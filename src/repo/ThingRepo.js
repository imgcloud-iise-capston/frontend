import React, { useState } from "react";
import RepoNavi from "./header/RepoNavi";
import Sort from "./header/Sort";
import ThingList from "./header/ThingList";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Card, CardContent } from "@mui/material";

const ThingRepo = () => {
  const style = {
    width: "40%",
    height: "95vh",
    padding: "15px 0px",
    boxSizing: "border-box",
    borderLeft: "1px solid #d9d9d9",
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSelectedIdsChange = (files) => {
    setSelectedFiles(files);
  };

  const handleDeleteClick = async () => {
    const userId = localStorage.getItem("userId");
    const selectedIds = selectedFiles.map((file) => file.thingId);
    console.log("selected Id :", selectedIds);
    try {
      await axios.post(
        "http://localhost:8080/delete/thingImages",
        { idList: selectedIds }, // JSON 데이터 형식으로 전달
        { headers: { userId } }
      );

      window.location.reload(); // 업데이트된 목록을 보여주기 위해 페이지를 새로고침
    } catch (error) {
      console.error("이미지 삭제 중 오류 발생", error);
    }
  };

  const handleDownloadClick = async () => {
    const selectedIds = selectedFiles.map((file) => file.thingId);
    try {
      const response = await axios.post(
        "http://localhost:8080/download/thing",
        selectedIds
      );
      const imageUrls = response.data;

      imageUrls.forEach((url, index) => {
        fetch(url, { mode: "no-cors" })
          .then((res) => res.blob())
          .then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobURL;
            link.download = selectedFiles[index].imageTitle; // 파일명으로 imageTitle 사용
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((e) => console.error(e));
      });
    } catch (error) {
      console.error("이미지 다운로드 중 오류 발생", error);
    }
  };

  const handleZipDownloadClick = async () => {
    const selectedIds = selectedFiles.map((file) => file.thingId);
    try {
      const response = await axios.post(
        "http://localhost:8080/download/thing",
        selectedIds
      );
      const imageUrls = response.data;

      const zip = new JSZip();
      const promises = imageUrls.map(async (url, index) => {
        const response = await fetch(url, { mode: "no-cors" });
        const blob = await response.blob();
        const fileName = selectedFiles[index].imageTitle; // 파일명으로 imageTitle 사용
        zip.file(fileName, blob);
      });

      await Promise.all(promises);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "images.zip");
    } catch (error) {
      console.error("이미지 압축 중 오류 발생", error);
    }
  };

  return (
    <Card
      sx={{
        width: "45%",
        height: "85vh",
        padding: "15px 0px",
        margin: "20px auto",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <RepoNavi
          repoName="전체 영역"
          repoType="thing"
          onDeleteClick={handleDeleteClick}
          onDownloadClick={handleDownloadClick}
          onZipDownloadClick={handleZipDownloadClick}
        />
        <Sort />
        <ThingList onSelectedIdsChange={handleSelectedIdsChange} />
      </CardContent>
    </Card>
  );
};

export default ThingRepo;
