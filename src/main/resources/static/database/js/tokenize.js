// TODO Fix range comment, miss behaving right now.
class RenderToken {
	/*
 * text: The text that would be parsed and rendered.
 * tokenClass: tokenClass must provide function construct
 *   whose job is guarantee all token has style set;
*/
	static ProcessTokens(text, tokenClass) {
		let tokens = new Tokenize(text, tokenClass).tokenize();
		let token = tokens;
		let line = "";
		while (token != null) {
			let r = RenderToken.#getNewLine(token);
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
		if (line == "") {
			line = "<div><br></div>";
		} else line = "<div>" + line + "</div>";
		return { line: line, token: token };
	}
}


class Tokenize {
	/*statics*/
	#symbol = ["+", "-", "*", "/", "|", "&", "!", "%", "=",
		"+=", "-=", "*=", "/=", "%=", "!=", "->", "|=", "&=", "&&", "||", "++", "--", ";"];
	#enclose = ["[", "]", "{", "}", "(", ")"];
	#whitespace = [" ", "\t", "\n", "\r"];
	#strArr = [];
	#tokenDef = null;

	constructor(string, tokenDef) {
		this.#strArr = string.split("");
		this.#tokenDef = $.undefToNull(tokenDef);
		return this;
	}

	addSymbol(chr) {
		this.#symbol = this.#symbol.concat(chr);
		return this;
	}

