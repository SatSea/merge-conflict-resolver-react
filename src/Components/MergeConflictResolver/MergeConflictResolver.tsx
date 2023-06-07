import React, { useEffect, useState } from "react";
import ConflictResolver, { Conflict } from "./ConflictResolver";
import Resolver from "./Resolver";

const MergeConflictResolver = ({ fileWithConflict }: { fileWithConflict: ConflictResolver }) => {
	return (
		<div className="">
			{fileWithConflict.conflicts(true).map((file, idx) => {
				if (file.conflicted || file.resolved) {
					return <Resolver conflict={file} />;
				}
				return <div className="unconflictedString">{file.content}</div>;
			})}
		</div>
	);
};

export default MergeConflictResolver;
