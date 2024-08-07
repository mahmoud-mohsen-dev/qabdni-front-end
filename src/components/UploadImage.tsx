import { useState } from 'react';
import { Image, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
// import { UploadOutlined } from '@ant-design/icons';
import { FiPaperclip } from 'react-icons/fi';
import { v4 } from 'uuid';
import type { UploadChangeParam } from 'antd/es/upload';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export interface ImageInfoType {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error';
  url: string;
}

interface UploadImageProps {
  imageInfo: ImageInfoType;
  setImageInfo: React.Dispatch<React.SetStateAction<ImageInfoType>>;
}

function UploadImage({ imageInfo, setImageInfo }: UploadImageProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([imageInfo]);

  const getImageData = (info: UploadChangeParam<UploadFile<ImageInfoType>>) => {
    const uid = v4();
    const value = {
      uid: uid,
      name: `image-${uid}`,
      status: 'done' as const,
      url: `${info.file.url}`
    };
    setImageInfo(value);
    console.log(value);
  };

  const onChange: UploadProps['onChange'] = (info) => {
    setFileList(info.fileList);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      getImageData(info);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      getImageData(info);
    }
  };

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <div className="">
      <ImgCrop rotationSlider>
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-circle"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          beforeUpload={beforeUpload}
          maxCount={1}
        >
          {fileList.length <= 1 && (
            <div className="flex items-center justify-center gap-2">
              <FiPaperclip /> Upload a photo
            </div>
          )}
        </Upload>
      </ImgCrop>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default UploadImage;
