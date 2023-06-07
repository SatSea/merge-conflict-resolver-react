import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import File from "./File";
import MergeConflictHandler from "./Components/MergeConflictHandler/MergeConflictHandler";

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
semaluhtounuyulohowwah
=======
fqwdfuquwyduqwdyfuwqyduqdgqugdqu
>>>>>>> branch-a`,
	},
	{
		name: "file3",
		content: `file 3
		If you have questions, please 
<<<<<<< HEAD
got the dud
=======
I don't have problems
>>>>>>> branch-a`,
	},
];

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<MergeConflictHandler
					rawFiles={rawFiles}
					onReady={(result) => {
						console.log(result);
					}}
				/>
			</header>
		</div>
	);
}

export default App;
