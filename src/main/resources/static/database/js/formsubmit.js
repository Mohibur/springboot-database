"use strict";
// we do not need more than one object
const FORM_SUBMIT_VER = "1.0.0";
class FormSubmit {
	#form;
	constructor() {
		this.#form = $.mk("form").hide().target("_blank").id($.makeid())
		return this;
	}

	add(name, val) {
		let output = name;
		if (typeof name != "string" && name instanceof GeneralHTMLProcessor) {
			val = name.val();
			output = name.name() == null || name.name() == "" ? name.id() : name.name()
		}
		this.#form.child("input").type("hidden").name(output).val(val);
		return this;
	}


	data(name, val) {
		return this.add(name, val);
	}

	target(target) {
		this.#form.target(target);
		return this;
	}

	action(action) {
		this.#form.action(action);
		return this;
	}

	get() {
		this.#form.method("GET");
		this.#form.submit();
	}

	post() {
		this.#form.method("POST");
		this.#form.submit();
	}

	reset() {
		this.#form.html("");
		return this;
	}
}

$.formSubmit = function() {
	return new FormSubmit();
}
