"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImgIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export const ImageUploader = ({ value, onChange }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset",  `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      toast.error("Error uploading image");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed
                   rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100
                   transition-colors duration-200 relative overflow-hidden"
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin h-6 w-6 text-black"/>
            <span>Please wait...</span>
          </div>
        ) : value ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
              <span className="px-3 py-1 bg-white text-sm rounded-lg shadow">
                Change Image
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <ImgIcon className="h-10 w-10 mb-2 text-gray-400" />
            <p className="text-sm font-medium">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
          </div>
        )}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};