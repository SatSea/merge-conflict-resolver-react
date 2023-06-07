import ConflictResolver from "../MergeConflictResolver/ConflictResolver";

const FileChooser = ({ files, choosingHandler }: { files: ConflictResolver[]; choosingHandler: (File: ConflictResolver) => void }) => {    
    return <div className="">
        {files.map((file, index) => {
            return <div key={index} className="fileButton" style={{cursor:"pointer"}} onClick={() => {
                choosingHandler(file)
            }}>{file.name}</div>
        })}
    </div>;
};

export default FileChooser;
