"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FadeInImage({ className, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={cn("transition-opacity duration-700 ease-out", loaded ? "opacity-100" : "opacity-0", className)}
    />
  );
}
