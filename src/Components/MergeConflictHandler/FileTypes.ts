export interface Part {
	content: string;
	type: "normal" | "conflict" ;
}

export interface Normal extends Part {
	type: "normal";
}

export interface Conflict extends Part {
	type: "conflict";
	resolved?: boolean;
	isTopPart?: boolean;
	topPart?: string;
	bottomPart?: string;
}

export interface FileWithConflicts {
	name: string;
	content: Part[];
}
