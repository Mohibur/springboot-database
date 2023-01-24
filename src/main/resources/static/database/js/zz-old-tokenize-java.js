class JavaTokenClass {
	// import, package
	static #package = {
		CSS: "color:#7f0055; font-weight:bold;",
		KW: ["import", "package"],
		TYPE: "PACKAGE"
	};

	static #comment = {
		CSS: "color:#117311;",
		KW: [],
		TYPE: "COMMENT"
	};


	static #primitive = {
		CSS: "color:blue;",
		KW: ["int", "long", "var", "float", "double", "String", "null", "class"],
		TYPE: "PRIMITIVE"
	};
	// static, final
	static #modifire = {
		CSS: "color:blue;",
		KW: ["static", "final"],
		TYPE: "MODIFIRE"
	};

	// public, private, protectd
	static #visibility = {
		CSS: "color: #000088;",
		KW: ["public", "private", "protected"],
		TYPE: "VISIBILITY"
	};

	static #symbol = {
		CSS: "color: #68977d;",
		KW: ["+", "-", "*", "/", "|", "&", "!", "%", "=",
			"+=", "-=", "*=", "/=", "%=", "!=", "->", "|=", "&=", "&&", "||", "++", "--", ";"],
		TYPE: "SYMBOL"
	};

	// general variables
	static #variable = {
		CSS: "color: #000000;",
		TYPE: "VARIABLE"
	};

	static #double = {
		KW: '"',
		CSS: "color: #2d0aff;",
		TYPE: TokenTypes.DOUBLE
	};
	static #single = {
		KW: "'",
		CSS: "color:#3f8f3f;",
		TYPE: TokenTypes.SINGLE
	}

	static #number = {
		CSS: "color: #847006;",
		TYPE: TokenTypes.NUMBER
	}

	static #enclose = {
		KW: ["[", "]", "{", "}", "(", ")"],
		CSS: "color:#570026;",
		TYPE: "ENCLOSE"
	}

	static #whitespace = {
		KW: [" ", "\t", "\n", "\r"],
		CSS: "",
		TYPE: TokenTypes.WHITESPACE
	}

	static #dot = {
		KW: ".",
		CSS: "color:black;",
		TYPE: "DOT"
	}

	static #annotation = {
		CSS: "color: gray;",
		KW: "@",
		TYPE: "DOT"
	}

	static #setCssKey(tokenObj) {
		if (tokenObj.type() == TokenTypes.RANGE) {
			tokenObj.cssKey(JavaTokenClass.#comment.CSS);
			tokenObj.type(JavaTokenClass.#comment.TYPE);
		} else if (tokenObj.type() == TokenTypes.NUMBER) {
			tokenObj.cssKey(JavaTokenClass.#number.CSS);
			tokenObj.type(JavaTokenClass.#number.TYPE);
		} else if (tokenObj.token() == JavaTokenClass.#dot.KW) {
			tokenObj.cssKey(JavaTokenClass.#dot.CSS);
			tokenObj.type(JavaTokenClass.#dot.TYPE);
		} else if (tokenObj.type() == TokenTypes.SINGLE) {
			tokenObj.cssKey(JavaTokenClass.#single.CSS);
		} else if (tokenObj.type() == TokenTypes.DOUBLE) {
			tokenObj.cssKey(JavaTokenClass.#double.CSS);
		} else if (JavaTokenClass.#package.KW.contains(tokenObj.token())) {
			tokenObj.cssKey(JavaTokenClass.#package.CSS);
			tokenObj.type(JavaTokenClass.#package.TYPE);
		} else if (JavaTokenClass.#primitive.KW.contains(tokenObj.token())) {
			tokenObj.cssKey(JavaTokenClass.#primitive.CSS);
			tokenObj.type(JavaTokenClass.#primitive.TYPE);
		} else if (JavaTokenClass.#modifire.KW.contains(tokenObj.token())) {
			tokenObj.cssKey(JavaTokenClass.#modifire.CSS);
			tokenObj.type(JavaTokenClass.#modifire.TYPE);
		} else if (JavaTokenClass.#visibility.KW.contains(tokenObj.token())) {
			tokenObj.cssKey(JavaTokenClass.#visibility.CSS);
			tokenObj.type(JavaTokenClass.#visibility.TYPE);
		} else if (JavaTokenClass.#symbol.KW.contains(tokenObj.token())) {
			tokenObj.cssKey(JavaTokenClass.#symbol.CSS);
			tokenObj.type(JavaTokenClass.#symbol.TYPE);
		} else if (JavaTokenClass.#enclose.KW.contains(tokenObj.token())) {
			tokenObj.cssKey(JavaTokenClass.#enclose.CSS);
			tokenObj.type(JavaTokenClass.#enclose.TYPE);
		} else if (tokenObj.type() == TokenTypes.WHITESPACE) {
			tokenObj.cssKey(JavaTokenClass.#whitespace.CSS);
		} else if (tokenObj.token().startsWith(JavaTokenClass.#annotation.KW)) {
			tokenObj.cssKey(JavaTokenClass.#annotation.CSS);
			tokenObj.type(JavaTokenClass.#annotation.TYPE);
		} else {
			tokenObj.cssKey(JavaTokenClass.#variable.CSS);
			tokenObj.type(JavaTokenClass.#variable.TYPE);
		}
	}

	rangeRule() {
		return [RangeRules.SL_C, RangeRules.ML_C];
	}

	construct(tokens) {
		let token = tokens;
		while (token != null) {
			JavaTokenClass.#setCssKey(token);
			token = token.next();
		}
	}

	isNumber(token) {
		if (token.match(/^[0-9.]+[fdl]$/)) {
			token = token.slice(0, -1);
		}
		if (token.match(/^\s+$/)) return false;
		token = Number(token);
		return !isNaN(token);
	}
}
