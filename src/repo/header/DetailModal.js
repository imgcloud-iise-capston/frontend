import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../css/DetailModal.css";
import { Button } from "@mui/material";

const DetailModal = ({ isOpen, onRequestClose, detailData }) => {
  const [metaScore, setMetaScore] = useState(0);
  const [fileExtension, setFileExtension] = useState("");

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
    }
  }, [detailData]);

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
            <button> 압축 </button>
            <button> 노이즈 제거 </button>
            <button> 해상도 측정 </button>
            <button> 파일포맷 변환 </button>
          </div>
        </div>

        <div className="transformed">
          <div className="transformedImg">
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
                <span>{detailData.metadata.size}</span>
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
