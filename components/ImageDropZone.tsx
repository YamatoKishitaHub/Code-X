import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type ImageDropZoneProps = {
  value: string;
  onChange: (image: string) => void;
  isRoundedFull?: boolean;
};

const ImageDropZone = ({ value, onChange, isRoundedFull }: ImageDropZoneProps) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      onChange(event.target?.result as string);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} className="w-full h-full p-4 text-xl">
      <input {...getInputProps()} />
      <div className="flex items-center justify-center w-full h-full">
        {value ? (
          <Image src={value} fill style={{objectFit: "contain"}} alt="Uploaded image" className={`max-h-52 border border-gray-600 ${isRoundedFull && "rounded-full"}`} />
        ) : (
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag or click</p>
        )}
      </div>
    </div>
  );
};

export default ImageDropZone;
