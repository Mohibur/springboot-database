class RenderToken {
	/*
 * text: The text that would be parsed and rendered.
 * tokenClass: tokenClass must provide function construct
 *   whose job is guarantee all token has style set;
*/
	static ProcessTokens(text, tokenClass) {
		let tokens = Token.Tokenize(text, tokenClass);
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
