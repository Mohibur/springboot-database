class DivEditor {
	#commonid = $.makeid();
	#browserType = $.ua();
	#parentDiv = null;
	#lineDiv = null;
	#editorDiv = null;

	constructor(selector) {
		this.#parentDiv = $(selector);
		this.#lineDiv = this.#parentDiv.mk("div").cls(`line-div-${this.#commonid}`);
		this.#lineDiv.html("1.");
		this.#editorDiv = this.#parentDiv.mk("div").cls(`editor-div-${this.#commonid}`).editable(true).id("editor");
		this.#setClass();
		this.#configureEditor();
	}

	fireFox() {
		let count = this.#editorDiv.get().childNodes.length;
		console.log(count)
		let index = "1.";
		for (let i = 2; i <= count; i++) {
			index += "<br>" + i + ".";
		}
		return index;
	}

	#configureEditor() {
		// setting position lineDiv
		let rect = this.#editorDiv.rect();
		this.#lineDiv.css("left", (rect.left + 1) + "px").css("top", (rect.top + 1) + "px");

		this.#editorDiv.on("paste", function(obj) {
			return function() {
				setTimeout(function() {
					return function() {
						obj.simplifyPastedText();
						obj.#firefoxPostPasteEvent();
						obj.#browserSpecificLineProcess()

					}
				}(this), 0);
			}
		}(this))
		this.#editorDiv.on("input", function(obj) {
			return function(/*e*/) {
				obj.#browserSpecificLineProcess();
			}
		}(this))
	}

	#browserSpecificLineProcess() {
		let numbers = "";
		if (this.#browserType == "firefox")
			numbers = this.fireFox();
		else if (this.#browserType == "chrome")
			numbers = this.fireFox();
		else numbers = this.fireFox();

		this.#lineDiv.html(numbers);
	}

	simplifyPastedText() {
		let nodes = this.#simplify(this.#editorDiv.get());
		let html = "";

		nodes.each(n => {
			let content = n.textContent == "" ? "<br>" : n.textContent;
			html += "<div>" + content + "</div>"
		})
		this.#editorDiv.html(html);
	}

	#simplify(elem) {
		let nodes = [...elem.childNodes];
		let ret = [];
		for (let i = 0; i < nodes.length; i++) {
			if (nodes[i].nodeName == "#text")
				ret.push(nodes[i])
			else if (nodes[i].nodeName == "BR") {
				ret.push(document.createTextNode(""));
			} {
				ret = ret.concat(this.#simplify(nodes[i]));
			}
		}
		return ret;
	}

	#firefoxPostPasteEvent() {
		let editor = this.#editorDiv.get();
		if (editor.childElementCount == 0) return;
		editor.innerHTML = $(editor).html().replaceAll(/(<br>)+/g, "<br>");
		var range = document.createRange();
		var sel = window.getSelection();
		var last = editor.childElementCount - 1;
		range.setStart(editor.childNodes[last], 1);
		range.collapse(true);
		sel.removeAllRanges()
		sel.addRange(range)
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
			}
			.editor-div-${this.#commonid}:focus {
				outline-width: 0;
			}
		`, `style-${this.commonid}`)
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
	html() {
		return this.#editorDiv.html();
	}
}
