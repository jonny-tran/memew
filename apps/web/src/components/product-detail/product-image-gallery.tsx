"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  status: string;
}

export default function ProductImageGallery({
  images,
  productName,
  status,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Main Image */}
      <div className="md:col-span-3">
        <div className="relative bg-white rounded-lg overflow-hidden">
          <Badge className="absolute top-4 right-4 z-10 bg-amber-600 text-white px-3 py-1">
            {status}
          </Badge>
          <div className="aspect-[4/5] relative">
            <Image
              src={images[selectedImage]}
              alt={productName}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="md:col-span-1 space-y-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`aspect-square relative cursor-pointer rounded-lg overflow-hidden border-2 ${
              selectedImage === index ? "border-primary" : "border-gray-200"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image}
              alt={`${productName} ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
