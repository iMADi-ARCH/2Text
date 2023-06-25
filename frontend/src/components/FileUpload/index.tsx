import axios from "axios";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileComponent from "./FileComponent";

interface FileUploadProps {
  setText: Dispatch<SetStateAction<string | null>>;
}

const FileUpload: FC<FileUploadProps> = ({ setText }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    for (const file of files) {
      const data = new FormData();
      data.set("file", file);

      try {
        const response = await axios.post("/parse", data);
        console.log(response.data.text);
        setText((text) => text + "+" + response.data.text);
      } catch (error) {
        console.log(error);
      }
    }
    setUploading(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      setFiles((files) => {
        const alreadyin = files.find(
          (f) => f.name + f.size === file.name + file.size
        );
        if (alreadyin) return files;
        return [...files, file];
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    // accept,
    noClick: true,
  });

  return (
    <div className="my-20 flex flex-col gap-5 items-center">
      <div
        className="w-full h-full min-h-[512px] flex flex-col border dark:border-white/20 border-black/20 border-dashed rounded-md p-5 outline-none"
        {...getRootProps()}
      >
        <input name="file" id="file" {...getInputProps()} />
        <div className="flex flex-col gap-2 w-full">
          {files.map((file) => (
            <FileComponent
              key={file.name + file.size}
              file={file}
              setFiles={setFiles}
            />
          ))}
        </div>
        <div
          onClick={open}
          className="p-4 w-full h-full flex-1 flex items-center justify-center text-center cursor-pointer hover:underline"
        >
          {isDragActive
            ? "Drop Here"
            : "Drag and drop files here or click to browse"}
        </div>
      </div>
      <button
        className="bg-black text-white dark:bg-white dark:text-black rounded-md px-10 py-2"
        onClick={() => uploadFiles(files)}
        type="submit"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
