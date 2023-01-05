"use strict";
//\\ FORMATS
Date.prototype.formattedDate = function() {
	return (this.getFullYear()) + "-" + this.paddedMonth() + "-" + this.paddedDate();
}

Date.prototype.jpFormattedDate = function() {
	return (this.getFullYear()) + "年" + this.paddedMonth() + "月" + this.paddedMonth() + "日";
}

Date.prototype.toString = function() {
	return this.formattedDate();
}

Date.prototype.getFullMonth = function() {
	return ["January", "February", "March", "April", "May",	"June", "July", "August", "September", "October", "November", "December"][this.getMonth()];
}

Date.prototype.getShortMonth = function() {
	return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][this.getMonth()];
}

Date.prototype.paddedMonth = function() {
	let m = this.getMonth() + 1;
	return m < 10 ? "0" + m : m + "";
}

Date.prototype.getFullDay = function() {
	return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()];
}

Date.prototype.getShortDay = function() {
	return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][this.getDay()];
}

Date.prototype.printCalendarFirstDate = function() {
	return new Date(this.getFullYear(), this.getMonth(), 1 - new Date(this.getFullYear(), this.getMonth(), 1).getDay());
};

Date.prototype.paddedDate = function() {
	return this.getDate() < 10 ? "0" + this.getDate() : this.getDate() + "";
}


/////////////////////////////////////////////////////////

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
	return  this.getFullYear() < d.getFullYear() ||
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
