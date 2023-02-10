// TODO implement parsing comment
class RangeRules {
	static SL_C = RangeRules.set("//", "\n", false);
	static SL_BASH = RangeRules.set("#", "\n", false);
	static SL_SQL = RangeRules.set("--", "\n", false);
	static ML_C = RangeRules.set("/*", "*/", true);
	static ML_XML = RangeRules.set("<!--", "-->", true);
	static ML_JAVA = RangeRules.set("\"\"\"", "\"\"\"", true);

	static set(start, end, addend) {
		return { start: start, end: end, addend: addend };
	}
}

const TokenTypes = {}

Object.defineProperties(TokenTypes, {
	RANGE: { value: "RANGE", writable: false },
	SINGLE: { value: "SINGLE", writable: false },
	DOUBLE: { value: "DOUBLE", writable: false },
	NUMBER: { value: "NUMBER", writable: false },
	NEWLINE: { value: "NEWLINE", writable: false },
	WHITESPACE: { value: "WHITESPACE", writable: false },
	STARTEND: { value: "STARTEND", writable: false },
	MULTILINE: { value: "MULTILINE", writable: false },
	RANGE: { value: "RANGE", writable: false }
});

class Token {
	#token;
	#type;
	#cssKey;
	// previous token
	#prev;
	// next token 
	#next;

	constructor() {
		this.#prev = null;
		this.#prev = null;
		return this;
	}

	prev(prev) {
		if (typeof prev == "undefined") return this.#prev;
		this.#prev = prev;
		return this;
	}

	next(next) {
		if (typeof next == "undefined") return this.#next;
		this.#next = next;
		return this;
	}

	token(token) {
		if (typeof token == "undefined") return this.#token;
		this.#token = token;
		return this;
	}

	type(type) {
		if (typeof type == "undefined") return this.#type;
		this.#type = type;
		return this;
	}

	cssKey(cssKey) {
		if (typeof cssKey == "undefined") return this.#cssKey;
		this.#cssKey = cssKey;
		return this;
	}

	tokenSpan() {
		return "<span style='" + this.#cssKey + "'>" + this.#token.encode().replaceAll(/\n/g, "<br/>") + "</span>"
	}
}

