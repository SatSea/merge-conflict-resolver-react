import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import File from "./File";

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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	//<React.StrictMode>
	<App rawFiles={rawFiles} />
	//</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
