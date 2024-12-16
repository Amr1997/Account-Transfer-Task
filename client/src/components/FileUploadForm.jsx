import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axiosInstance from "../axiosInstance";

const FileUploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = ({ file }) => {
    setFile(file.originFileObj);
  };

  const beforeUpload = (file) => {
    const isCSV = file.type === "text/csv";
    if (!isCSV) {
      message.error("You can only upload CSV files!");
    }
    return isCSV || Upload.LIST_IGNORE;
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axiosInstance.post("/import/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success(response.data.message || "File uploaded successfully.");
      onUploadSuccess(); // Call the callback to trigger refetch in AccountsTable
    } catch (error) {
      message.error(error.response?.data?.error || "Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Upload
        beforeUpload={beforeUpload}
        onChange={handleFileChange}
        maxCount={1}
        showUploadList={{
          showRemoveIcon: true,
        }}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Upload"}
      </Button>
    </div>
  );
};

export default FileUploadForm;
