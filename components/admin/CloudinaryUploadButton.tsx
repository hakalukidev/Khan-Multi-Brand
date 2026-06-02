"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const CLOUDINARY_SCRIPT_SRC = "https://widget.cloudinary.com/v2.0/global/all.js";

type UploadResult = {
  secure_url?: string;
  public_id?: string;
};

type UploadEvent = {
  event?: string;
  info?: UploadResult;
};

type CloudinaryWidget = {
  open: () => void;
};

type CloudinaryUploadButtonProps = {
  disabled?: boolean;
  label?: string;
  onUploaded: (asset: { url: string; publicId: string }) => void;
};

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: unknown, result: UploadEvent) => void
      ) => CloudinaryWidget;
    };
  }
}

export default function CloudinaryUploadButton({
  disabled,
  label = "Upload image",
  onUploaded,
}: CloudinaryUploadButtonProps) {
  const [isReady, setIsReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const widgetRef = useRef<CloudinaryWidget | null>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

  useEffect(() => {
    if (window.cloudinary) {
      setIsReady(true);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${CLOUDINARY_SCRIPT_SRC}"]`
    );

    if (existingScript) {
      const onLoad = () => setIsReady(true);
      existingScript.addEventListener("load", onLoad);

      return () => existingScript.removeEventListener("load", onLoad);
    }

    const script = document.createElement("script");
    script.src = CLOUDINARY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setIsReady(true);
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  const handleUpload = () => {
    if (!window.cloudinary || !cloudName || !uploadPreset) {
      return;
    }

    setIsOpening(true);

    if (!widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset,
          folder,
          multiple: false,
          sources: ["local", "url", "camera"],
          resourceType: "image",
          clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
        },
        (error, result) => {
          if (!error && result.event === "success" && result.info?.secure_url) {
            onUploaded({
              url: result.info.secure_url,
              publicId: result.info.public_id ?? "",
            });
          }

          if (result.event === "close" || result.event === "success" || error) {
            setIsOpening(false);
          }
        }
      );
    }

    widgetRef.current.open();
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleUpload}
      disabled={disabled || !isReady || !cloudName || !uploadPreset || isOpening}
    >
      {isOpening ? (
        <Loader2 className="animate-spin" />
      ) : (
        <ImagePlus />
      )}
      {label}
    </Button>
  );
}
