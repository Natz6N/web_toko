import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  placeholder?: string;
}

export function FileUploader({
  onFileSelect,
  accept = '*/*',
  maxSize = 5,
  placeholder = 'Click to upload or drag and drop'
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file type if accept is provided
    if (accept !== '*/*') {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileType = file.type;

      // Check if the file type matches any of the accepted types
      // Handle wildcard types like image/*
      const isValidType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          const category = type.split('/')[0];
          return fileType.startsWith(`${category}/`);
        }
        return type === fileType;
      });

      if (!isValidType) {
        setError(`Invalid file type. Please upload a file of type: ${accept}`);
        return false;
      }
    }

    // Check file size
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds the limit of ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      } else {
        onFileSelect(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      } else {
        onFileSelect(null);
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
        />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-2">
          <p className="text-sm font-medium">{placeholder}</p>
          <p className="text-xs text-gray-500 mt-1">
            {accept !== '*/*' ? `${accept.replace('*', '')} files up to ${maxSize}MB` : `Max ${maxSize}MB`}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-2 flex items-center justify-between rounded bg-red-50 px-3 py-2 text-red-600">
          <p className="text-sm">{error}</p>
          <button type="button" onClick={clearError} className="text-red-500 hover:text-red-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
