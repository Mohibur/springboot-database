"use strict";
////////////////////////
$ = {};
class ClassNotCreated {
	#message
	constructor(msg) {
		this.#message = msg;
	}
	toString() {
		return this.#message;
	}
}


class GeneralHTMLProcessor {
	static COMMONINPUTS = ["input", "select", "textarea", "button"];
	static DISPLAY_STYLE = {
		span: "inline",
		p: "block",
		div: "block",
		table: "table",
		caption: "table-caption",
		tfoot: "table-footer-group",
		thead: "table-header-group",
		tbody: "table-row-group",
		colgroup: "table-column-group",
		td: "table-cell",
		col: "table-column",
		tr: "table-row",
		li: "list-item",
		textarea: "inline-block",
		button: "inline",
		input: "inline"
	}
	#html;
	/*
		s = selector
		p = parent;
	*/
	constructor(s, p) {
		if (s instanceof GeneralHTMLProcessor) return s;
		if (s instanceof GeneralHTMLProcessorAll) return s;
		if (typeof p == "undefined") p = document;
		// if selector is string, we construct
		if (typeof s == "string") {
			let html = p.querySelectorAll(s);
			if (html == null || html.length == 0) return new ClassNotCreated("html element not found with following search key: " + s);
			if (html.length == 1) this.#html = html[0];
			else return new GeneralHTMLProcessorAll(s, p);
		} else this.#html = s;

		return this;
	}

	get() {
		return this.#html;
	}

