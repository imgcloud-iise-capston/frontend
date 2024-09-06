import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../css/DetailModal.css";
import imageCompression from "browser-image-compression";
import { jsPDF } from "jspdf";
import { canvasRGBA } from "stackblur-canvas"; // 필요한 함수만 가져옴

// ImageConverter 컴포넌트 정의
const ImageConverter = ({
  blobData,
  setTransformedImageUrl,
  setDownloadLink,
  setChangeFileExtension,
  setTransformedFileName,
  detailData,
  setShowRealResolution2,
}) => {
  const [convertedSizeMB, setConvertedSizeMB] = useState("");
  const [showFormatOptions, setShowFormatOptions] = useState(false);

  const handleImageTypeChange = async (type) => {
    try {
      let newBlob;
      const originalFileName = detailData.imageTitle[0] || "image"; // blobData에 파일 이름이 포함되어 있지 않다면 기본 이름 사용
      const fileNameWithoutExtension =
        originalFileName.substring(0, originalFileName.lastIndexOf(".")) ||
        originalFileName;

      if (type === "pdf") {
        // PDF로 변환
        const imgData = await convertBlobToDataUrl(blobData);
        const img = new Image();
        img.src = imgData;

        img.onload = () => {
          const pdf = new jsPDF({
            orientation: img.width > img.height ? "landscape" : "portrait",
            unit: "px",
            format: [img.width, img.height],
          });

          pdf.addImage(imgData, "JPEG", 0, 0, img.width, img.height); // 이미지 전체를 PDF에 추가
          const pdfBlob = pdf.output("blob");
          newBlob = new Blob([pdfBlob], { type: "application/pdf" });

          const newFileName = `${fileNameWithoutExtension}.pdf`;
          setTransformedFileName(newFileName);
          const newImageUrl = URL.createObjectURL(newBlob);
          setTransformedImageUrl(newImageUrl);
          setDownloadLink(newImageUrl);
          setChangeFileExtension("pdf");
        };

        return;
      } else {
        // JPEG 또는 PNG로 변환
        const newType = type === "jpeg" ? "image/jpeg" : "image/png";
        newBlob = new Blob([blobData], { type: newType });

        const newFileName = `${fileNameWithoutExtension}.${type}`;
        setTransformedFileName(newFileName);
        const newSize = newBlob.size;
        const newSizeMB = (newSize / (1024 * 1024)).toFixed(2);
        setConvertedSizeMB(newSizeMB);

        const newImageUrl = URL.createObjectURL(newBlob);
        setTransformedImageUrl(newImageUrl);
        setDownloadLink(newImageUrl);
        setChangeFileExtension(type);
      }
    } catch (error) {
      console.error("Image conversion error:", error);
    }
  };

  const convertBlobToDataUrl = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleFormatButtonClick = () => {
    setShowFormatOptions(!showFormatOptions);
  };

  const handleFormatOptionClick = (format) => {
    setShowFormatOptions(false);
    setShowRealResolution2(false);
    handleImageTypeChange(format);
  };

  return (
    <>
      <button onClick={handleFormatButtonClick}>파일포맷 변환</button>
      {showFormatOptions && (
        <div className="formatOptions">
          <button onClick={() => handleFormatOptionClick("jpeg")}>
            JPEG로 변환
          </button>
          <button onClick={() => handleFormatOptionClick("png")}>
            PNG로 변환
          </button>
          <button onClick={() => handleFormatOptionClick("pdf")}>
            PDF로 변환
          </button>
        </div>
      )}
    </>
  );
};

