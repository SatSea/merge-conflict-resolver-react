import { FileWithConflicts } from "../FileTypes";

const FileChooser = ({
	files,
	choosingHandler,
	choosedFile,
}: {
	files: FileWithConflicts[];
	choosingHandler: (File: FileWithConflicts) => void;
	choosedFile?: FileWithConflicts;
}) => {
    console.log("Rerender time")
	return (
		<div className="FileChooser">
			{files.map((file, index) => {
				return (
					<div
						key={index}
						className={"FileButton" + (file.name === choosedFile?.name ? " ActiveFile" : "")}
						onClick={() => {
							choosingHandler(file);
						}}
					>
						{file.name}
					</div>
				);
			})}
		</div>
	);
};

export default FileChooser;
