"use strict";
////////////////////////
/* Validation is out of scope */
window.$ = {};
window.$$ = {};
$ = function(sel) { return document.querySelector(sel); }

$$ = function(sel) { return [...document.querySelectorAll(sel)]; };


/*** Window */
Window.prototype.on = Window.prototype.On = (e, f) => this.addEventListener(e, f);

/***  Document */
Document.prototype.$ = function(sel) { return this.querySelector(sel); }
Document.prototype.$$ = function(sel) { return [...this.querySelectorAll(sel)]; }

Document.prototype.on = Document.prototype.On = (e, f) => this.addEventListener(e.toLowerCase(), f);

Document.prototype.html = Document.prototype.Html = function(v) {
	if (typeof v == "undefined") return this.innerHTML;
	this.innerHTML = v;
	return this;
}

Document.prototype.text = Document.prototype.Text = function(v) {
	if (typeof v == "undefined") return this.innerText;
	this.innerText = v;
	return this;
}
/***  Document end */

/*** HTMLElement */

HTMLElement.prototype.$ = function(sel) { return this.querySelector(sel); }
HTMLElement.prototype.$$ = function(sel) {
	return [...this.querySelectorAll(sel)];
}

HTMLElement.prototype.Parent = function() {
	return this.parentElement;
}

HTMLElement.prototype.Name = function(v) {
	if (typeof v == "undefined") return this.name;
	this.name = v;
	return this;
}

HTMLElement.prototype.Mk = HTMLElement.prototype.mk = function(tag) {
	let p = document.createElement(tag);
	this.appendChild(p);
	return p;
}

HTMLElement.prototype.tag = HTMLElement.prototype.Tag = function() {
	return this.tagName;
}

HTMLElement.prototype.html = HTMLElement.prototype.Html = function(v) {
	if (typeof v == "undefined") return this.innerHTML;
	this.innerHTML = v;
	return this;
}


HTMLElement.prototype.appendHtml = HTMLElement.prototype.AppendHtml = function(v) {
	this.innerHTML += v;
	return this;
}

HTMLElement.prototype.text = HTMLElement.prototype.Text = function(v) {
	if (typeof v == "undefined") return this.innerText;
	this.innerText = v;
	return this;
}

HTMLElement.prototype.Outer = HTMLElement.prototype.outer = function() {
	return this.outerHTML;
}

HTMLElement.prototype.tag = HTMLElement.prototype.Tag = function() {
	return this.tagName;
}

HTMLElement.prototype.rm = HTMLElement.prototype.RmChild = function(target) {
	if (target instanceof HTMLElement) {
		this.removeChild(target);
		return this;
	}
	this.$(target).forEach(e => this.removeChild(e));
	return this;
}


HTMLElement.prototype.Id = function(v) {
	if (typeof v == "undefined") return this.id;
	this.id = v;
	return this;
}

HTMLElement.prototype.hasCls = HTMLElement.prototype.HasCls = function(cls) { return this.classList.contains(cls); }

HTMLElement.prototype.toggoleCls = HTMLElement.prototype.ToggoleCls = function(cls) {
	if (this.classList.contains(cls)) this.classList.remove(cls);
	else this.classList.add(cls);
	return this;
}

HTMLElement.prototype.cls = HTMLElement.prototype.Cls = function(v) {
	if (typeof v == "undefined") return this.className;
	this.className = v;
	return this;
}

HTMLElement.prototype.addCls = HTMLElement.prototype.AddCls = function(v) {
	if (typeof v == "undefined" || v == null || v == "") v = [];
	[].concat(v).forEach(e => this.classList.add(e))
	return this;
}

HTMLElement.prototype.rmCls = HTMLElement.prototype.RmCls = HTMLElement.prototype.removeCls = HTMLElement.prototype.RemoveCls = function(v) {
	if (typeof v == "undefined") v = [];
	[].concat(v).forEach(e => this.classList.remove(e));
	return this;
}

/* Validation is out of scope */
HTMLElement.prototype.on = HTMLElement.prototype.On = function(e, f) {
	this.addEventListener(e, f);
	return this;
}

HTMLElement.prototype.Input = function(f) {
	this.addEventListener("input", f);
	return this;
}

// this is extra value, separate to attribute
HTMLElement.prototype.Data = function(name, data) {
	if (typeof this["data"] == "undefined") this["data"] = {};
	if (typeof data == "undefined") return this["data"][name];
	this["data"][name] = data;
	return this;
}

