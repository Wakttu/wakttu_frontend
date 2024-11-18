import PDFViewer from '@/components/PDFViewer';
import { getR2URL } from '@/services/api';
const PDF = () => {
  return <PDFViewer url={getR2URL('/wakttu.pdf')} />;
};

export default PDF;
