import { useEffect, useState } from "react";
import { Conflict } from "../FileTypes";
import Button from "../Button/Button";
import { ButtonStyle } from "../Button/ButtonStyle";

const regexForMergeConflicts = /<<<<<<< [^\n]*\n([\s\S]*)\n=======\n([\s\S]*)>>>>>>> [^\n]*/;

const Resolver = ({ conflict, onSomethingChanged }: { conflict: Conflict; onSomethingChanged: () => void }) => {
	const [conflictState, setConflict] = useState(conflict);

	useEffect(() => {
		setConflict(conflict);
		onSomethingChanged();
	}, [conflict.resolved]);

	if (conflictState.resolved) {
		return (
			<div className="Resolved">
				<pre className={"ResolvedString " + (conflict.isTopPart ? "TopMerge" : "BottomMerge")}>
					{conflict.isTopPart ? conflict.topPart : conflict.bottomPart}
				</pre>
				<Button
						style={conflict.isTopPart ? ButtonStyle.topMerge: ButtonStyle.BottomMerge}
						onClick={() => {
							conflict.resolved = false;
							setConflict({ ...conflict });
						}}
					>
						Отменить
					</Button>
			</div>
		);
	}

	[conflict.topPart, conflict.bottomPart] = regexForMergeConflicts.exec(conflict.content)!.slice(1);

	return (
		<div className="ConflictResolver">
			<div className="TopPartConflict">
				<div className="ConflictButtonContainer">
					<Button
						style={ButtonStyle.topMerge}
						onClick={() => {
							conflict.isTopPart = true;
							conflict.resolved = true;
							setConflict({ ...conflict });
						}}
					>
						Use me
					</Button>
				</div>
				<pre className="ConflictedString">{conflict.topPart}</pre>
			</div>
			<div className="Separator"></div>
			<div className="BottomPartConflict">
				<pre className="ConflictedString">{conflict.bottomPart}</pre>
				<div className="ConflictButtonContainer">
					<Button
						style={ButtonStyle.BottomMerge}
						onClick={() => {
							conflict.isTopPart = false;
							conflict.resolved = true;
							setConflict({ ...conflict });
						}}
					>
						Use me
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Resolver;