HTMLElement.prototype.hide = HTMLElement.prototype.Hide = function() {
	this.style.display = "none";
	return this;
}


HTMLElement.prototype.childCount = HTMLElement.prototype.ChildCount = function(find) {
	if (typeof find == "undefined") return this.childElementCount;
	return this.querySelectorAll(find).length;
}

HTMLElement.prototype.Title = function(v) {
	if (typeof v == "undefined") return this.title;
	this.title = v;
	return this;
}

// single value
HTMLElement.prototype.css = HTMLElement.prototype.Css = function(s, v) {
	if (typeof v == "undefined") return this.style[s];
	this.style[s] = v;
	return this;
}

HTMLElement.prototype.computed = HTMLElement.prototype.Computed = function(pseudoElt) {
	return window.getComputedStyle(this, pseudoElt);
}


HTMLElement.prototype.attr = HTMLElement.prototype.Attr = function(a, v) {
	if (typeof v == "undefined") return this.getAttribute(a);
	this.setAttribute(a, v);
	return this;
}

/**
 * arg1: if arg1 is function, then function will execute on all children
 * 
 */
HTMLElement.prototype.each = HTMLElement.prototype.Each = function(arg1, arg2) {
	if (typeof arg1 == "function")
		[...this.childNodes].each(arg1);
	else this.$$(arg1).each(arg2);
	return this;
}


HTMLElement.prototype.Append = function(elem) {
	this.append(elem);
	return this;
}

HTMLElement.prototype.Height = function() {
	return this.computed().height;
}

HTMLElement.prototype.Width = function() {
	return this.computed().width;
}

/*** HTMLElement end */

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// HTMLFormElement ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
HTMLFormElement.prototype.Target = function(v) {
	if (typeof v == "undefined") return this.target;
	this.target = v;
	return this;
}

HTMLFormElement.prototype.Action = function(v) {
	if (typeof v == "undefined") return this.action;
	this.action = v;
	return this;
}

HTMLFormElement.prototype.Method = function(v) {
	if (typeof v == "undefined") return this.method;
	this.method = v;
	return this;
}

HTMLFormElement.prototype.element = HTMLFormElement.prototype.Element = function(name) {
	return this[name];
}



////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Blocks/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/***  HTMLDivElement */
HTMLDivElement.prototype.editable = HTMLDivElement.prototype.Editable = function(v) {
	if (typeof v == "undefined") return this.contentEditable;
	this.contentEditable = v;
	return this;
}

HTMLDivElement.prototype.show = HTMLDivElement.prototype.Show = function() {
	this.style.display = "block";
	return this;
}

HTMLDivElement.prototype.spellCheck = HTMLDivElement.prototype.SpellCheck = function(v) {
	if (typeof v == "undefined") return this.spellcheck;
	this.spellcheck = v;
	return this;
}

/***  HTMLDivElement end */

/***  HTMLParagraphElement */
HTMLParagraphElement.prototype.editable = HTMLParagraphElement.prototype.Editable = function(v) {
	if (typeof v == "undefined") return this.contentEditable;
	this.contentEditable = v;
	return this;
}

HTMLParagraphElement.prototype.show = HTMLParagraphElement.prototype.Show = function() {
	this.style.display = "block";
	return this;
}

/***  DIV end */

/*** HTMLSpanElement */
HTMLSpanElement.prototype.show = HTMLSpanElement.prototype.Show = function() {
	this.style.display = "inline";
	return this;
}

/*** SPAN end */

/*** HTMLTableElement */
HTMLTableElement.prototype.show = HTMLTableElement.prototype.Show = function() {
	this.style.display = "table";
	return this;
}

HTMLTableElement.prototype.row = HTMLTableElement.prototype.Row = function(i) {
	if (typeof i != "undefined") return this.rows[i];
	return this.insertRow();
}

HTMLTableElement.prototype.Caption = function() {
	return this.createCaption();
}

HTMLTableElement.prototype.TBody = function(i) {
	if (typeof i != "undefined") return this.tBodies[i];
	return this.createTBody();
}

HTMLTableElement.prototype.rowCount = HTMLTableElement.prototype.RowCount = function() {
	return this.rows.length;
}

/*** HTMLTableElement end */

/*** HTMLTableCaptionElement */
HTMLTableCaptionElement.prototype.show = HTMLTableCaptionElement.prototype.Show = function() {
	this.style.display = "table-caption";
	return this;
}

/*** TABLE-caption end */

