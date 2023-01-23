String.prototype.matchCount = function(reg) {
	return ([...this.matchAll(reg)] || []).length;
}

String.prototype.toInt = function() {
	return parseInt(this);
}

String.prototype.toFloat = function() {
	return parseFloat(this);
}

String.prototype.toNumber = function() {
	return number(this);
}


String.prototype.isTrue = function() {
	if ((this !== "0" && this.toLowerCase !== "false") || this.toLowerCase === "true") return true;
	return false;
}

String.prototype.isFalse = function(v) {
	if (this === "0" || this.toLowerCase() === "false") return true;
	return false;
}

String.prototype.encode = function() {
	return this
		.replaceAll(/&/g, "&amp;")
		.replaceAll(/ /g, "&nbsp;")
		.replaceAll(/\t/g, "&emsp;")
		.replaceAll(/</g, "&lt;")
		.replaceAll(/>/g, "&gt;")
		.replaceAll(/\n/g, "<br>");
}