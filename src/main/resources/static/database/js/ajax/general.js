"use strict";
////////////////////////
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
	#html;
	/*
		s = selector
		p = parent;
	*/
	constructor(s, p) {
		if (s instanceof GeneralHTMLProcessor) return s;
		if (s instanceof GeneralHTMLProcessorAll) return s;
		if (p == undefined) p = document;
		// if selector is string, we construct
		if (typeof s == "string") {
			let html = p.querySelectorAll(s);
			if (html == null || html.length == 0) return new ClassNotCreated("html element not found with following search key: " + s);
			if (html.length == 1) this.#html = html[0];
			else return new GeneralHTMLProcessorAll(s, p);
		} else this.#html = s;

		return this;
	}

	z(selector) { return new GeneralHTMLProcessor(selector, this.#html); }

	zz(selector) { return new GeneralHTMLProcessorAll(selector, this.#html); }

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
		this.#html.querySelectorAll(target).forEach(e => this.#html.removeChild(e));
		return undefined;
	}

	id(v) {
		if (v == undefined) return this.#html.id;
		this.#html.id = v;
		return this;
	}

	name(v) {
		if (v == undefined) return this.#html.name;
		this.#html.name = v;
		return this;
	}

	html(v) {
		if (v == undefined) return this.#html.innerHTML;
		this.#html.innerHTML = v;
		return this;
	}

	form(v) {
		if (this.#html[v] == null) return null;
		return new GeneralHTMLProcessor(this.#html[v]);
	}

	on(e, f) {
		if (typeof e != "string" || typeof f != "function") {
			throw "Unexpected input paramters. Expected: e('string', function(){})";
		}
		this.#html.addEventListener(e, f);
	}
	/*
	* 
	*/
	text(v) {
		if (v == undefined) return this.#html.innerText;
		this.#html.innerText = d;
		return this;
	}

	title(v) {
		if (v == undefined) return this.#html.title;
		this.#html.title = v;
		return this;
	}

	// single value
	css(s, v) {
		if (v == undefined) return this.#html.style[s];
		this.#html.style[s] = v;
		return this;
	}

	attr(a, v) {
		if (v == undefined) return this.#html.getAttribute(a);
		this.#html.setAttribute(a, v);
		return this;
	}

	click(f) {
		if (typeof f != "function") throw "value have to be a function";
		this.#html.onclick = f;
		return this;
	}

	val(v) {
		if (v == undefined) return this.#html.value;
		this.#html.value = v;
		return this;
	}

	src(v) {
		if (v == undefined) return this.#html.src;
		this.#html.src = v;
		return this;
	}

	rect() {
		return this.#html.getBoundingClientRect();
	}
	max(v) {
		if (v == undefined) return this.#html.max;
		this.#html.max = v;
		return this;
	}

	min(v) {
		if (v == undefined) return this.#html.min;
		this.#html.min = v;
		return this;
	}

	readOnly(v) {
		if (v == undefined) return this.#html.readOnly;
		this.#html.readOnly = v;
		return this;
	}

	type(v) {
		if (v == undefined) return this.#html.type;
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
		if (v == undefined) return this.#html.className;
		this.#html.className = "";
		this.addCls(v);
		return this;
	}

	addCls(v) {
		if (v == undefined || v == null || v == "") return this;
		let html = this.#html;
		[].concat(v).forEach(e => html.classList.add(e))
		return this;
	}

	rmCls(v) {
		return this.removeCls(v);
	}

	removeCls(v) {
		if (v == undefined) return this;
		[].concat(v).forEach(e => this.#html.classList.remove(e));

		return this;
	}



	hide() {
		this.#html.style.display = "none";
	}

	show() {
		let tagname = this.#html.tagName.toLowerCase();
		if (tagname == 'span') this.#html.style.display = "inline";
		else if (tagname == "p" || tagname == "div") this.#html.style.display = "block";
		else if (tagname == "table") this.#html.style.display = "table";
		else if (tagname == "caption") this.#html.style.display = "table-caption";
		else if (tagname == "tfoot") this.#html.style.display = "table-footer-group";
		else if (tagname == "thead") this.#html.style.display = "table-header-group";
		else if (tagname == "tbody") this.#html.style.display = "table-row-group";
		else if (tagname == "colgroup") this.#html.style.display = "table-column-group";
		else if (tagname == "td") this.#html.style.display = "table-cell";
		else if (tagname == "col") this.#html.style.display = "table-column";
		else if (tagname == "tr") this.#html.style.display = "table-row";
		else if (tagname == "li") this.#html.style.display = "list-item"; z
	}

	target(v) {
		if (v == undefined) return this.#html.target;
		this.#html.target = v;
		return this;
	}



	//\\ Form specific
	action(v) {
		if (v == undefined) return this.#html.action;
		this.#html.action = v;
		return this;
	}

	method(v) {
		if (v == undefined) return this.#html.method;
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
		if (i != undefined) return new GeneralHTMLProcessor(this.#html.rows[i]);
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

	index() {
		if (this.#html instanceof HTMLTableRowElement)
			return this.#html.rowIndex;
		if (this.#html instanceof HTMLTableCellElement)
			return this.#html.cellIndex;
		return undefined;
	}

	// if index is undefined, new row will be inserted. 
	// if index is defined, row will be returned;
	cell(i) {
		if (i != undefined) return new GeneralHTMLProcessor(this.#html.cells[i]);
		else if (this.#html instanceof HTMLTableRowElement) return new GeneralHTMLProcessor(this.#html.insertCell());
		return undefined;
	}

	caption() {
		if (this.#html instanceof HTMLTableElement) return new GeneralHTMLProcessor(this.#html.createCaption());
		return undefined;
	}

	tbody(i) {
		if (i != undefined) return new GeneralHTMLProcessor(this.#html.tBodies[i]);
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
		if (v == undefined) return this.#html.colSpan;
		this.#html.colSpan = v;
		return this;
	}

	each(find, f) {
		if (typeof f != "function") throw "variable must have to be a function";
		document.qurySelectorAll(find).forEach((e, i) => { f(z(e), i); })
		f(d, 0);
		return this;
	}

	parent() {
		return new GeneralHTMLProcessor(this.#html.parentElement);
	}

	/*if lenght exists
	* return NaN
	*/
	len() {
		if (this.#html instanceof HTMLTableRowElement) {
			return this.#html.cells.length;
		} else if (this.#html instanceof HTMLTableElement) {
			return this.#html.rows.length;
		} else NaN;
	}

	/*child count*/
	count() {
		throw "not implemented";
	}
}


////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
class GeneralHTMLProcessorAll {
	#htmls = [];
	constructor(sel, par) {
		if (sel == undefined) return this;
		if (par == undefined) par = document;
		if (sel instanceof GeneralHTMLProcessor) this.#htmls.push(sel);
		else if (typeof sel == "string") par.querySelectorAll(sel).forEach(h => this.#htmls.push(new GeneralHTMLProcessor(h)))
		else this.#htmls.push(new GeneralHTMLProcessor(sel));
		return this;
	}

	// this will return itself; not the created child;
	child(tag) {
		this.#htmls.forEach(e => ret.#htmls.push(e.child(tag)))
		return this;
	}

	// should return a __HTMLProcesor object from the array.
	at(index) {
		if (index == undefined) return; // returing undefined
		if (index >= this.#htmls.length) return; // returing undefined
		return this.#htmls[index];
	}

	/*
	* set the same value to every element
	* 
	*/
	html(v) {
		if (v == undefined) {
			let ret = [];
			this.#htmls.forEach(e => ret.push(e.html()));
			return ret;
		}
		// d is not undefined
		this.#htmls.forEach(e => e.html(v));
		return this;
	}

	/*
	* 
	*/
	text(v) {
		let ret = [];
		if (v == undefined) {
			this.#htmls.forEach(e => ret.push(e.text()))
			return ret;
		}
		// d is not undefined
		this.#htmls.forEach(e => e.text(v));
		return this;
	}

	// single value
	css(s, v) {
		if (v == undefined) { // returning valule;
			let ret = []
			this.#htmls.forEach(e => ret.push(e.css(s)))
			return ret;
		}
		this.#htmls.forEach(e => e.style[s] = v);
		return this;
	}


	attr(a, v) {
		if (v == undefined) { // returning valule;
			let ret = []
			this.#htmls.forEach(e => ret.push(e.attr(style)));
			return ret;
		}
		this.#htmls.forEach(e => e.setAttribuet(a, v));
		return this;
	}

	click(f) {
		if (typeof f != "function") throw "value have to be a function";
		this.#htmls.forEach(e => e.click(f));
		return this;
	}

	val(v) {
		if (v == undefined) { // returning valule;
			let ret = []
			this.#htmls.forEach(e => ret.push(e.val()))
			return ret;
		}
		this.#htmls.forEach(e => e.val(v));
		return this;
	}

	cls(v) {
		if (v == undefined) { // returning valule;
			let ret = []
			this.#htmls.forEach(e => ret.push(e.cls()));
			return ret;
		}

		this.#htmls.forEach(e => e.cls(v));
		return this;
	}

	addCls(v) {
		if (v == undefined) return this;
		this.#htmls.forEach(h => h.addCls(v))
		return this;
	}

	removeCls(v) {
		if (v == undefined) return this;
		let list = [].concat(v);
		this.#htmls.forEach(html => html.rmCls(list))
		return this;
	}

	rmCls(v) {
		return this.removeCls(v);
	}



	row() {
		throw "not implemented";
	}

	cell() {
		throw "not implemented"
	}

	each(f) {
		this.#htmls.forEach((d, i) => f(d, i));
	}

	src(v) {
		if (v == undefined) { // returning valule;
			let ret = [];
			this.#htmls.forEach(h => ret.push(h.src()));
			return ret;
		}

		this.#htmls.forEach(e => e.src = v);
		return this;
	}

	parent() {
		throw "not implemented";
	}

	/*if lenght exists*/
	len() {
		throw "not implemented";
	}

	/*child count*/
	count() {
		return this.#htmls.length;
	}
}

var z = function(selector) {
	if (selector != undefined) {
		if (selector instanceof GeneralHTMLProcessor) {
			return selector
		}
		return new GeneralHTMLProcessor(selector);
	}
}

z.ajax = function() {
	return new Ajax();
}

z.makeid = function(length) {
	if (typeof length != "number")
		length = 10;
	var r = "";
	var cs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var csLen = cs.length;
	for (var i = 0; i < length; i++) {
		r += cs.charAt(Math.floor(Math.random() * csLen));
	}
	return r;
}

z.addStyle = function(styles, styleId) {
	styleId = styleId.replace("#", "")
	let s = z("#" + styleId);
	if (s instanceof ClassNotCreated) {
		s = z.makeChild("style", document.head).id(styleId).html(styles);
	} else {
		s.html(s.html() + styles);
	}
	return s;
}

z.newChild = function(tag, parent) {
	let elem = document.createElement(tag);
	parent.appendChild(elem);
	return new GeneralHTMLProcessor(elem);
}

z.addChild = function(tag, parent) {
	return this.newChild(tag, parent);
}

z.makeChild = function(tag, parent) {
	return this.newChild(tag, parent);
}

z.docHeight = function() {
	return Math.max(
		z.zeor(document.body.scrollHeight),
		z.zeor(document.documentElement.scrollHeightv),
		z.zeor(document.body.offsetHeight),
		z.zeor(document.documentElement.offsetHeight),
		z.zeor(document.body.clientHeight),
		z.zeor(document.documentElement.clientHeight)
	);
}

z.docWidth = function() {
	return Math.max(
		z.zeor(document.body.scrollWidth),
		z.zeor(document.documentElement.scrollWidth),
		z.zeor(document.body.offsetWidth),
		z.zeor(document.documentElement.offsetWidth),
		z.zeor(document.body.clientWidth),
		z.zeor(document.documentElement.clientWidth)
	);
}

z.nullTozero = function(v) {
	let r = Number(v);
	if (v == null) return 0;
	return r;
}

z.nullToString = function(v) {
	return v == null || v == undefined ? "" : v;
}

z.zz = function(selectorAll) {
	if (selectorAll instanceof GeneralHTMLProcessorAll) {
		return selectorAll
	}
	return new GeneralHTMLProcessorAll(selectorAll);
}

class StringJoiner {
	#str = [];
	#joiner = "";
	constructor(joiner) {
		this.#joiner = z.nullToString(joiner);
		return this;
	}

	add(...args) {
		args.forEach(e => this.#str.push(e));
		return this;
	}

	count() {
		return this.#str.length;
	}

	toString() {
		return this.#str.join(this.#joiner);
	}
}

class StringBuilder extends StringJoiner {
	constructor() {
		super("");
		return this;
	}

}
