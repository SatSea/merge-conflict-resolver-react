import { useEffect, useState } from "react";
import { Conflict } from "../FileTypes";

const regexForMergeConflicts = /<<<<<<< [^\n]*\n([\s\S]*)\n=======\n([\s\S]*)>>>>>>> [^\n]*/;

const Resolver = ({ conflict, onSomethingChanged }: { conflict: Conflict; onSomethingChanged: () => void }) => {
	const [conflictState, setConflict] = useState(conflict);

	useEffect(() => {
		console.log("something changed");
		setConflict(conflict);
		onSomethingChanged();
	}, [conflict.resolved]);

	if (conflictState.resolved) {
		return (
			<div className="Resolved">
				<div className="ResolvedString">{conflict.isTopPart ? conflict.topPart : conflict.bottomPart}</div>
				<button
					onClick={() => {
						conflict.resolved = false;
						setConflict({ ...conflict });
					}}
				>
					Отменить
				</button>
			</div>
		);
	}

	[conflict.topPart, conflict.bottomPart] = regexForMergeConflicts.exec(conflict.content)!.slice(1);

	return (
		<div className="ConflictResolver">
			<div className="TopPartConflict" style={{ backgroundColor: "blue" }}>
				<button
					onClick={() => {
						conflict.isTopPart = true;
						conflict.resolved = true;
						setConflict({ ...conflict });
					}}
				>
					Выбрать верхнюю
				</button>
				<div className="ConflictedString">{conflict.topPart}</div>
			</div>
			<div className="Separator">========</div>
			<div className="BottomPartConflict" style={{ backgroundColor: "pink" }}>
				<div className="ConflictedString">{conflict.bottomPart}</div>
				<button
					onClick={() => {
						conflict.isTopPart = false;
						conflict.resolved = true;
						setConflict({ ...conflict });
					}}
				>
					Выбрать нижнюю
				</button>
			</div>
		</div>
	);
};

export default Resolver;