/*** TABLE foot/head/body */
HTMLTableSectionElement.prototype.show = HTMLTableSectionElement.prototype.Show = function() {
	let tagName = this.tagName.toLowerCase();
	if (tagName == "tfoot")
		this.style.display = "table-footer-group";
	else if (tagName == "thead")
		style.display = "table-header-group";
	else if (tagName == "tbody")
		this.style.display = "table-row-group";
	else if (tagName == "colgroup")
		this.style.display = "table-column-group";
	return this;
}

HTMLTableSectionElement.prototype.row = HTMLTableSectionElement.prototype.Row = function(i) {
	if (typeof i != "undefined") return this.rows[i];
	return this.insertRow();
}

HTMLTableSectionElement.prototype.Length = function() {
	return this.rows.length;
}

/*** HTMLTableSectionElement foot/head/body end */

/*** HTMLTableColElement */

HTMLTableColElement.prototype.show = HTMLTableColElement.prototype.Show = function() {
	this.style.display = "table-column";
	return this;
}

HTMLTableColElement.prototype.index = HTMLTableColElement.prototype.Index = function() {
	return this.cellIndex;
}

/*** HTMLTableColElement end */

/*** HTMLTableCellElement */

HTMLTableCellElement.prototype.show = HTMLTableCellElement.prototype.Show = function() {
	this.style.display = "table-cell";
	return this;
}

HTMLTableCellElement.prototype.index = HTMLTableCellElement.prototype.Index = function() {
	return this.cellIndex;
}
/*** HTMLTableCellElement */

/*** HTMLTableRowElement */
HTMLTableRowElement.prototype.show = HTMLTableRowElement.prototype.Show = function() {
	this.style.display = "table-row";
	return this;
}

HTMLTableRowElement.prototype.index = HTMLTableRowElement.prototype.Index = function() {
	return this.rowIndex;
}

HTMLTableRowElement.prototype.at = HTMLTableRowElement.prototype.At = function(i) {
	return this.cells[i];
}

HTMLTableRowElement.prototype.cell = HTMLTableRowElement.prototype.Cell = function(i) {
	if (typeof i != "undefined") return this.cells[i];
	return this.insertCell();
}

HTMLTableRowElement.prototype.childCount = HTMLTableRowElement.prototype.ChildCount = function() {
	return this.cells.length;
}

HTMLTableRowElement.prototype.Length = function() {
	return this.ChildCount();
}
/*** HTMLTableRowElement end */

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////ALL INPUT RELATED////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*** HTMLTextAreaElement */
HTMLTextAreaElement.prototype.val = HTMLTextAreaElement.prototype.Val = function(v) {
	if (typeof v == "undefined") return this.value;
	this.value = v;
	return this;
}

HTMLTextAreaElement.prototype.Focus = function() {
	this.focus();
	return this;
}

HTMLTextAreaElement.prototype.isDisabled = HTMLTextAreaElement.prototype.IsDisabled = function() {
	return this.disabled === true || this.disabled == "true";
}

HTMLTextAreaElement.prototype.setDisable = HTMLTextAreaElement.prototype.SetDisable = function(status) {
	this.disabled = status;
	return this;
}

HTMLTextAreaElement.prototype.Disable = function() {
	return this.setDisable(true);
}

HTMLTextAreaElement.prototype.Enable = function() {
	return this.setDisable(false);
}

HTMLTextAreaElement.prototype.ReadOnly = function(v) {
	if (typeof v == "undefined") return this.readOnly;
	this.readOnly = v;
	return this;
}

HTMLTextAreaElement.prototype.show = HTMLTextAreaElement.prototype.Show = function() {
	this.style.display = "inline-block";
	return this;
}
/***  TextArea end */

/***  HTMLSelectElement */
HTMLSelectElement.prototype.show = HTMLSelectElement.prototype.Show = function() {
	this.style.display = "inline";
	return this;
}

HTMLSelectElement.prototype.val = HTMLSelectElement.prototype.Val = function(v) {
	if (typeof v == "undefined") return this.value;
	this.value = v;
	return this;
}

HTMLSelectElement.prototype.Focus = function() {
	this.focus();
	return this;
}

HTMLSelectElement.prototype.isDisabled = HTMLSelectElement.prototype.IsDisabled = function() {
	return this.disabled === true || this.disabled == "true";
}

HTMLSelectElement.prototype.setDisable = HTMLSelectElement.prototype.SetDisable = function(status) {
	this.disabled = status;
	return this;
}

HTMLSelectElement.prototype.Disable = function() {
	return this.setDisable(true);
}

HTMLSelectElement.prototype.Enable = function() {
	return this.setDisable(false);
}

