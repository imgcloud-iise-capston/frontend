import React, { useRef, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "react-modal";
import "../../css/PersonImgUpload.css";

Modal.setAppElement("#root");

const PersonImgUpload = React.forwardRef(({ repoType }, ref) => {
  const fileInputRef = useRef(null);
  const cropperRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setPeopleRepo, user } = useAppContext();
  const [selectedFileObject, setSelectedFileObject] = useState(null); // 파일 객체 상태 추가
  const [selectedFileName, setSelectedFileName] = useState(""); // 원래 파일명 상태 추가
  const [formData, setFormData] = useState(new FormData()); // formData 상태 추가

  React.useImperativeHandle(ref, () => ({
    triggerFileInput: () => {
      fileInputRef.current.click();
    },
  }));

  const resizeImage = (file, maxSize) => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        const scale = maxSize / Math.max(img.width, img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        }, file.type);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedFileObject(file); // 파일 객체 저장
      setSelectedFileName(file.name); // 원래 파일명 저장
      const newFormData = new FormData();
      newFormData.append("image", file);
      setFormData(newFormData); // formData 상태 저장
      setIsModalOpen(true); // 파일이 선택되면 모달 열기

      // 파일 입력 요소의 값을 리셋하여 동일한 파일을 다시 선택할 수 있도록 함
      event.target.value = "";
    }
  };

  const handleCropComplete = async () => {
    if (cropperRef.current && selectedFileObject) {
      const cropper = cropperRef.current.cropper;
      const cropData = cropper.getData();
      const fileType = selectedFileObject.name.split(".").pop(); // 파일 확장자 추출

      const smallFile = await resizeImage(selectedFileObject, 70); // smallImage 생성

      formData.append("cropData", JSON.stringify(cropData));
      formData.append("fileType", fileType);
      formData.append("smallFiles", smallFile);
      formData.append(
        "imageTitle",
        JSON.stringify({ titles: [selectedFileName] })
      );

      const newImage = {
        id: uuidv4(),
        file: selectedFileObject,
        preview: URL.createObjectURL(selectedFileObject),
        name: selectedFileName,
        score: null,
      };

      setPeopleRepo((prev) => [...prev, newImage]);

      try {
        const response = await axios.post(
          "http://localhost:8080/calculate/personBrisque",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              userId: user.userId,
            },
          }
        );
        const scores = response.data;

        setPeopleRepo((prev) =>
          prev.map((img) =>
            img.id === newImage.id ? { ...img, score: scores[0] } : img
          )
        );
      } catch (error) {
        console.error("Brisque score calculation failed:", error);
        console.log("user.id", user.userId);
      } finally {
        // 상태 초기화
        setIsModalOpen(false); // 업로드 완료 후 모달 닫기
        setSelectedFileObject(null); // 파일 객체 초기화
        setSelectedFileName(""); // 파일명 초기화
        setFormData(new FormData()); // formData 초기화
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {selectedFileObject && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Image Crop Modal"
        >
          <Cropper
            src={URL.createObjectURL(selectedFileObject)}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            guides={false}
            ref={cropperRef}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
          />
          <button onClick={handleCropComplete}>Upload</button>
        </Modal>
      )}
    </div>
  );
});

export default PersonImgUpload;
