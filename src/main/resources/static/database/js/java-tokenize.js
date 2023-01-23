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
		CSS: "color:blue; font-weight:bold;",
		KW: ["int", "long", "var", "float", "double", "String", "null", "class"],
		TYPE: "PRIMITIVE"
	};
	// static, final
	static #modifire = {
		CSS: "color:blue; font-weight:bold;",
		KW: ["static", "final"],
		TYPE: "MODIFIRE"
	};

	// public, private, protectd
	static #visibility = {
		CSS: "color:blue; font-weight:bold;",
		KW: ["public", "private", "protected"],
		TYPE: "VISIBILITY"
	};

	static #symbol = {
		CSS: "color:#2d0400;",
		KW: ["+", "-", "*", "/", "|", "&", "!", "%", "=",
			"+=", "-=", "*=", "/=", "%=", "!=", "->", "|=", "&=", "&&", "||", "++", "--", ";"],
		TYPE: "SYMBOL"
	};

	// general variables
	static #variable = {
		CSS: "color:black;",
		TYPE: "VARIABLE"
	};

	static #double = {
		KW: '"',
		CSS: "color:#2d0aff;",
		TYPE: "DOUBLEQUOTE"
	};
	static #single = {
		KW: "'",
		CSS: "color:#3f8f3f;",
		TYPE: "SINGLEQUOTE"
	}

	static #number = {
		CSS: "color:gold;",
		TYPE: "NUMBER"
	}

	static #enclose = {
		KW: ["[", "]", "{", "}", "(", ")"],
		CSS: "color:#200410;",
		TYPE: "ENCLOSE"
	}

	static #whitespace = {
		KW: [" ", "\t", "\n", "\r"],
		CSS: "",
		TYPE: "WHITESPACE"
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

	static #isNumber(token) {
		if (token.match(/^[0-9.]+[fdl]$/)) {
			token = token.slice(0, -1);
		}
		if (token.match(/^\s+$/)) return false;
		token = Number(token);
		return !isNaN(token);
	}

	static #setCssKey(tokenObj) {
		if (tokenObj.type() == JavaTokenClass.#comment.TYPE) {
			tokenObj.cssKey(JavaTokenClass.#comment.CSS);
		} else if (JavaTokenClass.#isNumber(tokenObj.token())) {
			// import, package
			tokenObj.cssKey(JavaTokenClass.#number.CSS);
			tokenObj.type(JavaTokenClass.#number.TYPE);
		} else if (tokenObj.token() == JavaTokenClass.#dot.KW) {
			tokenObj.cssKey(JavaTokenClass.#dot.CSS);
			tokenObj.type(JavaTokenClass.#dot.TYPE);
		} else if (tokenObj.token().startsWith(JavaTokenClass.#single.KW)) {
			tokenObj.cssKey(JavaTokenClass.#single.CSS);
			tokenObj.type(JavaTokenClass.#single.TYPE);
		} else if (tokenObj.token().startsWith(JavaTokenClass.#double.KW)) {
			tokenObj.cssKey(JavaTokenClass.#double.CSS);
			tokenObj.type(JavaTokenClass.#double.TYPE);
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
		} else if (tokenObj.token().match(/^\s+$/)) {
			tokenObj.cssKey(JavaTokenClass.#whitespace.CSS);
			tokenObj.type(JavaTokenClass.#whitespace.TYPE);
		} else if (tokenObj.token().startsWith(JavaTokenClass.#annotation.KW)) {
			tokenObj.cssKey(JavaTokenClass.#annotation.CSS);
			tokenObj.type(JavaTokenClass.#annotation.TYPE);
		} else {
			tokenObj.cssKey(JavaTokenClass.#variable.CSS);
			tokenObj.type(JavaTokenClass.#variable.TYPE);
		}
	}

	commentRule() {
		return [CommentRules.SL_C, CommentRules.ML_C];
	}

	construct(tokens) {
		let token = tokens;
		while (token != null) {
			JavaTokenClass.#setCssKey(token);
			token = token.next();
		}
	}
}
