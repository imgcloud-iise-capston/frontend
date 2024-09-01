import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../css/DetailModal.css";
import imageCompression from "browser-image-compression";
// import cv from "@techstark/opencv-js";

const DetailModal = ({ isOpen, onRequestClose, detailData }) => {
  const [metaScore, setMetaScore] = useState(0);
  const [fileExtension, setFileExtension] = useState("");
  const [transformedImageUrl, setTransformedImageUrl] = useState("");
  const [blobData, setBlobData] = useState(null);
  const [compressedSizeMB, setCompressedSizeMB] = useState("");

  // 메타데이터 품질 점수 계산 함수
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
      const extension = title.slice(-3).toLowerCase();
      setFileExtension(extension);

      // detailData.base64를 Blob 객체로 변환
      if (detailData.base64) {
        let contentType = "";
        if (extension === "jpg") {
          contentType = "image/jpeg";
        } else if (extension === "png") {
          contentType = "image/png";
        }
        const blob = base64ToBlob(detailData.base64, contentType);
        setBlobData(blob); // 변환된 Blob 객체를 상태에 저장
      }
    }
  }, [detailData]);

  // Base64 => Blob 객체로 변환하는 함수
  function base64ToBlob(base64, contentType = "", sliceSize = 512) {
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

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  //파일 품질 압축, 파일 해상도 유지, 품질 80% => 용량 줄게
  const handleCompressImage = async () => {
    const blob = blobData;

    const options = {
      initialQuality: 0.8, // 품질을 80%로 설정, 해상도는 유지 (만약 해상도 줄이려면 maxWidthOrHeight 옵션 추가하면 됨)
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(blob, options);
      const compressedSize = compressedBlob.size; //바이트 단위
      const compressedSizeMB = (compressedSize / (1024 * 1024)).toFixed(2); // MB 단위
      setCompressedSizeMB(compressedSizeMB);
      const compressedImageUrl = URL.createObjectURL(compressedBlob);
      setTransformedImageUrl(compressedImageUrl); // 압축된 이미지 URL을 상태에 저장
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  // //노이즈 제거
  // const handleRemoveNoise = async () => {
  //   if (blobData) {
  //     const imageBitmap = await createImageBitmap(blobData);
  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");

  //     canvas.width = imageBitmap.width;
  //     canvas.height = imageBitmap.height;

  //     ctx.drawImage(imageBitmap, 0, 0);

  //     let src = cv.imread(canvas);
  //     let dst = new cv.Mat();
  //     cv.fastNlMeansDenoisingColored(src, dst, 10, 10, 7, 21); // 노이즈 제거, 파라미터 값 변경해야할수도

  //     // cv.imshow(canvas, dst); // 캔버스에 결과 이미지를 표시

  //     src.delete();
  //     dst.delete();

  //     canvas.toBlob((blob) => {
  //       const transformedUrl = URL.createObjectURL(blob);
  //       setTransformedImageUrl(transformedUrl);
  //     }, blobData.type);
  //   }
  // };

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
                <span>측정한 해상도 :</span>
                <span>{detailData.metadata.realResolution}</span>
              </div>
              <div className="metadataItem">
                <span>용량 :</span>
                <span>{detailData.metadata.size}</span>
              </div>
              <div className="metadataItem">
                <span>확장자 :</span>
                <span>{fileExtension}</span>
              </div>
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
            <button> 노이즈 제거 </button>
            <button> 해상도 측정 </button>
            <button> 파일포맷 변환 </button>
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
                <p className="imgTitle">파일명 : {detailData.imageTitle}</p>
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
                <span>{fileExtension}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
