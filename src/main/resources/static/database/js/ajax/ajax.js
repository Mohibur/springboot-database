"use strict";

const AJAX_VER = "1.0.0"

const Methods = {};
// --- 1xx Informational ---
Object.defineProperty(Methods, "GET", { value: "get", writable: false, enumerable: true, configurable: true });
Object.defineProperty(Methods, "POST", { value: "post", writable: false, enumerable: true, configurable: true });
Object.defineProperty(Methods, "PUT", { value: "put", writable: false, enumerable: true, configurable: true });
Object.defineProperty(Methods, "UPDATE", { value: "update", writable: false, enumerable: true, configurable: true });
Object.defineProperty(Methods, "DELETE", { value: "delete", writable: false, enumerable: true, configurable: true });

class Ajax {

	static #ERROR_METHOD = "error";
	static #SUCCESS_METHOD = "success";
	static #AFTER_METHOD = "after";

	#xmlhttp;
	#allData = {};
	#url = "/";
	#asynchronous = true;

	#responseAction = {};
	#method = Methods.GET;
	#headers = {};
	constructor() {
		this.#xmlhttp = new XMLHttpRequest();
		this.#xmlhttp.onreadystatechange = function(ob) {
			return function() {
				if (ob.#xmlhttp.readyState === 4) {
					ob.#process();
				}
			}
		}(this);
		return this;
	}

	#buildString() {
		let ret = [];
		Object.keys(this.#allData).forEach(key => { ret.push(encodeURIComponent(key) + "=" + encodeURIComponent(this.#allData[key])) });
		return ret.join("&");
	}

	#process() {
		// Create a map of header names to values
		var headerMap = {};
		var headerDump = this.#xmlhttp.getAllResponseHeaders().trim();
		headerDump.split(/[\r\n]+/).forEach(line => {
			var parts = line.split(': ');
			var header = parts.shift();
			var value = parts.join(': ');
			headerMap[header] = value;
		});

		var contentType = $.nullToString(headerMap["content-type"]);
		var body = this.#xmlhttp.responseText;
		var bodyOriginal = body;
		var postProcessMethod = Ajax.#SUCCESS_METHOD;

		// setting mehtod based on success
		if (this.#xmlhttp.status < 200 || this.#xmlhttp.status >= 300) {
			postProcessMethod = Ajax.#ERROR_METHOD;
		}

		// parsing json response
		var parsingError = false;
		if (contentType.toLocaleLowerCase().indexOf("json") > -1) {
			try {
				body = JSON.parse(body);
			} catch (err) {
				body = err;
				postProcessMethod = Ajax.#ERROR_METHOD;
				parsingError = true;
			}
		} else if (contentType.toLocaleLowerCase().indexOf("xml") > -1) {
			try {
				body = new DOMParser().parseFromString(body, "text/xml");
			} catch (err) {
				body = err;
				postProcessMethod = Ajax.#ERROR_METHOD;
				parsingError = true;
			}
		}

		// error code is high priority
		if (typeof this.#responseAction[this.#xmlhttp.status.toString()] == "function" && !parsingError) {
			this.#responseAction[xmlhttp.status.toString()](body, headerMap, { status: this.#xmlhttp.status, rawBody: bodyOriginal, rawHeader: headerDump });
		}

		// open, error is low priority
		if (typeof this.#responseAction[postProcessMethod] == "function") {
			this.#responseAction[postProcessMethod](body, headerMap, { status: this.#xmlhttp.status, rawBody: bodyOriginal, rawHeader: headerDump });
		}
		// finally
		if (typeof this.#responseAction[Ajax.#AFTER_METHOD] == "function") {
			this.#responseAction[Ajax.#AFTER_METHOD]();
		}
	}

	#packHeaders() {
		$.each(this.#headers, (k, v) => {
			this.#xmlhttp.setRequestHeader(k, v)
		})
	}

	setPath(u) {
		this.#url = u;
		return this;
	}

	setUrl(u) {
		this.#url = u;
		return this;
	}

	path(u) {
		return this.setPath(u);
	}

	url(u) {
		return this.setPath(u);
	}

	addHeader(name, value) {
		if (typeof this.#headers[name] == "undefined" && this.#headers[name] != "")
			this.#headers[name] = value;
		return this;
	}

	header(name, value) {
		return this.addHeader(name, value);
	}

	setHeader(headers) {
		this.#headers = headers;
		return this;
	}

	headers(headers) {
		return this.setHeader(headers);
	}


	/*
		* Response code
	*/
	on(code, fnc) {
		code = code.toString();
		if (! /^[0-9]{3}$/.test(code)) {
			throw "responseCode is invalid"
		}
		if (typeof fnc != "function") {
			throw "Function is expected as second parameter";
		}

		this.#responseAction[code] = fnc;
		return this;
	}

	setIsAsync(isAasync) {
		isAasync = isAasync.toString();
		if (isAasync.toString().toLocaleLowerCase() != "true" && isAasync.toString().toLocaleLowerCase() != "false") {
			throw "Either true or false is expected";
		}
		this.#asynchronous = isAasync == "true";
		return this;
	}

	// alias data
	setData(d) {
		this.#allData = d;
		return this;
	}
	// alias setData
	datas(d) {
		this.#allData = d;
		return this;
	}

	addData(name, value) {
		if (typeof name != "string" && name instanceof GeneralHTMLProcessor) {
			let n = name.name() == null || name.name() == "" ? name.id() : name.name()
			this.#allData[n] = name.val();
			return this;
		}

		if (typeof this.#allData != "object") {
			throw "data type does not match"
		}
		this.#allData[name.toString()] = value;
		return this;
	}

	data(name, value) {
		return this.addData(name, value);
	}

	setMethod(m) {
		this.#method = m.toString();
		return this;
	}

	method(m) {
		return this.setMethod(m);
	}

	/***************************************************/
	/**************BASIC REQUEST AFTER SETUP************/
	/***************************************************/

	post() {
		this.addHeader("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE);
		this.#method = Methods.POST;
		this.#withmethod();
	}

	postJson() {
		this.#json(Methods.POST);
	}

	putJson() {
		this.#json(Methods.PUT);
	}

	updateJson() {
		this.#json(Methods.UPDATE);
	}

	updateJson() {
		this.#json(Methods.DELETE);
	}

	#json(method) {
		this.#method = method;
		var subString = JSON.stringify(this.#allData);
		this.#xmlhttp.open(this.#method, this.#url, this.#asynchronous);
		this.#xmlhttp.setRequestHeader("Content-Type", MediaType.APPLICATION_JSON_UTF8_VALUE);
		this.#packHeaders();
		this.#xmlhttp.send(subString);
	}

	#withmethod() {
		this.#xmlhttp.open(this.#method, this.#url, this.#asynchronous);
		this.#packHeaders();
		this.#xmlhttp.send(this.#buildString());
	}

	#constructUrl() {
		let spls = this.#url.split("?");
		let uri = spls.lengxmlhttpth > 1 ? spls[1] + "&" : "";
		uri = uri + this.#buildString();
		return uri == "" ? spls[0] : spls[0] + "?" + uri;
	}

	get() {
		this.#method = Methods.GET;
		this.#xmlhttp.open(this.#method, this.#constructUrl(), this.#asynchronous);
		this.#packHeaders();
		this.#xmlhttp.send();
	}

	submit(method) {
		method = method.toLowerCase();
		if (method == "get") {
			this.get();
		}
		else if (method == "post") {
			this.post();
		}
		else if (method == "put") {
			this.putJson();
		}
		else if (method == "delete") {
			this.deleteJson();
		} else {
			throw "Unknown request"
		}
	}


	success(fnc) {
		if (typeof fnc != "function") {
			throw "have to be a funciton";
		}
		this.#responseAction[Ajax.#SUCCESS_METHOD] = fnc;
		return this;
	}

	onSuccess(fnc) {
		return this.success(fnc);
	}

	onError = function(fnc) {
		if (typeof fnc != "function") {
			throw "have to be a funciton";
		}
		this.#responseAction[Ajax.#ERROR_METHOD] = fnc;
		return this;
	}

	andAfter(fnc) {
		if (typeof fnc != "function") {
			throw "have to be a funciton";
		}
		this.#responseAction[Ajax.#AFTER_METHOD] = fnc;
		return this;
	}
}