	$(selector) { return new GeneralHTMLProcessor(selector, this.#html); }

	$$(selector) { return new GeneralHTMLProcessorAll(selector, this.#html); }

	child(tag) {
		return this.mk(tag);
	}

	tag() {
		return this.#html.tagName;
	}

	mk(tag) {
		let p = document.createElement(tag);
		this.#html.appendChild(p);
		return new GeneralHTMLProcessor(p);
	}

	rmChild(target) {
		return rm(target);
	}

	rm(target) {
		if (target instanceof GeneralHTMLProcessor) {
			this.#html.removeChild(target.#html);
		} else {
			this.#html.querySelectorAll(target).forEach(e => this.#html.removeChild(e));
		}
		return undefined;
	}

	id(v) {
		if (typeof v == "undefined") return this.#html.id;
		this.#html.id = v;
		return this;
	}

	isDisabled() {
		return this.#html.disabled === true || this.#html.disabled == "true";
	}

	editable(v) {
		if (typeof v == "undefined") return this.#html.contentEditable;
		this.#html.contentEditable = v;
		return this;
	}

	scrollLeft(v) {
		if (typeof v == "undefined") return this.#html.scrollLeft;
		this.#html.scrollLeft = v;
		return this;
	}

	scrollTop(v) {
		if (typeof v == "undefined") return this.#html.scrollTop;
		this.#html.scrollTop = v;
		return this;
	}

	setDisable(status) {
		let tagname = this.#html.tagName.toLowerCase();
		if (GeneralHTMLProcessor.COMMONINPUTS.contains(tagname))
			this.#html.disabled = status;
		else {
			this.each(GeneralHTMLProcessor.COMMONINPUTS.join(","), e => e.disabled = status);
		}
		return this;
	}

	disable() {
		return this.setDisable(true);
	}

	enable() {
		return this.setDisable(false);
	}

	check(status) {
		if (typeof status == "undefined") return this.#html.checked;
		this.#html.checked = status;
		return this;
	}

	checked() {
		return this.#html.checked === true;
	}

	childCount(find) {
		return this.#html.querySelectorAll(find).length;
	}

	name(v) {
		if (typeof v == "undefined") return this.#html.name;
		this.#html.name = v;
		return this;
	}

	html(v) {
		if (typeof v == "undefined") return this.#html.innerHTML;
		this.#html.innerHTML = v;
		return this;
	}
	outer() {
		if (typeof v == "undefined") return this.#html.innerHTML;
		this.#html.outerHTML = v;
		return this;
	}

	form(v) {
		if (this.#html[v] == null) return null;
		return new GeneralHTMLProcessor(this.#html[v]);
	}

	// event
	on(e, f) {
		if (typeof e != "string" || typeof f != "function") {
			throw "Unexpected input paramters. Expected: e('string', function(){})";
		}
		this.#html.addEventListener(e, f);
	}

	click(f) {
		if (typeof f != "function") throw "value have to be a function";
		this.#html.onclick = f;
		return this;
	}

	// event
	text(v) {
		if (typeof v == "undefined") return this.#html.innerText;
		this.#html.innerText = v;
		return this;
	}

	title(v) {
		if (typeof v == "undefined") return this.#html.title;
		this.#html.title = v;
		return this;
	}

	size(v) {
		if (typeof v == "undefined") return this.#html.size;
		this.#html.size = v;
		return this;
	}

	// single value
	css(s, v) {
		if (typeof v == "undefined") return this.#html.style[s];
		this.#html.style[s] = v;
		return this;
	}

	attr(a, v) {
		if (typeof v == "undefined") return this.#html.getAttribute(a);
		this.#html.setAttribute(a, v);
		return this;
	}

	val(v) {
		if (typeof v == "undefined") return this.#html.value;
		this.#html.value = v;
		return this;
	}

	src(v) {
		if (typeof v == "undefined") return this.#html.src;
		this.#html.src = v;
		return this;
	}

	rect() {
		return this.#html.getBoundingClientRect();
	}

	max(v) {
		if (typeof v == "undefined") return this.#html.max;
		this.#html.max = v;
		return this;
	}

	min(v) {
		if (typeof v == "undefined") return this.#html.min;
		this.#html.min = v;
		return this;
	}

	readOnly(v) {
		if (typeof v == "undefined") return this.#html.readOnly;
		this.#html.readOnly = v;
		return this;
	}

	type(v) {
		if (typeof v == "undefined") return this.#html.type;
		this.#html.type = v;
		return this;
	}

	hasCls(cls) { return this.#html.classList.contains(cls); }

	toggoleCls(cls) {
		if (this.#html.classList.contains(cls)) this.#html.classList.remove(cls);
		else this.#html.classList.add(cls);
		return this;
	}

	cls(v) {
		if (typeof v == "undefined") return this.#html.className;
		this.#html.className = "";
		this.addCls(v);
		return this;
	}

	addCls(v) {
		if (typeof v == "undefined" || v == null || v == "") return this;
		let html = this.#html;
		[].concat(v).forEach(e => html.classList.add(e))
		return this;
	}

	rmCls(v) {
		return this.removeCls(v);
	}

	removeCls(v) {
		if (typeof v == "undefined") return this;
		[].concat(v).forEach(e => this.#html.classList.remove(e));

		return this;
	}

	data(name, data) {
		if (typeof data == "undefined") return this.#html[name];
		this.#html[name] = data;
		return this;
	}

	hide() {
		this.#html.style.display = "none";
		return this;
	}

	show() {
		this.#html.style.display = GeneralHTMLProcessor.DISPLAY_STYLE[this.#html.tagName.toLowerCase()];
		return this;
	}

	target(v) {
		if (typeof v == "undefined") return this.#html.target;
		this.#html.target = v;
		return this;
	}



	//\\ Form specific
	action(v) {
		if (typeof v == "undefined") return this.#html.action;
		this.#html.action = v;
		return this;
	}

	method(v) {
		if (typeof v == "undefined") return this.#html.method;
		this.#html.method = v;
		return this;
	}

	submit() {
		this.#html.submit();
	}

	//\\ Table specific
	// if index is undefined, new row will be inserted. 
	// if index is defined, row will be returned;
	// i have to be integer
	row(i) {
		if (typeof i != "undefined") return new GeneralHTMLProcessor(this.#html.rows[i]);
		else if (this.#html instanceof HTMLTableElement || this.#html instanceof HTMLTableSectionElement)
			return new GeneralHTMLProcessor(this.#html.insertRow());
		return undefined;
	}

	rowIndex() {
		if (this.#html instanceof HTMLTableRowElement)
			return this.#html.rowIndex;
		return undefined;
	}

	cellIndex() {
		if (this.#html instanceof HTMLTableCellElement)
			return this.#html.cellIndex;
		return undefined;
	}
	at(i) {
		if (this.#html instanceof HTMLTableRowElement) {
			return new GeneralHTMLProcessor(this.#html.cells[i]);
		}
		if (this.#html instanceof HTMLTableCaptionElement) {
			return new GeneralHTMLProcessor(this.#html.rows[i]);
		}
	}
	index(i) {
		if (typeof i == "undefined") {
			if (this.#html instanceof HTMLTableRowElement)
				return this.#html.rowIndex;
			if (this.#html instanceof HTMLTableCellElement)
				return this.#html.cellIndex;
		} else {
			return this.at(i);
		}
		return undefined;
	}

	// if index is undefined, new row will be inserted. 
	// if index is defined, row will be returned;
	cell(i) {
		if (typeof i != "undefined") return new GeneralHTMLProcessor(this.#html.cells[i]);
		else if (this.#html instanceof HTMLTableRowElement) return new GeneralHTMLProcessor(this.#html.insertCell());
		return undefined;
	}

	caption() {
		if (this.#html instanceof HTMLTableElement) return new GeneralHTMLProcessor(this.#html.createCaption());
		return undefined;
	}

	tbody(i) {
		if (typeof i != "undefined") return new GeneralHTMLProcessor(this.#html.tBodies[i]);
		else if (this.#html instanceof HTMLTableElement)
			return new GeneralHTMLProcessor(this.#html.createTBody());
		return undefined;
	}

	thead() {
		if (this.#html instanceof HTMLTableElement)
			return new GeneralHTMLProcessor(this.#html.createTHead());
		return undefined;
	}

	tfoot() {
		if (this.#html instanceof HTMLTableElement)
			return new GeneralHTMLProcessor(this.#html.createTFoot());
		return undefined;
	}

	colSpan(v) {
		if (typeof v == "undefined") return this.#html.colSpan;
		this.#html.colSpan = v;
		return this;
	}

	each(find, f) {
		if (typeof find == "function") {
			[...this.#html.childNodes].each((e, i) => find($(e), i));
			return;
		}

		this.$$(find, this.#html).each((e, i) => f($(e), i));
		//this.#html.querySelectorAll(find).forEach((e, i) => { f($(e), i); })

		return this;
	}

	parent() {
		return new GeneralHTMLProcessor(this.#html.parentElement);
	}

	append(child) {
		let c = new GeneralHTMLProcessor(child);
		this.#html.appendChild(c.#html);
	}

	// SELECT 
	option(t, v) {
		if (this.#html.tagName.toLowerCase() != "select") return undefined;

		let op = this.child("option");
		//this.#html.add(op);
		if (typeof t != "undefined") op.text(t);
		if (typeof v != "undefined") op.val(v);
		return op;
	}
	// SELECT

	len() {
		if (this.#html instanceof HTMLTableRowElement) {
			return this.#html.cells.length;
		} else if (this.#html instanceof HTMLTableElement || this.#html instanceof HTMLTableSectionElement) {
			return this.#html.rows.length;
		} else NaN;
	}
}


////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
class GeneralHTMLProcessorAll {
	#htmls = [];
	constructor(sel, par) {
		if (typeof sel == "undefined") return this;
		if (typeof par == "undefined" || par == null) par = document;

		if (typeof sel == "string") par.querySelectorAll(sel).forEach(h => this.#htmls.push(new GeneralHTMLProcessor(h)))
		else this.#htmls.push(new GeneralHTMLProcessor(sel));
		return this;
	}

	// should return a __HTMLProcesor object from the array.
	at(index) {
		if (typeof index == "undefined" || index >= this.#htmls.length) return;
		return this.#htmls[index];
	}

	// single value
	css(s, v) {
		if (typeof v != "undefined") this.#htmls.each(e => e.css(s, v));
		return this;
	}

	cls(v) {
		if (typeof v != "undefined") this.#htmls.each(e => e.cls(v));
		return this;
	}


	attr(a, v) {
		if (typeof v != "undefined") this.#htmls.each(e => e.setAttribuet(a, v));
		return this;
	}

	click(f) {
		if (typeof f != "function") throw "value have to be a function";
		this.#htmls.each(e => e.click(f));
		return this;
	}

	on(evt, f) {
		this.#htmls.each(e => e.on(evt, f));
	}

	val(v) {
		if (typeof v != "undefined") this.#htmls.each(e => e.val(v));
		return this;
	}

	cls(v) {
		if (typeof v == "undefined") this.#htmls.each(e => e.cls(v));
		return this;
	}

	addCls(v) {
		if (typeof v != "undefined") {
			let list = [].concat(v);
			this.#htmls.each(h => h.addCls(list));
		}
		return this;
	}

	removeCls(v) {
		if (typeof v != "undefined") {
			let list = [].concat(v);
			this.#htmls.forEach(html => html.rmCls(list));
		}
		return this;
	}

	rmCls(v) {
		return this.removeCls(v);
	}

	each(f) {
		this.#htmls.each((d, i) => f(d, i));
	}

	src(v) {
		if (typeof v != "undefined") this.#htmls.each(e => e.src = v);
		return this;
	}

	/*child count*/
	length() {
		return this.#htmls.length;
	}

	count() {
		return this.#htmls.length;
	}
}

var $ = function(selector) {
	if (typeof selector != "undefined") {
		if (selector instanceof GeneralHTMLProcessor) {
			return selector
		}
		return new GeneralHTMLProcessor(selector);
	}
}

$.ajax = function(params) {
	let aj = new Ajax();
	if (typeof params == "undefined") return aj;

	if (typeof params.path != "undefined") aj.path(params.path);
	if (typeof params.data != "undefined") aj.data(params.data);
	if (typeof params.success != "undefined") aj.success(params.success);
	if (typeof params.error != "undefined") aj.success(error.error);
	return aj;
}

$.makeid = function(length) {
	if (typeof length != "number" || length <= 0) length = 10;
	var cs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var csLen = cs.length;
	// making sure first character is alphabet, not number
	var r = cs.charAt(Math.floor(Math.random() * (csLen - 10)));

	for (var i = 1; i < length; i++) {
		r += cs.charAt(Math.floor(Math.random() * csLen));
	}
	return r;
}

$.addStyle = function(styles, styleId) {
	styleId = styleId.replace("#", "");
	let s = $("#" + styleId);
	if (s instanceof ClassNotCreated) {
		s = $.makeChild("style", document.head).id(styleId).html(styles);
	} else {
		s.html(s.html() + styles);
	}
	return s;
}

$.newChild = function(tag, parent) {
	let elem = document.createElement(tag);
	let ad = parent;
	if (typeof parent == "undefined") ad = document.body;
	if (parent !== null) ad.appendChild(elem);
	return new GeneralHTMLProcessor(elem);
}

$.addChild = function(tag, parent) {
	return this.newChild(tag, parent);
}

$.makeChild = function(tag, parent) {
	return this.newChild(tag, parent);
}

$.mk = function(tag, parent) {
	return this.newChild(tag, parent);
}

$.docHeight = function() {
	return Math.max(
		$.nullToNumber(document.body.scrollHeight),
		$.nullToNumber(document.documentElement.scrollHeightv),
		$.nullToNumber(document.body.offsetHeight),
		$.nullToNumber(document.documentElement.offsetHeight),
		$.nullToNumber(document.body.clientHeight),
		$.nullToNumber(document.documentElement.clientHeight)
	);
}

$.docWidth = function() {
	return Math.max(
		$.nullToNumber(document.body.scrollWidth),
		$.nullToNumber(document.documentElement.scrollWidth),
		$.nullToNumber(document.body.offsetWidth),
		$.nullToNumber(document.documentElement.offsetWidth),
		$.nullToNumber(document.body.clientWidth),
		$.nullToNumber(document.documentElement.clientWidth)
	);
}

$.nullToNumber = function(v, def) {
	if (typeof def == "undefined" || def == null) def = 0;
	let r = Number(v);
	if (v == null) return def;
	return r;
}

$.nullToString = function(v, def) {
	if (typeof def == "undefined" || def == null) def = "";
	return v == null || typeof v == "undefined" ? def : v;
}

$.nullToArray = function(v, def) {
	if (typeof def == "undefined" || def == null) def = [];
	return v == null || typeof v == "undefined" ? def : v;
}

$.nullToObject = function(v, def) {
	if (typeof def == "undefined" || def == null) def = {};
	return v == null || typeof v == "undefined" ? def : v;
}

$.undefToNull = function(v) {
	if (typeof v == "undefined") return null;
	return v;
}


$.$$ = function(selectorAll) {
	if (selectorAll instanceof GeneralHTMLProcessorAll) {
		return selectorAll
	}
	return new GeneralHTMLProcessorAll(selectorAll);
}

let $$ = function(selectorAll) {
	return $.$$(selectorAll);
}

$.isTrue = function(v) {
	if (v == null || typeof v == "undefined") {
		return false;
	}
	if (v.toString().toLowerCase() === "true") return true;
	return false;
}

$.istrue = function(v) {
	return $.isTrue(v);
}

$.isFalse = function(v) {
	if (v == null || typeof v == "undefined") {
		return false;
	}
	if (v.toString().toLowerCase() === "false") return true;
	return false;
}

$.isfalse = function(v) {
	return isFalse(v);
}

$.each = function(obj, f) {
	if (Array.isArray(obj)) {
		obj.each((e, i) => f(e, i));
	}
	else if (typeof obj == "object") {
		for (let key in obj) {
			f(key, obj[key]);
		}
	}
}

$.ua = function() {
	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';

	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;

	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;

	// Chrome 1 - 79
	var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

	// Edge (based on chromium) detection
	var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

	// Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;


	if (isFirefox) return "firefox";
	if (isChrome) return "chrome";
	if (isSafari) return "safari";
	if (isOpera) return "opera";
	if (isIE) return "ie";
	if (isEdge) return "edge";
	if (isEdgeChromium) return "edge-chromium";
	if (isBlink) return "blink";
	return "";
}