const DetailModal = ({ isOpen, onRequestClose, detailData }) => {
  const [metaScore, setMetaScore] = useState(0);
  const [fileExtension, setFileExtension] = useState("");
  const [changeFileExtension, setChangeFileExtension] = useState("");
  const [transformedImageUrl, setTransformedImageUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [blobData, setBlobData] = useState(null);
  const [compressedSizeMB, setCompressedSizeMB] = useState("");
  const [showRealResolution, setShowRealResolution] = useState(false);
  const [showRealResolution2, setShowRealResolution2] = useState(false);
  const [transformedFileName, setTransformedFileName] = useState(""); // 오른쪽 파일 이름

  const calculateMetaScore = (metadata) => {
    let score = 0;

    if (metadata.iso >= 100) score += 1;
    if (metadata.fstop >= 1.0) score += 1;
    if (metadata.whiteBalance) score += 1;
    if (metadata.exposureTime > 0) score += 1;
    if (metadata.resolution && metadata.resolution !== "0x0") score += 1;

    return score;
  };

  useEffect(() => {
    if (detailData && detailData.metadata) {
      const score = calculateMetaScore(detailData.metadata);
      setMetaScore(score);
      const title = detailData.imageTitle[0];

      let extension = title.slice(-4).toLowerCase(); // 먼저 4자리를 추출
      if (extension === "jpeg") {
        setFileExtension("jpeg");
      } else {
        extension = title.slice(-3).toLowerCase(); // 그 외의 경우, 3자리 추출
        setFileExtension(extension);
      }

      setChangeFileExtension(extension);

      if (detailData.base64) {
        let contentType = "";
        if (extension === "jpg" || extension === "jpeg") {
          contentType = "image/jpeg";
        } else if (extension === "png") {
          contentType = "image/png";
        }
        const blob = base64ToBlob(detailData.base64, contentType);
        setBlobData(blob);
      }
    }
  }, [detailData]);

  const base64ToBlob = (base64, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const handleCompressImage = async () => {
    setShowRealResolution2(false);
    const blob = blobData;

    const options = {
      initialQuality: 0.8,
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(blob, options);
      const compressedSize = compressedBlob.size;
      const compressedSizeMB = (compressedSize / (1024 * 1024)).toFixed(2);
      setCompressedSizeMB(compressedSizeMB);
      const compressedImageUrl = URL.createObjectURL(compressedBlob);
      setTransformedImageUrl(compressedImageUrl);
      setTransformedFileName(detailData.imageTitle);

      setDownloadLink(compressedImageUrl);
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  const handleDownload = () => {
    if (downloadLink && detailData.imageTitle) {
      const originalFileName = detailData.imageTitle[0];
      const fileNameWithoutExtension =
        originalFileName.substring(0, originalFileName.lastIndexOf(".")) ||
        originalFileName;
      const newFileName = `${fileNameWithoutExtension}.${changeFileExtension}`; // 새 확장자를 적용한 파일 이름 생성

      const a = document.createElement("a");
      a.href = downloadLink;
      a.download = newFileName; // 수정된 파일 이름 사용
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleRemoveNoise = () => {
    setShowRealResolution2(false);
    if (blobData) {
      const img = new Image();
      const url = URL.createObjectURL(blobData);
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        // canvasRGBA를 사용하여 노이즈 제거
        canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, 10); // 반경 10의 블러 적용

        canvas.toBlob((blob) => {
          const transformedUrl = URL.createObjectURL(blob);
          setTransformedImageUrl(transformedUrl);
          setDownloadLink(transformedUrl);
        }, blobData.type);
      };
      setTransformedFileName(detailData.imageTitle);
    }
  };

  //실제 해상도 계산
  const handleShowRealResolution = () => {
    setShowRealResolution(true);
  };

  //실제 해상도 계산 (오른쪽)
  const handleShowRealResolution2 = () => {
    setShowRealResolution2(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ content: { width: "80%", margin: "auto" } }}
    >
      <div className="modalHeader">
        <h2>상세보기</h2>
        <button onClick={onRequestClose} className="closeButton">
          ✕
        </button>
      </div>
      <div className="total">
        <div className="original">
          <div className="originalImg">
            {detailData && (
              <>
                <img
                  src={detailData.imageUrl}
                  alt={detailData.imageTitle}
                  className="detailImg"
                />
                <p className="imgTitle">파일명 : {detailData.imageTitle}</p>
              </>
            )}
          </div>
          <div className="originalMetadata">
            <div className="metadataLeft">
              {detailData && (
                <div className="metadataItem">
                  <span>BRISQUE 품질점수 :</span>
                  <span>{detailData.brisqueScore}</span>
                </div>
              )}
              <div className="metadataItem">
                <span>메타데이터 품질 점수 :</span>
                <span>{metaScore}</span>
              </div>
              <div className="metadataItem">
                <span>용량 :</span>
                <span>{detailData.metadata.size}</span>
              </div>
              <div className="metadataItem">
                <span>확장자 :</span>
                <span>{fileExtension}</span>
              </div>
              {showRealResolution && (
                <div className="metadataItem">
                  <span>측정한 해상도 :</span>
                  <span>{detailData.metadata.realResolution}</span>
                </div>
              )}
            </div>
            <div className="metadataRight">
              <div className="metadataItem">
                <span>메타데이터의 해상도 :</span>
                <span>{detailData.metadata.resolution}</span>
              </div>
              <div className="metadataItem">
                <span>White Balance :</span>
                <span>{detailData.metadata.whiteBalance}</span>
              </div>
              <div className="metadataItem">
                <span>F-stop :</span>
                <span>{detailData.metadata.fstop}</span>
              </div>
              <div className="metadataItem">
                <span>Exposure time :</span>
                <span>{detailData.metadata.exposureTime}</span>
              </div>
              <div className="metadataItem">
                <span>Iso :</span>
                <span>{detailData.metadata.iso}</span>
              </div>
              <div className="metadataItem">
                <span>GPS :</span>
                <span>
                  {detailData.metadata.gpslatitude}:
                  {detailData.metadata.gpslongitude}
                </span>
              </div>
            </div>
          </div>
          <div className="buttonList">
            <button onClick={handleCompressImage}>압축</button>
            <button onClick={handleRemoveNoise}>노이즈 제거</button>
            <button onClick={handleShowRealResolution}>해상도 측정</button>
            <ImageConverter
              blobData={blobData}
              setTransformedImageUrl={setTransformedImageUrl}
              setDownloadLink={setDownloadLink}
              setChangeFileExtension={setChangeFileExtension}
              setTransformedFileName={setTransformedFileName}
              detailData={detailData}
              setShowRealResolution2={setShowRealResolution2}
            />
          </div>
        </div>

        <div className="transformed">
          <div className="transformedImg">
            {transformedImageUrl && (
              <>
                <img
                  src={transformedImageUrl}
                  alt="Transformed"
                  className="detailImg"
                />
                <p className="imgTitle">파일명 : {transformedFileName}</p>
              </>
            )}
          </div>
          <div className="transformedMetadata">
            <div className="metadataLeft">
              {detailData && (
                <div className="metadataItem">
                  <span>BRISQUE 품질 점수:</span>
                  <span>{detailData.brisqueScore}</span>
                </div>
              )}
              <div className="metadataItem">
                <span>용량 :</span>
                <span>{compressedSizeMB}</span>
              </div>
              <div className="metadataItem">
                <span>확장자 :</span>
                <span>{changeFileExtension}</span>
              </div>
              {transformedImageUrl && showRealResolution2 && (
                <div className="metadataItem">
                  <span>측정한 해상도 :</span>
                  <span>{detailData.metadata.realResolution}</span>
                </div>
              )}
            </div>
          </div>
          <div className="buttonList2">
            <button onClick={handleDownload} disabled={!transformedImageUrl}>
              다운로드
            </button>
            <button
              onClick={handleShowRealResolution2}
              disabled={!transformedImageUrl}
            >
              해상도 측정
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
