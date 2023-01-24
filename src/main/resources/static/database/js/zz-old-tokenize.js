// TODO implement parsing comment
class RangeRules {
	static SL_C = RangeRules.set("//", "\n", false);
	static SL_BASH = RangeRules.set("#", "\n", false);
	static SL_SQL = RangeRules.set("--", "\n", false);
	static ML_C = RangeRules.set("/*", "*/", true);
	static ML_XML = RangeRules.set("<!--", "-->", true);

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
}

class Token {

	/*statics*/
	static #symbol = ["+", "-", "*", "/", "|", "&", "!", "%", "=",
		"+=", "-=", "*=", "/=", "%=", "!=", "->", "|=", "&=", "&&", "||", "++", "--", ";"];
	static #enclose = ["[", "]", "{", "}", "(", ")"];
	static #whitespace = [" ", "\t", "\n", "\r"];

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
		return "<span style='" + this.#cssKey + "'>" + this.#token.encode() + "</span>"
	}

	static #getTokenByCount(strArr, length, index) {
		let ret = "";
		let end = index + length;
		for (; index < strArr.length && index < end; index++) {
			ret += strArr[index];
		}
		return { token: ret, index: index }
	}

	static #getIndividualIfRange(strArr, i, range) {
		let retMethod = function(token, index) {
			return { token: token, index: index };
		}
		let endLen = range.end.length;
		let start = this.#getTokenByCount(strArr, range.start.length, i);
		if (typeof start == "undefined") return;
		if (start.token == range.start) {
			let comment = start.token;
			for (i = i + start.token.length; i < strArr.length; i++) {
				let end = Token.#getTokenByCount(strArr, endLen, i);
				if (end.token == range.end) {
					if (range.addend) {
						comment += end.token;
						end.index--;
					} else {
						end.index -= endLen + 1;
					}
					return retMethod(comment, end.index);
				}
				comment += strArr[i];
			}
			return retMethod(comment, i);
		}
		return; // returning undefined;
	}

	static #getIfRange(strArr, index, tokenClass) {
		let rules = tokenClass.rangeRule();
		for (let i = 0; i < rules.length; i++) {
			let ret = Token.#getIndividualIfRange(strArr, index, rules[i]);
			if (typeof ret != "undefined") return ret;
		}
	}

	static Tokenize(str, tokenClass) {
		let strArr = str.split("");
		let currentToken = null;
		let start = null;
		for (let i = 0; i < strArr.length; i++) {
			let c = strArr[i];
			let cc = c;
			let newToken = null;

			let comment = Token.#getIfRange(strArr, i, tokenClass);
			let type = undefined;
			if (typeof comment != "undefined") {
				i = comment.index;
				cc = comment.token;
				type = TokenTypes.RANGE;
			} else if (c == "'" || c == '"') {
				let res = Token.#getQuote(strArr, i, c);
				cc = res.token;
				i = res.index;
				type = res.type;
			} else if (Token.#symbol.contains(c) && Token.#symbol.contains(strArr[i + 1])) {
				// got pair
				cc = c + strArr[i + 1];
				i++;
			} else if (Token.#whitespace.contains(c)) {
				// noope
			} else if (Token.#symbol.contains(c)) {
				// noope
			} else if (Token.#enclose.contains(c)) {
				// nope
			} else {
				let res = Token.#getWord(strArr, i);
				cc = res.token;
				i = res.index;
				if (cc == "\n") {
					type = TokenTypes.NEWLINE;
				} else if (Token.#whitespace.contains(cc)) {
					type = TokenTypes.WHITESPACE;
				} else if (typeof tokenClass.isNumber == "function" && tokenClass.isNumber(cc)) {
					type = TokenTypes.NUMBER;
				} else if (Token.IsNumber(cc)) {
					type = TokenTypes.NUMBER;
				}
			}

			newToken = Token.#getNewToken(cc, currentToken, type);
			if (currentToken == null) {
				start = newToken;
			} else currentToken.#next = newToken;
			currentToken = newToken;
		}
		return start;
	}

	static #getQuote(strArr, index) {
		let quote = strArr[index];
		let ret = quote;
		let i = index + 1;
		for (; i < strArr.length && strArr[i] != "\n"; i++) {
			ret += strArr[i];
			if (quote == strArr[i] && strArr[i - 1] != "\\") break;
		}

		return {
			index: i,
			token: ret,
			type: quote == '"' ? TokenTypes.DOUBLE : TokenTypes.SINGLE
		};
	}

	static #getWord(strArr, index) {
		let ret = strArr[index];
		let i = index + 1;
		for (; i < strArr.length; i++) {
			if (Token.#symbol.contains(strArr[i])) break;
			if (Token.#enclose.contains(strArr[i])) break;
			if (Token.#whitespace.contains(strArr[i])) break;
			ret += strArr[i];
		}
		return { index: i - 1, token: ret };
	}

	static #getNewToken(str, prev, type) {
		let ret = new Token();
		ret.#token = str;
		ret.#prev = prev;
		ret.#type = type;
		return ret;
	}



	static IsNumber(token) {
		if (token.match(/^[0-9.]$/)) {
			token = token.slice(0, -1);
		}

		if (token.match(/^\s+$/)) return false;
		token = Number(token);
		return !isNaN(token);
	}

}


