import ConflictResolver from "../MergeConflictResolver/ConflictResolver";

const MergeButton = ({files}: {files: ConflictResolver[]}) => {
    return ( <div className="" onClick={() => {
        console.log(files.map((file) => {
            return {name: file.name,content: file.build()}
        }))
    }}><button>Замерджить</button></div> );
}
 
export default MergeButton;