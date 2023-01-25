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

class TokenTypes {
	static RANGE = "RANGE";
	static SINGLE = "SINGLE";
	static DOUBLE = "DOUBLE";
	static NUMBER = "NUMBER";
	static NEWLINE = "NEWLINE";
	static WHITESPACE = "WHITESPACE";
	static STARTEND = "STARTEND";
}

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

