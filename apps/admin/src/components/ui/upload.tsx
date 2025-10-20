import React, { useState, useRef } from "react";
import { Button } from "./button";
import { Upload as UploadIcon, X } from "lucide-react";

interface UploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export function Upload({
  value,
  onChange,
  accept = "image/*",
  maxSize = 5,
  className = "",
}: UploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Chỉ cho phép upload file hình ảnh");
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File không được vượt quá ${maxSize}MB`);
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    onChange(previewUrl);

    // In a real app, you would upload to server here
    console.log("Upload file:", file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    if (value) {
      URL.revokeObjectURL(value);
    }
    onChange(null);
    setError(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {value ? (
        <div className="relative">
          <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <UploadIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Kéo thả hình ảnh vào đây hoặc{" "}
            <span className="text-blue-600 font-medium">chọn file</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Hỗ trợ: JPG, PNG, GIF (tối đa {maxSize}MB)
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        aria-label="Chọn file để upload"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!value && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClick}
          className="w-full"
        >
          <UploadIcon className="w-4 h-4 mr-2" />
          Chọn hình ảnh
        </Button>
      )}
    </div>
  );
}