HTMLSelectElement.prototype.ReadOnly = function(v) {
	if (typeof v == "undefined") return this.readOnly;
	this.readOnly = v;
	return this;
}
/***  HTMLSelectElement end */


/*** HTMLInputElement */

HTMLSelectElement.prototype.show = HTMLSelectElement.prototype.Show = function() {
	this.style.display = "inline";
	return this;
}

HTMLInputElement.prototype.Val = function(v) {
	if (typeof v == "undefined") return this.value;
	this.value = v;
	return this;
}

HTMLInputElement.prototype.val = function(v) {
	return this.Val(v);
}

HTMLInputElement.prototype.Type = function(v) {
	if (typeof v == "undefined") return this.type;
	this.type = v;
	return this;
}

HTMLInputElement.prototype.Focus = function() {
	this.focus();
	return this;
}

HTMLInputElement.prototype.Check = function(status) {
	if (typeof status == "undefined") return this.checked;
	this.checked = status;
	return this;
}

HTMLInputElement.prototype.isChecked = HTMLInputElement.prototype.IsChecked = function() {
	return this.checked.toString.toLowerCase() === "true";
}

HTMLInputElement.prototype.isDisabled = HTMLInputElement.prototype.IsDisabled = function() {
	return this.disabled === true || this.disabled == "true";
}

HTMLInputElement.prototype.setDisable = HTMLInputElement.prototype.SetDisable = function(status) {
	this.disabled = status;
	return this;
}

HTMLInputElement.prototype.Disable = function() {
	return this.setDisable(true);
}

HTMLInputElement.prototype.Enable = function() {
	return this.setDisable(false);
}

HTMLInputElement.prototype.ReadOnly = function(v) {
	if (typeof v == "undefined") return this.readOnly;
	this.readOnly = v;
	return this;
}
/***  input end */

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/***  anchor */
HTMLAnchorElement.prototype.Src = function(v) {
	if (typeof v == "undefined") return this.src;
	this.src = v;
	return this;
}

/***  anchor end */

/***  img */
HTMLImageElement.prototype.Src = function(v) {
	if (typeof v == "undefined") return this.src;
	this.src = v;
	return this;
}
/***  img end */

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////LIST//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/*** HTMLDListElement */
HTMLDListElement.prototype.show = HTMLDListElement.prototype.Show = function() {
	this.style.display = "list-item";
	return this;
}
/*** HTMLDListElement end */

/*** HTMLUListElement */
HTMLUListElement.prototype.show = HTMLUListElement.prototype.Show = function() {
	this.style.display = "list-item";
	return this;
}
/*** HTMLUListElement end */

/*** HTMLOListElement */
HTMLOListElement.prototype.show = HTMLOListElement.prototype.Show = function() {
	this.style.display = "list-item";
	return this;
}

/*** HTMLOListElement end */

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////zzzz//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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

$.mk = function(tag, parent) {
	let elem = document.createElement(tag);
	let ad = parent;
	if (typeof parent == "undefined" || parent == null) ad = document.body;
	ad.appendChild(elem);
	return elem;
}

$.newChild = function(tag, parent) {
	return this.mk(tag, parent);
}


$.makeChild = function(tag, parent) {
	return $.mk(tag, parent);
}

$.addStyle = function(styles, styleId) {
	styleId = styleId.replaceAll(/#/g, "");
	let s = $("#" + styleId);
	if (!(s instanceof HTMLStyleElement)) {
		s = $.mk("style", document.head).Id(styleId).Html(styles);
	} else {
		s.Html(s.Html() + styles);
	}
	return s;
}

$.addChild = function(tag, parent) {
	return $.newChild(tag, parent);
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

$.loop = function(f, arg1, arg2) {
	arg2 = typeof arg2 == "undefined" ? 1 : arg2;
	for (let i = arg1; i <= arg2; i++) {
		f(i);
	}
}

$.doUntil = function(todo, condition) {
	while (condition()) {
		todo();
	}
}

$.ua = function() {
	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';

	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof window.safari !== 'undefined' && window['safari'].pushNotification));

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

	if (isFirefox) return { browser: "firefox" };
	if (isChrome) return { browser: "chrome" };
	if (isSafari) return { browser: "safari" };
	if (isOpera) return { browser: "opera" };
	if (isIE) return { browser: "ie" };
	if (isEdge) return { browser: "edge" };
	if (isEdgeChromium) return { browser: "edge-chromium" };
	if (isBlink) return { browser: "blink" };
	return {};
}
