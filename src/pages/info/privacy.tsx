import { PdfViewer } from '@naverpay/react-pdf';

import { getR2URL } from '@/services/api';

const PdfViewerForPrivacy = () => {
  const pdfUrl = getR2URL('/documents/privacy/20240916.pdf');

  return (
    <PdfViewer
      pdfUrl={pdfUrl}
      // PDF 렌더링 중 에러가 발생했을 때 처리
      onErrorPDFRender={() => {
        // 브라우저에서 기본으로 제공하는 pdf viewer를 새창으로 띄우도록 처리
        window.open(pdfUrl, '_blank');
      }}
      lazyLoading
      externalLinkTarget="_blank"
      style={{
        zoom: '1.5',
      }}
    />
  );
};

export default PdfViewerForPrivacy;
