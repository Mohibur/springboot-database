"use strict";

/*
	* extension added to
	* * Object 
	* * String
	* * Array
	* * Date
*/

// all Objects
Object.prototype.isObject = () => true;
Object.prototype.isString = () => false;
Object.prototype.isFunction = () => false;
Object.prototype.isArray = () => false;


// Function
Object.prototype.isFunction = () => true;

// String
String.prototype.isString = () => true;

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
	return Number(this);
}

String.prototype.toBoolean = String.prototype.toBool = function() {
	if (this === "0" || this.toLowerCase() === "false") return false;
	if (this === "1" || this.toLowerCase() === "true") return true;
	return NaN;
}

String.prototype.isTrue = function() {
	return this.toLowerCase() === "true" || this.toLowerCase() === "1" || this.toLowerCase() == "yes";
}

String.prototype.isFalse = function(v) {
	return this === "0" || this.toLowerCase() === "false" || this.toLocaleUpperCase() == "no";
}

String.prototype.encode = function() {
	return this
		.replaceAll(/&/g, "&amp;")
		.replaceAll(/ /g, "&nbsp;")
		.replaceAll(/\t/g, "&emsp;")
		.replaceAll(/</g, "&lt;")
		.replaceAll(/>/g, "&gt;")
}

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Array Class///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

Object.prototype.isArray = () => true;


Array.prototype.each = Array.prototype.forEach;

Array.prototype.contains = Array.prototype.includes;

Array.prototype.has = Array.prototype.includes;

Array.prototype.match = function(v, s) {
	if (typeof s == "undefined" || s == null || !isNaN(parseInt(s))) s = 0;
	for (let i = s; i < this.length; i++) {
		if (this[i].match(v)) return i;
	}
}

Array.prototype.matchesAll = function(v, s) {
	if (typeof s == "undefined" || s == null || !isNaN(parseInt(s))) s = 0;
	let r = [];
	for (let i = s; i < this.length; i++) {
		if (this[i].match(v)) r.push(i);
	}
	return r;
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////Date Class///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//\\ FORMATS
Date.prototype.formattedDate = function() {
	return (this.getFullYear()) + "-" + this.paddedMonth() + "-" + this.paddedDate();
}

Date.prototype.jpFormattedDate = function() {
	return (this.getFullYear()) + "年" + this.paddedMonth() + "月" + this.paddedDate() + "日";
}

Date.prototype.toString = function() {
	return this.formattedDate();
}

Date.prototype.getFullMonth = function() {
	return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][this.getMonth()];
}

Date.prototype.getShortMonth = function() {
	return this.getFullMonth().slice(0, 3);
}

Date.prototype.paddedMonth = function() {
	let m = this.getMonth() + 1;
	return m < 10 ? "0" + m : "" + m;
}

Date.prototype.paddedDate = function() {
	let d = this.getDate();
	return d < 10 ? "0" + d : "" + d;
}

Date.prototype.getFullDay = function() {
	return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()];
}

Date.prototype.getShortDay = function() {
	return this.getFullDay().slice(0, 3);
}

Date.prototype.printCalendarFirstDate = function() {
	return new Date(this.getFullYear(), this.getMonth(), 1 - new Date(this.getFullYear(), this.getMonth(), 1).getDay());
};



////////////////////////////////////////////////////////////////////////////////

//\\ JUMP
Date.prototype.nextMonth = function() {
	return new Date(this.getFullYear(), this.getMonth() + 1, this.getDate());
}

Date.prototype.prevMonth = function() {
	return new Date(this.getFullYear(), this.getMonth() - 1, this.getDate());
}

Date.prototype.lastMonth = function() {
	return new Date(this.getFullYear(), this.getMonth() - 1, this.getDate());
}

Date.prototype.nextYear = function() {
	return new Date(this.getFullYear() + 1, this.getMonth(), this.getDate());
}

Date.prototype.lastYear = function() {
	return new Date(this.getFullYear() - 1, this.getMonth(), this.getDate());
}

Date.prototype.prevYear = function() {
	return new Date(this.getFullYear() - 1, this.getMonth(), this.getDate());
}

Date.prototype.firstDate = function() {
	return new Date(this.getFullYear(), this.getMonth() - 1, 1);
}

Date.prototype.lastDate = function() {
	return new Date(this.getFullYear(), this.getMonth() + 1, 0);
}

Date.prototype.tomorrow = function() {
	return new Date(this.getFullYear(), this.getMonth(), this.getDate() + 1)
}

Date.prototype.yesterday = function() {
	return new Date(this.getFullYear(), this.getMonth(), this.getDate() - 1)
}
////////////////////////////////////

//\\ Math
Date.prototype.addDays = function(nd) {
	return new Date(this.getFullYear(), this.getMonth(), this.getDate() + nd);
}

Date.prototype.addMonths = function(nm) {
	return new Date(this.getFullYear(), this.getMonth() + nm, this.getDate());
}

Date.prototype.addYears = function(ny) {
	return new Date(this.getFullYear() + ny, this.getMonth(), this.getDate());
}


//\\ COMPARE
Date.prototype.isSameMonth = function(d2) {
	return this.getFullYear() == d2.getFullYear() && this.getMonth() == d2.getMonth()
}

Date.prototype.isSameDate = function(d2) {
	return this.getFullYear() == d2.getFullYear() && this.getMonth() == d2.getMonth() && this.getDate() == d2.getDate();
}

Date.prototype.isOldMonth = function(d) {
	if ((d.getFullYear() < this.getFullYear()) || (d.getFullYear() == this.getFullYear() && d.getMonth() < this.getMonth())) return true;
	return false;
}

Date.prototype.isFuture = function(d) {
	return this.getFullYear() < d.getFullYear() ||
		(this.getFullYear() == d.getFullYear() &&
			(this.getMonth() < d.getMonth() ||
				(this.getMonth() == d.getMonth() && this.getDate() < d.getDate())));
}

Date.prototype.isSatOrSun = function() {
	return this.getDay() == 0 || this.getDay() == 6;
}

Date.prototype.isSun = function() {
	return this.getDay() == 0;
}

Date.prototype.isMon = function() {
	return this.getDay() == 1;
}

Date.prototype.isTue = function() {
	return this.getDay() == 2;
}

Date.prototype.isWed = function() {
	return this.getDay() == 3;
}

Date.prototype.isThu = function() {
	return this.getDay() == 4;
}

Date.prototype.isFri = function() {
	return this.getDay() == 5;
}

Date.prototype.isSat = function() {
	return this.getDay() == 6;
}
