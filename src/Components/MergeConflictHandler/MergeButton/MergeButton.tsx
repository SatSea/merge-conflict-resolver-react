import File from "../../../File";
import { Conflict, FileWithConflicts } from "../FileTypes";

export const buildFile = ({file}: {file: FileWithConflicts}): string => {
    return file.content.map((part) => {
        if (part.type === "normal") return part.content
        const partAsConflict = part as Conflict;
        return partAsConflict.isTopPart ? partAsConflict.topPart : partAsConflict.bottomPart 
    }).join('')
}

const MergeButton = ({files, readyCallback}: {files: FileWithConflicts[], readyCallback: (result:File[]) => void}) => {
    return ( <div className="" onClick={() => {
        readyCallback(files.map((file) => {
            return {name: file.name, content: buildFile({file})}
        }))
    }}><button>Замерджить</button></div> );
}
 
export default MergeButton;