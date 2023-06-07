import { useEffect, useState } from "react";
import FileChooser from "./FileChooser/FileChooser";
import MergeConflictResolver from "./MergeConflictResolver/MergeConflictResolver";
import MergeButton from "./MergeButton/MergeButton";
import File from "../../File";
import { Conflict, FileWithConflicts, Part } from "./FileTypes";

const regexForUnresolvedMergeConflicts = /(<<<<<<<[^(>>>>>>>)]*>>>>>>>.*)/g;

const parseRawFile = (rawFiles: File[]): FileWithConflicts[] => {
	return rawFiles.map((file): FileWithConflicts => {
		return {
			name: file.name,
			content: file.content.split(regexForUnresolvedMergeConflicts).map((partOfFile) => {
				return {
					content: partOfFile,
					type: regexForUnresolvedMergeConflicts.test(partOfFile) ? "conflict" : "normal",
				};
			}),
		};
	});
};

const MergeConflictHandler = ({ rawFiles, onReady }: { rawFiles: File[]; onReady: (result: File[]) => void }) => {
	const [files] = useState<FileWithConflicts[]>(parseRawFile(rawFiles));

	const [choosedFile, setChoosedFile] = useState<FileWithConflicts>();

	const [allFilesResolved, setAllFilesResolved] = useState(
		files.every((file) =>
			file.content.every((part) => {
				if (part.type === "normal") return true;
				return (part as Conflict).resolved!;
			})
		)
	);

	return (
		<div className="MergeConflictHandler">
			<FileChooser
				files={files}
				choosingHandler={(file: FileWithConflicts) => {
					setChoosedFile(file);
				}}
			/>
			{choosedFile && (
				<MergeConflictResolver
					fileWithConflict={choosedFile}
					onSomethingChanged={() =>
						setAllFilesResolved(
							files.every((file) =>
								file.content.every((part) => {
									if (part.type === "normal") return true;
									return (part as Conflict).resolved!;
								})
							)
						)
					}
				/>
			)}
			{files.every((file) =>
				file.content.every((part) => {
					if (part.type === "normal") return true;
					return (part as Conflict).resolved!;
				})
			) && <MergeButton files={files} readyCallback={(result) => onReady(result)} />}
		</div>
	);
};

export default MergeConflictHandler;
