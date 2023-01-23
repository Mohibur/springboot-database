class DivStyle {
	#commonid = $.makeid();
	#parentDiv = null;
	#lineDiv = null;
	#editorDiv = null;

	constructor(selector) {
		this.#parentDiv = $(selector);
		this.#lineDiv = this.#parentDiv.mk("div").cls(`line-div-${this.#commonid}`).html("1.");
		this.#editorDiv = this.#parentDiv.mk("div").cls(`editor-div-${this.#commonid}`).editable(false);
		this.#setClass();
		this.#configureEditor();
	}

	#setClass() {
		$.addStyle(`
			.line-div-${this.#commonid} {
				width: 30px;
				position: absolute;
				height: 394px;
				background: #afafaf;
				padding:3px;
				text-align: right;
				font-size: 12px;
				line-height: 16px;
				overflow-y: hidden;
			}

			.editor-div-${this.#commonid} {
				border: 1px solid black;
				float: left;
				height: 400px;
				width: 430px;
				/*line-div width + 6 (padding 3+3) + 2*/
				padding-left: 39px;
				overflow-wrap: anywhere;
				font-size: 12px;
				line-height: 16px;
				overflow-y: scroll;
			}
			.editor-div-${this.#commonid}:focus {
				outline-width: 0;
			}
		`, `style-${this.commonid}`)
	}

	#configureEditor() {
		// setting position lineDiv
		let rect = this.#editorDiv.rect();
		this.#lineDiv.css("left", (rect.left + 1) + "px").css("top", (rect.top + 1) + "px");
		this.#editorDiv.on('scroll', () => {
			this.#lineDiv.scrollTop(this.#editorDiv.scrollTop());
		});
	}

	setWidth(width) {
		this.#editorDiv.css("width", parseFloat(width) + "px");
		return this;
	}


	setHeight(height) {
		height = parseFloat(height);
		this.#lineDiv.css("height", (height - 6) + "px");
		this.#editorDiv.css("height", height + "px");
	}

	setFontSize(size) {
		size = parseFloat(size);
		this.#lineDiv.css("font-size", size + "px");
		this.#editorDiv.css("font-size", size + "px");
	}

	setLineHeight(height) {
		height = parseFloat(height);
		this.#lineDiv.css("line-height", height + "px");
		this.#editorDiv.css("line-height", height + "px");
	}

	#setLine() {
		let count = this.#editorDiv.text().split("\n").length;
		let text = "1.";
		for (let k = 2; k < count; k++) {
			text += "<br>" + k + ".";
		}
		this.#lineDiv.html(text);
		return this;
	}

	html() {
		return this.#editorDiv.html();
	}

	text() {
		return this.#editorDiv.text();
	}

	setText(text, tokenClass) {
		this.#editorDiv.html(Token.ProcessTokens(text, tokenClass));
		this.#setLine();
		return this;
	}
}
