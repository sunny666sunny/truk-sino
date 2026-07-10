import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, message, Space, Upload } from "antd";
import { useState } from "react";
import { resolveAssetUrl, uploadImage } from "../lib/api";

type UploadRequest = {
  file: File | Blob;
  onError?: (error: Error) => void;
  onSuccess?: (body: unknown, file: File | Blob) => void;
};

type Props = {
  value?: string | null;
  onChange?: (value: string) => void;
};

const text = {
  success: "\u56fe\u7247\u4e0a\u4f20\u6210\u529f",
  failed: "\u4e0a\u4f20\u5931\u8d25",
  alt: "\u5df2\u4e0a\u4f20\u56fe\u7247",
  upload: "\u4e0a\u4f20\u56fe\u7247",
  clear: "\u6e05\u9664",
  hint: "\u652f\u6301 jpg\u3001png\u3001webp\u3001gif\u3001svg\uff0c\u6700\u5927 5MB",
};

export function ImageUploadField({ value, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const previewUrl = resolveAssetUrl(value);

  const upload = async (options: unknown) => {
    const { file, onError, onSuccess } = options as UploadRequest;
    setLoading(true);
    try {
      const result = await uploadImage(file as File);
      onChange?.(result.url);
      onSuccess?.(result, file);
      message.success(text.success);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(text.failed);
      message.error(err.message);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" size={8} style={{ width: "100%" }}>
      {previewUrl ? <Image src={previewUrl} alt={text.alt} width={160} height={96} style={{ objectFit: "cover", borderRadius: 6 }} /> : null}
      <Space>
        <Upload accept="image/*" maxCount={1} showUploadList={false} customRequest={upload}>
          <Button icon={loading ? <LoadingOutlined /> : <PlusOutlined />} loading={loading}>
            {text.upload}
          </Button>
        </Upload>
        {value ? <Button onClick={() => onChange?.("")}>{text.clear}</Button> : null}
      </Space>
      {value ? <span className="upload-path">{value}</span> : <span className="upload-path">{text.hint}</span>}
    </Space>
  );
}
