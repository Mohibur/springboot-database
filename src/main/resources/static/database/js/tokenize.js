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

	static Tokenize(str) {
		let strArr = str.split("");
		let currentToken = null;
		let start = null;
		for (let i = 0; i < strArr.length; i++) {
			let c = strArr[i];
			let cc = c;
			let newToken = null;
			if (c == "'" || c == '"') {
				let res = Token.#getQuote(strArr, i, c);
				cc = res.token;
				i = res.index;
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
			}

			newToken = Token.#getNewToken(cc, currentToken);
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
		return { index: i, token: ret };
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

	static #getNewToken(str, prev) {
		let ret = new Token();
		ret.#token = str;
		ret.#prev = prev;
		return ret;
	}


	/*
	 * text: The text that would be parsed and rendered.
	 * tokenClass: tokenClass must provide function construct
	 *   whose job is guarantee all token has style set;
	*/
	static ProcessTokens(text, tokenClass) {
		let tokens = Token.Tokenize(text);
		tokenClass.construct(tokens);

		let token = tokens;
		let line = "";
		while (token != null) {
			let r = Token.#getNewLine(token);
			line += r.line;
			token = r.token;
		}
		return line;
	}

	static #getNewLine(token) {
		let line = "";
		while (token != null) {
			if (token.token() == "\n") {
				token = token.next();
				break;
			}
			line += token.tokenSpan();
			token = token.next();
		}

		line = "<div>" + line + "</div>";
		return { line: line, token: token };
	}
}
