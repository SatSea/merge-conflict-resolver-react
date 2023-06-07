import { useEffect, useState } from "react";
import { Conflict, Select, ConflictState } from "./ConflictResolver";

const Resolver = ({
	conflict,
}: {
	conflict: Conflict;
}) => {
	const [conflictState, setConflict] = useState(conflict.state);

	useEffect(() => {
		setConflict(conflict.state);
	}, [conflict]);

	if (conflictState === ConflictState.Resolved) {
		return (
			<div className="Resolved">
				<div className="ResolvedString">{conflict.build()}</div>
				<button
					onClick={() => {
						setConflict(conflict.unresolve());
					}}
				>
					Отменить
				</button>
			</div>
		);
	}
	const conflictedParts = conflict.conflictedParts;
	return (
		<div className="ConflictResolver">
			<div className="TopPartConflict" style={{ backgroundColor: "blue" }}>
				<button
					onClick={() => {
						setConflict(conflict.resolve(Select.New));
					}}
				>
					Выбрать верхнюю
				</button>
				<div className="ConflictedString">{conflictedParts.topPart}</div>
			</div>
			<div className="Separator">========</div>
			<div className="BottomPartConflict" style={{ backgroundColor: "pink" }}>
				<div className="ConflictedString">{conflictedParts.bottomPart}</div>
				<button
					onClick={() => {
						setConflict(conflict.resolve(Select.Previous));
					}}
				>
					Выбрать нижнюю
				</button>
			</div>
		</div>
	);
};

export default Resolver;
