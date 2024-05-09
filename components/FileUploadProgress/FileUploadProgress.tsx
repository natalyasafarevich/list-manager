import {FC, useEffect, useState} from 'react';
import './FileUploadProgress.scss';
import {formatBytes} from '@/helper/formatBytes';

interface FileUploadProgressProps {
  file: File | null;
}

const FileUploadProgress: FC<FileUploadProgressProps> = ({file}) => {
  const [size, setSize] = useState<string | null>(null);
  const [files, setFiles] = useState<File | null>(null);

  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    if (file) {
      setSize(formatBytes(file.size));
      setFiles(file);
      setTimeout(() => {
        setIsUploaded(true);
      }, 1000);
      setTimeout(() => {
        setFiles(null);
        setIsUploaded(false);
      }, 2000);
    }
  }, [file]);
  return (
    <div className='file-progress'>
      {files && (
        <div className='file-progress__container'>
          <p className='file-progress__title'>{file?.name}</p>
          <p className='file-progress__size'>{size}</p>
          <div
            className={`file-progress__progress ${isUploaded ? 'uploaded' : ''}`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default FileUploadProgress;
