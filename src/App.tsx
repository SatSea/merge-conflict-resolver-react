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
Styling is a topic of its own in React. React does not offer its own in-house solution to make styling easier, however the introduction of CSS-in-JS has shaken up the scene a little bit. Adopted widely and loved by some but hotly debated by others. With CSS-in-JS, the styling of components also moves into JavaScript to not break with the paradigm of component-based development. 
		But let's start with the basics and explore the topic bit by bit.
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
