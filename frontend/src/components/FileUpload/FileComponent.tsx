import { Dispatch, FC, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

interface FileComponentProps {
  file: File;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const FileComponent: FC<FileComponentProps> = ({ file, setFiles }) => {
  return (
    <div
      key={file.name + file.size}
      className="flex items-center bg-gray-50 dark:bg-stone-900 rounded-md"
    >
      <p className="flex-1 px-5">{file.name}</p>
      <button
        className="p-5"
        onClick={() => {
          setFiles((files) =>
            files.filter((f) => f.name + f.size !== file.name + file.size)
          );
        }}
      >
        <MdClose />
      </button>
    </div>
  );
};

export default FileComponent;