	#getTokenByCount(length, index) {
		let ret = "";
		let end = index + length;
		for (; index < this.#strArr.length && index < end; index++) {
			ret += this.#strArr[index];
		}
		return { token: ret, index: index }
	}

	#retMethod(token, index) {
		return { token: token, index: index };
	}

	#getIndividualIfRange(i, range) {
		let endLen = range.end.length;
		let start = this.#getTokenByCount(range.start.length, i);
		if (typeof start == "undefined") return;
		if (start.token == range.start) {
			let comment = start.token;
			for (i = i + start.token.length; i < this.#strArr.length; i++) {
				let end = this.#getTokenByCount(endLen, i);
				if (end.token == range.end) {
					if (range.addend) {
						comment += end.token;
						end.index--;
					} else {
						end.index -= endLen + 1;
					}
					return this.#retMethod(comment, end.index);
				}
				comment += this.#strArr[i];
			}
			return retMethod(comment, i);
		}
		return; // returning undefined;
	}

	#getIfRange(index) {
		if (this.#tokenDef == null) return;
		let rules = this.#tokenDef.range;
		for (let i = 0; i < rules.length; i++) {
			let ret = this.#getIndividualIfRange(index, rules[i].rule);
			if (typeof ret != "undefined") return ret;
		}
	}

	tokenize() {
		let currentToken = null;
		let start = null;
		for (let i = 0; i < this.#strArr.length; i++) {
			let c = this.#strArr[i];
			let cc = c;
			let newToken = null;

			let rangeText = this.#getIfRange(i);
			let type = undefined;
			if (typeof rangeText != "undefined") {
				i = rangeText.index;
				cc = rangeText.token;
			} else if (c == "'" || c == '"') {
				let res = this.#getQuote(i);
				cc = res.token;
				i = res.index;
				type = res.type;
			} else if (this.#symbol.contains(c) && this.#symbol.contains(this.#strArr[i + 1])) {
				// got pair
				cc = c + this.#strArr[i + 1];
				i++;
			} else if (this.#whitespace.contains(c)) {
				// noope
			} else if (this.#symbol.contains(c)) {
				// noope
			} else if (this.#enclose.contains(c)) {
				// nope
			} else {
				let res = this.#getWord(i);
				cc = res.token;
				i = res.index;
			}
			if (!Array.isArray(cc)) {
				cc = [].concat(cc);
			}
			// adding each item
			cc.each(tok => {
				newToken = this.#getNewToken(tok, currentToken, type);
				if (currentToken == null) {
					start = newToken;
				} else currentToken.next(newToken);
				currentToken = newToken;
			})
		}
		return start;
	}

	#getQuote(index) {
		let arr = this.#strArr
		let quote = arr[index];
		let ret = quote;
		index++;
		for (; index < arr.length && arr[index] != "\n"; index++) {
			ret += arr[index];
			if (quote == arr[index] && arr[index - 1] != "\\") break;
		}

		return {
			index: index,
			token: ret,
			type: quote == '"' ? TokenTypes.DOUBLE : TokenTypes.SINGLE
		};
	}

	#getWord(index) {
		let word = this.#strArr[index];
		index++;
		for (; index < this.#strArr.length; index++) {
			let cc = this.#strArr[index];
			if (this.#symbol.contains(cc)) break;
			if (this.#enclose.contains(cc)) break;
			if (this.#whitespace.contains(cc)) break;
			word += cc;
		}
		// WORKING HERE
		if (Tokenize.isNumber(word)) {
			word = [].concat(word);
		} else {
			word = word.split(/(\.)/g)
		}
		return { index: index - 1, token: word };
	}

	#getNewToken(str, prev, type) {
		let ret = new Token();
		ret.token(str);
		ret.prev(prev);
		ret.next(null);
		ret.type(type);
		this.#setCssAndType(ret);
		return ret;
	}

	#setCssAndType(token) {
		if (this.#tokenDef == null) return;
		let td = this.#tokenDef;
		let str = token.token();
		// match single
		if (token.type() == TokenTypes.SINGLE && typeof td.single != "undefined") {
			token.cssKey(td.single.css);
			return;
		}

		// match double
		if (token.type() == TokenTypes.DOUBLE && typeof td.double != "undefined") {
			token.cssKey(td.double.css);
			return;
		}

		// match if part of range
		for (let i = 0; typeof td.range != "undefined" && i < td.range.length; i++) {
			let r = td.range[i]
			if (str.startsWith(r.rule.start)) {
				// no need to check end
				token.type(TokenTypes.RANGE);
				token.cssKey(r.css);
				return;
			}
		}

		// check if number
		let numberf;
		if (typeof td.number == "object" && typeof td.number.rule == "function") {
			numberf = td.number.rule;
		} else {
			numberf = Tokenize.isNumber;
		}
		if (numberf(str)) {
			token.type(TokenTypes.NUMBER);
			token.cssKey(td.number.css);
			return;
		}
		// check if there is any startsWith and EndsWith check is there
		// similar yet seperate to range
		if (typeof td.startEnd != "undefined") {
			for (let i = 0; i < td.startEnd.length; i++) {
				let se = td.startEnd[i];
				if ((typeof se.startsWith == "undefined" || str.startsWith(se.startsWith)) && (typeof se.endsWith == "undefined" || str.startsWith(se.endsWith))) {
					token.type(se.type);
					token.cssKey(se.css);
					return;
				}
			}
		}

		// pattern match
		if (typeof td.matches != "undefined") {
			for (let i = 0; i < td.matches.length; i++) {
				if (td.matches[i].rule == "equal" && td.matches[i].match == str) {
					token.type(td.matches[i].type);
					token.cssKey(td.matches[i].css);
					return;
				}
				if (td.matches[i].rule == "regexp" && str.matchAll(td.matches[i].match)) {
					token.type(td.matches[i].type);
					token.cssKey(td.matches[i].css);
					return;
				}
			}
		}
		// keyword match
		if (typeof td.contains != "undefined") {
			for (let i = 0; i < td.contains.length; i++) {
				let strmatch = str;
				if ($.isTrue(td.contains[i].anycase)) strmatch = strmatch.toUpperCase();
				if (td.contains[i].kw.contains(strmatch)) {
					token.type(td.contains[i].type); // not mandatory
					token.cssKey(td.contains[i].css);
					return;
				}
			}
		}

		// rest of the shit
		if (typeof td.rest != "undefined") {
			token.type(td.rest.type);
			token.cssKey(td.rest.css);
		}
	}



	static isNumber(token) {
		if (token.match(/^[0-9.]$/)) {
			token = token.slice(0, -1);
		}

		if (token.match(/^\s+$/)) return false;
		token = Number(token);
		return !isNaN(token);
	}
}
