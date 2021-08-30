import { ReactElement } from 'react';
import ReactQrReader from 'react-qr-reader';

export interface QrReaderProps {
  handleScan: (data: string | null) => void;
  handleError: (err: unknown) => void;
}

const QrReader = (props: QrReaderProps): ReactElement => {
  const { handleScan, handleError } = props;
  return (
    <ReactQrReader delay={200} onScan={handleScan} onError={handleError} />
  );
};

export default QrReader;
