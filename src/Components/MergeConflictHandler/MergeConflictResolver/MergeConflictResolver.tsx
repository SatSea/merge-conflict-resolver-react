import React, { useEffect, useState } from "react";
import Resolver from "./Resolver";
import { FileWithConflicts, Conflict } from "../FileTypes";

const MergeConflictResolver = ({
	fileWithConflict,
	onSomethingChanged,
}: {
	fileWithConflict: FileWithConflicts;
	onSomethingChanged: () => void;
}) => {
	return (
		<div className="">
			{fileWithConflict.content.map((file, index) =>
				file.type == "conflict" ? (
					<Resolver key={index} conflict={file as Conflict} onSomethingChanged={() => onSomethingChanged()} />
				) : (
					<div key={index} className="unconflictedString">
						{file.content}
					</div>
				)
			)}
		</div>
	);
};

export default MergeConflictResolver;
