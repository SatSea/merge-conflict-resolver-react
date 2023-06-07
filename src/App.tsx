import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MergeConflictResolver from "./Components/MergeConflictResolver/MergeConflictResolver";
import FileChooser from "./Components/FileChooser/FileChooser";
import File from "./File";
import MergeButton from "./Components/MergeButton/MergeButton";
import ConflictResolver from "./Components/MergeConflictResolver/ConflictResolver";

const rawFiles: File[] = [
	{
		name: "file1",
		content: `file 1
If you have questions, please 
<<<<<<< HEAD
open an issue
=======
ask your question in IRC.
>>>>>>> branch-a
I am
<<<<<<< HEAD
tomato
=======
potato
>>>>>>> branch-a
wqeqw`,
	},
	{
		name: "file2",
		content: `file 2
If you have questions, please 
<<<<<<< HEAD
call me maybe
=======
fqwdfuquwyduqwdyfuwqyduqdgqugdqu
>>>>>>> branch-a`,
	},
	{
		name: "file3",
		content: `file 3
<<<<<<< HEAD
If you have questions, please 
open an issue
=======
I don't have problems
>>>>>>> branch-a`,
	},
];


function App() {
	const [files] = useState(rawFiles.map((file) => {
		return new ConflictResolver(file);
	}));

	const [choosedFile, setChoosedFile] = useState<ConflictResolver>();

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<FileChooser
					files={files}
					choosingHandler={(file: ConflictResolver) => {
						setChoosedFile(file);
					}}
				/>
				{choosedFile && <MergeConflictResolver fileWithConflict={choosedFile} />}
				{files.every((file) => file.resolved()) && <MergeButton files={files} />}
			</header>
		</div>
	);
}

export default App;
