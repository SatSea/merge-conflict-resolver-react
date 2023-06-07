import File from "../../../File";

const regexSearchConflicts = /(<<<<<<<[^(>>>>>>>)]*>>>>>>>.*)/g;
const regexConflict = /<<<<<<< [^\n]*\n([\s\S]*)\n=======\n([\s\S]*)>>>>>>>[^\n]*/m;

export enum ConflictState {
	None,
	Conflicted,
	Resolved,
}

export enum Select {
	None,
	New,
	Previous,
}

export class Conflict {
	private _state: ConflictState;
	private _selected: Select = Select.None;
	private _topPart?: string;
	private _bottomPart?: string;
	private _callback: ((state: ConflictState) => void)[] = [];

	constructor(private _content: string) {
		this._state = regexSearchConflicts.test(_content) ? ConflictState.Conflicted : ConflictState.None;

		if (this._state === ConflictState.Conflicted) {
			this._parseParts();
		}
	}

	public onResolve(callback: (state: ConflictState) => void) {
		this._callback.push(callback);
	}

	private _parseParts() {
		const parsedConflict = regexConflict.exec(this._content);
		this._topPart = parsedConflict?.[1];
		this._bottomPart = parsedConflict?.[2];
	}

	public get conflicted() {
		return this._state === ConflictState.Conflicted;
	}

	public get resolved() {
		return this._state === ConflictState.Resolved;
	}

	public get state() {
		return this._state;
	}

	public unresolve() {
		if (this._state !== ConflictState.Resolved) return this._state;
		this._state = ConflictState.Conflicted;
		this._selected = Select.None;
		this._callback.forEach((f) => f(this.state));
		return this._state;
	}

	public resolve(select: Select) {
		if (this._state === ConflictState.None) return this._state;
		this._selected = select;
		this._state = select === Select.None ? ConflictState.Conflicted : ConflictState.Resolved;
		this._callback.forEach((f) => f(this.state));
		return this._state;
	}

	public build(): string | undefined {
		if (this._state === ConflictState.Conflicted) return;
		if (this._state === ConflictState.None) return this._content;
		if (this._selected === Select.New) return this._new;
		if (this._selected === Select.Previous) return this._previous;
	}

	public get content() {
		return this._content;
	}

	public get conflictedParts() {
		return { topPart: this._topPart, bottomPart: this._bottomPart };
	}

	private get _new() {
		return this._topPart;
	}

	private get _previous() {
		return this._bottomPart;
	}
}

export default class ConflictResolver {
	private _parts: Conflict[];

	constructor(private _file: File) {
		this._parts = this._parse();
	}

	public conflicts(all?: boolean): Conflict[] {
		return this._parts.filter((x) => x.conflicted || all);
	}

	public resolved(): boolean {
		return this._parts.every((x) => !x.conflicted);
	}

	public build(): string | undefined {
		if (!this.resolved()) return;
		return this._parts.reduce((result, conflict) => result.concat(conflict.build() ?? ""), "");
	}

	private _parse() {
		return this._file.content.split(regexSearchConflicts).map((parsed) => new Conflict(parsed));
	}

	public get name() {
		return this._file.name;
	}
}
