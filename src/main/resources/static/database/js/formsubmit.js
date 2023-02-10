"use strict";
// we do not need more than one object
const FORM_SUBMIT_VER = "1.0.0";
class FormSubmit {
	#form;
	constructor() {
		this.#form = $.mk("form").Hide().Target("_blank").Id($.makeid())
		return this;
	}

	add(name, val) {
		let output = name;
		if (typeof name != "string") {
			val = name.Val();
			output = name.Name() == null || name.Name() == "" ? name.Id() : name.Name()
		}

		this.#form.mk("input").Type("hidden").Name(output).Val(val);

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
		this.#form.Method("POST");
		this.#form.Submit();
	}

	reset() {
		this.#form.Html("");
		return this;
	}
}

$.formSubmit = function() {
	return new FormSubmit();
}
