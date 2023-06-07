import { FileWithConflicts } from "../FileTypes";

const FileChooser = ({ files, choosingHandler }: { files: FileWithConflicts[]; choosingHandler: (File: FileWithConflicts) => void }) => {    
    return <div className="">
        {files.map((file, index) => {
            return <div key={index} className="fileButton" style={{cursor:"pointer"}} onClick={() => {
                choosingHandler(file)
            }}>{file.name}</div>
        })}
    </div>;
};

export default FileChooser;
