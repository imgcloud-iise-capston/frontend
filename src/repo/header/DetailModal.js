import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../css/DetailModal.css";
import imageCompression from "browser-image-compression";
import { jsPDF } from 'jspdf';

// ImageConverter 컴포넌트 정의를 최상단으로 이동
const ImageConverter = ({ blobData, setTransformedImageUrl, setDownloadLink, setFileExtension }) => {
  const [convertedSizeMB, setConvertedSizeMB] = useState('');
  const [showFormatOptions, setShowFormatOptions] = useState(false);

  const handleImageTypeChange = async (type) => {
    try {
      let newBlob;

      if (type === 'pdf') {
        // PDF로 변환
        const imgData = await convertBlobToDataUrl(blobData);
        const img = new Image();
        img.src = imgData;

        img.onload = () => {
          const pdf = new jsPDF({
            orientation: img.width > img.height ? 'landscape' : 'portrait', // 이미지의 가로 세로 비율에 맞춰 PDF 페이지 방향 설정
            unit: 'px',
            format: [img.width, img.height] // PDF 페이지 크기를 이미지 크기로 설정
          });

          // PDF의 크기를 이미지의 크기와 동일하게 설정하여 이미지 전체가 포함되도록 함
          pdf.addImage(imgData, 'JPEG', 0, 0, img.width, img.height); // 이미지 전체를 PDF에 추가

          const pdfBlob = pdf.output('blob'); // PDF Blob 생성
          newBlob = new Blob([pdfBlob], { type: 'application/pdf' });

          // 파일 확장자 설정
          setFileExtension('pdf');

          const newImageUrl = URL.createObjectURL(newBlob);
          setTransformedImageUrl(newImageUrl);
          setDownloadLink(newImageUrl);
        };

        return; // PDF 처리 완료 후 바로 반환
      } else {
        // JPEG 또는 PNG로 변환
        const newType = type === 'jpeg' ? 'image/jpeg' : 'image/png';
        newBlob = new Blob([blobData], { type: newType });

        // 파일 확장자 설정
        setFileExtension(type === 'jpeg' ? 'jpeg' : 'png');
      }

      const newSize = newBlob.size;
      const newSizeMB = (newSize / (1024 * 1024)).toFixed(2);
      setConvertedSizeMB(newSizeMB);

      const newImageUrl = URL.createObjectURL(newBlob);
      setTransformedImageUrl(newImageUrl);

      // 다운로드 링크 설정
      setDownloadLink(newImageUrl);
    } catch (error) {
      console.error('Image conversion error:', error);
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
    handleImageTypeChange(format);
  };

  return (
    <>
      <button onClick={handleFormatButtonClick}>파일포맷 변환</button>
      {showFormatOptions && (
        <div className="formatOptions">
          <button onClick={() => handleFormatOptionClick('jpeg')}>JPEG로 변환</button>
          <button onClick={() => handleFormatOptionClick('png')}>PNG로 변환</button>
          <button onClick={() => handleFormatOptionClick('pdf')}>PDF로 변환</button>
        </div>
      )}
    </>
  );
};

const DetailModal = ({ isOpen, onRequestClose, detailData }) => {
  const [metaScore, setMetaScore] = useState(0);
  const [fileExtension, setFileExtension] = useState("");
  const [transformedImageUrl, setTransformedImageUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState(""); // 다운로드 링크 상태 추가
  const [blobData, setBlobData] = useState(null);
  const [compressedSizeMB, setCompressedSizeMB] = useState("");

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

      if (detailData.base64) {
        let contentType = "";
        if (extension === "jpg") {
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

      // 압축된 이미지 다운로드 링크 설정
      setDownloadLink(compressedImageUrl);
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  // 다운로드 버튼 클릭 핸들러
  const handleDownload = () => {
    if (downloadLink) {
      const a = document.createElement('a'); // 동적으로 <a> 태그 생성
      a.href = downloadLink;
      a.download = `${detailData.imageTitle}.${fileExtension}`; // 파일명과 확장자 설정
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // 다운로드 후 <a> 태그 제거
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ content: { width: "80%", margin: "auto" } }}
    >
      <div className="modalHeader">
        <h2>상세보기</h2>
        <button onClick={onRequestClose} className="closeButton">✕</button>
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
                  {detailData.metadata.gpslatitude}:{detailData.metadata.gpslongitude}
                </span>
              </div>
            </div>
          </div>
          <div className="buttonList">
            <button onClick={handleCompressImage}>압축</button>
            <button>노이즈 제거</button>
            <button>해상도 측정</button>
            {/* ImageConverter 컴포넌트 사용 */}
            <ImageConverter
              blobData={blobData}
              setTransformedImageUrl={setTransformedImageUrl}
              setDownloadLink={setDownloadLink}
              setFileExtension={setFileExtension}
            />
          </div>
          <div className="buttonList2">
            <button onClick={handleDownload}>다운로드</button>
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




