"use strict";
class PopUpWindow {
	#blocker;
	#holderTable;
	#popup;
	#data;
	#commonid;
	#afterClose;
	#beforeClose;
	constructor(selector) {
		this.#commonid = z.makeid();
		this.#blockerClass()
		this.#blocker = document.createElement("div");
		this.#blocker.className = "blocker-class-" + this.#commonid;
		this.#popup = document.querySelector(selector);
		this.#createCloseBlock();
		this.#blocker.appendChild(this.#holderTable);
		this.#beforeClose = function() { return true; };
		this.#afterClose = function() { };
		document.body.appendChild(this.#blocker);

		this.hide();
		return this;
	}

	#blockerClass() {
		z.addStyle(`
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
			background: #ffffffde;
			text-align: right;
			padding: 0px;
		}
		.close-button-class-${this.#commonid} {
			background: white;
			border: 0px;
			width: 24px;
			height: 24px;
			cursor: pointer;
			border-radius: 12px;
		}
		.close-button-class-${this.#commonid}:hover {
			background: white;
			border:1px solid #ececec;
			background: #dcdcdc;
			
		}
		`, this.#commonid);
	}

	data(data) {
		if (typeof data == "undefined")
			return this.#data;
		else this.#data = data;
		return this;
	}
	#createCloseBlock() {
		this.#holderTable = document.createElement("table");
		this.#holderTable.className = "table-holder-class-" + this.#commonid;
		let banner = this.#holderTable.insertRow().insertCell();
		banner.className = "banner-class-" + this.#commonid;
		let closeButton = document.createElement("button");
		closeButton.className = "close-button-class-" + this.#commonid;
		closeButton.innerHTML = "x";
		closeButton.onclick = function(obj) {
			return function() {
				if (!obj.#beforeClose()) return;
				obj.hide();
				obj.#afterClose();
			}
		}(this)
		banner.appendChild(closeButton);
		let popupRow = this.#holderTable.insertRow();
		popupRow.insertCell().appendChild(this.#popup);
	}
	#getBlockWindowHeight() {
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
	}

	#getBlockWindowWidth() {
		return Math.max(
			document.body.scrollWidth, document.documentElement.scrollWidth,
			document.body.offsetWidth, document.documentElement.offsetWidth,
			document.body.clientWidth, document.documentElement.clientWidth
		);
	}
	show() {
		this.#blocker.style.height = this.#getBlockWindowHeight() + "px";
		this.#blocker.style.width = this.#getBlockWindowWidth() + "px";
		this.#popup.style.display = "block";
		this.#blocker.style.display = "block";
		let rect = this.#popup.getBoundingClientRect();
		this.#holderTable.style.width = rect.width + "px";
		let closeRect = this.#holderTable.getBoundingClientRect();
		this.#holderTable.style.top = Math.max((window.innerHeight - closeRect.height) / 2, 0) + "px";
		this.#holderTable.style.left = Math.max((window.innerWidth - closeRect.width) / 2, 0) + "px";
		return this;
	}

	afterClose(f) {
		this.#afterClose = f;
	}
	beforeClose(f) {
		this.#beforeClose = f;
	}

	hide() {
		this.#blocker.style.display = "none";
	}
}
