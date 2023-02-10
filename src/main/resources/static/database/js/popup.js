"use strict";
class PopUpWindow {
	#blocker;
	#holderTable;
	#popup;
	#data;
	#commonid;
	#afterClose;
	#beforeClose;
	#caption;
	constructor(selector) {
		this.#commonid = $.makeid();
		this.#blockerClass()
		this.#blocker = document.body.mk("div");
		this.#blocker.Cls("blocker-class-" + this.#commonid);
		this.#popup = $(selector);
		this.createHeaderBlock();
		this.#beforeClose = function() { return true; };
		this.#afterClose = function() { };

		this.hide();
		return this;
	}

	#blockerClass() {
		$.addStyle(`
		.blocker-class-${this.#commonid} {
			display: none;
			left: 0px;
			top: 0px;
			background: #afafaf89;
			position: fixed;
		}
		.table-holder-class-${this.#commonid} {
			position: fixed;
			border: 1px solid #a8a8a8;
			border-radius: 5px;
			background: white;
		}
		.banner-class-${this.#commonid} {
			background: #afffafde;
			text-align: right;
			padding: 0px;
		}
		.close-button-class-${this.#commonid} {
			background: #afffafde;
			border: 0px;
			width: 24px;
			height: 24px;
			cursor: pointer;
			border-radius: 12px;
		}
		.close-button-class-${this.#commonid}:hover {
			border:1px solid #ececec;
			background: #dcdcdc;
			
		}
		.caption-class-${this.#commonid} {
			float: left;
			padding-left: 5px;
			font-size: small;
			cursor: default;
			font-weight: bold;
			font-style: italic;
		}
		`, "a" + this.#commonid);
	}

	data(data) {
		if (typeof data == "undefined")
			return this.#data;
		else this.#data = data;
		return this;
	}

	createHeaderBlock() {
		this.#holderTable = this.#blocker.mk("table").Cls("table-holder-class-" + this.#commonid);
		let banner = this.#holderTable.row().cell();
		banner.Cls("banner-class-" + this.#commonid);
		this.#caption = banner.mk("div").Cls("caption-class-" + this.#commonid);
		let closeButton = banner.mk("button").Cls("close-button-class-" + this.#commonid).html("x");
		closeButton.click(function(obj) {
			return function() {
				obj.#beforeClose();
				obj.hide();
				obj.#afterClose();
			}
		}(this));
		this.#holderTable.Row().Cell().Append(this.#popup);
	}

	show(caption) {
		this.#blocker.css("height", $.docHeight() + "px");
		this.#blocker.css("width", $.docWidth() + "px");
		this.#popup.show();
		this.#blocker.show();
		this.caption(caption);
		let rect = this.#popup.rect();
		this.#holderTable.css("width", rect.width + "px");
		let closeRect = this.#holderTable.rect();
		this.#holderTable.css("top", Math.max((window.innerHeight - closeRect.height) / 3, 0) + "px");
		this.#holderTable.css("left", Math.max((window.innerWidth - closeRect.width) / 2, 0) + "px");
		return this;
	}

	caption(caption) {
		if (caption != undefined) {
			this.#caption.html(caption);
		}
		return this;
	}

	afterClose(f) {
		if (typeof f == "function") this.#afterClose = f;
	}
	beforeClose(f) {
		if (typeof f == "function") this.#beforeClose = f;
	}

	hide() {
		this.#blocker.hide();
	}

	close() {
		this.#blocker.hide();
	}
}
