import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MergeConflictResolver from "./Components/MergeConflictResolver/MergeConflictResolver";
import FileChooser from "./Components/FileChooser/FileChooser";
import File from "./File";
import MergeButton from "./Components/MergeButton/MergeButton";
import ConflictResolver from "./Components/MergeConflictResolver/ConflictResolver";

function App({ rawFiles }: { rawFiles: File[] }) {
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
