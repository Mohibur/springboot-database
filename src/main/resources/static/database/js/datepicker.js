"use strict";
class DatePicker {
	static DATE_PICKER_ID = "style-KddyN8aTbk3WRivQ4e9kdiS0wXnGDJL3WhFcUdXF"
	static #CLASS_JUMP_FIELD = `date-jump-field-${DatePicker.DATE_PICKER_ID}`;
	static #CLASS_CAPTION = `datepicker-caption-${DatePicker.DATE_PICKER_ID}`;
	static #CLASS_ELEMENT = `datepicker-element-${DatePicker.DATE_PICKER_ID}`;
	static #CLASS_PARENT = `datepicker-parent-${DatePicker.DATE_PICKER_ID}`;
	static #CLASS_PARENT_HIDE = `datepicker-hide-parent-${DatePicker.DATE_PICKER_ID}`;
	static #CLASS_WEEKDAY_CELL = `datepicker-weekday-cell-${DatePicker.DATE_PICKER_ID}`;
	static #CLASS_DATECELL = `datepicker-datecell-${DatePicker.DATE_PICKER_ID}`
	static #CLASS_DATECELL_SAT = `datepicker-datecell-sat-${DatePicker.DATE_PICKER_ID}`
	static #CLASS_DATECELL_SUN = `datepicker-datecell-sun-${DatePicker.DATE_PICKER_ID}`
	static #CLASS_DATECELL_OUT = `datepicker-datecell-out-${DatePicker.DATE_PICKER_ID}`;
	static #CLASS_DATECELL_TODAY = `datepicker-datecell-today-${DatePicker.DATE_PICKER_ID}`;
	static #CLASS_DATECELL_SELECTED = `datepicker-datecell-selected-${DatePicker.DATE_PICKER_ID}`;
	static #CLASS_MONTH_CELL = `datepicker-month-cell-${DatePicker.DATE_PICKER_ID}`;
	#element;
	#randomId;
	#parentDiv;

	constructor(el) {
		this.#randomId = "div-id-" + z.makeid();
		this.#style();
		this.#configureElement(el);
		/////////////////////////////////////////////
		this.#parentDiv = z(document.body).child("div").id(this.#randomId)
			.addCls([DatePicker.#CLASS_PARENT, DatePicker.#CLASS_PARENT_HIDE]);

		document.addEventListener("click", function(pd) {
			return function(e) {
				if (pd.getId() != e.target.getAttribute("data-magic")) {
					pd.hide();
				}
			}
		}(this));

		return this;
	}

	#style() {
		z.addStyle(`
		.${DatePicker.#CLASS_JUMP_FIELD} {
			border: 1px solid gold;
			padding: 4px;
			text-align: center;
			border-radius: 5px;
			cursor: pointer;
			font-size: x-small;
			background: #afafaf;
			cursor: pointer;
		}

		.${DatePicker.#CLASS_CAPTION} {
			font-size: x-small;
			background: #faaf30;
		}

		.${DatePicker.#CLASS_ELEMENT} {
			text-align: center;
			background: #fff6f6;
			/*
			(CELL_WIDTH + (DATE_CELL_PADDING=4) * 2 + (BORDER=1)*2 + (DEFAULT_CEL_SPACING=2))* (COL_COUNT=7) + (DEFAULT_CEL_SPACING=2)
			*/
			width: 250px;
			border: 1px solid #a6a6a6;
			border-radius: 5px;
			height: 25px;
		}

		.${DatePicker.#CLASS_PARENT} {
			position: absolute;
			border: 1px solid gold;
			background: #afafaf;
		}

		.${DatePicker.#CLASS_PARENT_HIDE} {
			display: none;
		}

		.${DatePicker.#CLASS_WEEKDAY_CELL},
		.${DatePicker.#CLASS_DATECELL},
		.${DatePicker.#CLASS_DATECELL_OUT},
		.${DatePicker.#CLASS_DATECELL_TODAY},
		.${DatePicker.#CLASS_DATECELL_SELECTED},
		.${DatePicker.#CLASS_DATECELL_SAT},
		.${DatePicker.#CLASS_DATECELL_SUN} {
			height: 23.4px;
			width: 23.4px;
			border: 1px solid gold;
			padding: 4px;
			border-radius: 5px;
			font-size: x-small;
		}

		.${DatePicker.#CLASS_DATECELL_SAT} {
			background: #b4dcff;
			cursor: pointer;
			text-align:center;
		}

		.${DatePicker.#CLASS_DATECELL_SUN} {
			background: #ffba6c;
			cursor: pointer;
			text-align:center;
		}

		.${DatePicker.#CLASS_WEEKDAY_CELL} {
			text-align: center;
			cursor: default;
			background: #78c0bc;
			cursor: cursor;
		}

		.${DatePicker.#CLASS_DATECELL_TODAY} {
			background: #799f9f;;
			text-align: center;
		}

		.${DatePicker.#CLASS_DATECELL_SELECTED} {
			background: #446444;
			text-align: center;
		}

		.${DatePicker.#CLASS_DATECELL} {
			background: #ffffff;
			cursor: pointer;
			text-align: center;
		}

		.${DatePicker.#CLASS_DATECELL_OUT} {
			vertical-align: bottom;
			text-align: right;
			background: #949494;
			cursor: default;
		}

		.${DatePicker.#CLASS_MONTH_CELL} {
			border: 1px solid #ff8989;
			border-radius: 5px;
			background: #faaf30;
			cursor: default;
			font-size: x-small;
			text-align: center;
		}`, DatePicker.DATE_PICKER_ID);
	}

	/*
	* configure the input element
	*/
	#configureElement(el) {
		this.#element = z(el).attr("data-magic", this.#randomId).cls(DatePicker.#CLASS_ELEMENT).readOnly(true);
		this.#element.on("focus", function(pd) {
			return function() {
				if (pd.isHidden()) {
					pd.show();
					let date = new Date(this.value);
					pd.calendar(isNaN(date) ? new Date() : date);
				} else {
					pd.hide()
				}
			}
		}(this));
	}

	isHidden() {
		return this.#parentDiv.hasCls(DatePicker.#CLASS_PARENT_HIDE);
	}

	hide() {
		this.#parentDiv.addCls(DatePicker.#CLASS_PARENT_HIDE);
	}

	show() {
		var rect = this.#element.rect();
		this.#parentDiv.css("left", rect.left + "px").css("top", (parseInt(rect.bottom) + 2) + "px");
		this.#parentDiv.rmCls(DatePicker.#CLASS_PARENT_HIDE);
	}

	getId() {
		return this.#randomId;
	}

	#createAllDate(tBody, dt) {
		let inpDt = new Date(this.#element);
		let today = new Date();
		// work date
		let wDt = dt.firstDate();
		if (wDt.getDay() != 0) wDt = dt.printCalendarFirstDate();
		
		for (let rowcount = 0; rowcount < 6; rowcount++) {
			let row = tBody.row();
			for (let i = 0; i < 7; i++) {
				let cell = row.cell().html(wDt.getDate()).cls(DatePicker.#CLASS_WEEKDAY_CELL).attr("data-magic", this.#randomId);
				// date out of the month range;
				if (!wDt.isSameMonth(dt)) {
					cell.cls(DatePicker.#CLASS_DATECELL_OUT);
				} else {
					if(wDt.isSun()) {
						cell.cls(DatePicker.#CLASS_DATECELL_SUN);
					} else if(wDt.isSat()) {
						cell.cls(DatePicker.#CLASS_DATECELL_SAT);
					} else {
						cell.cls(DatePicker.#CLASS_DATECELL);
					}
					cell.attr("data-date", wDt.toString());
					cell.click(function(pad) {
						return function() {
							pad.setValue(g(this).attr("data-date"));
							pad.hide();
						}
					}(this));
				}

				let selDay;
				if (isNaN(inpDt)) selDay = false;
				else selDay = wDt.isSameDate(inpDt)

				if ((selDay && this.#element.val() == "") || (today.isSameDate(wDt) && !selDay)) {
					cell.cls(DatePicker.#CLASS_DATECELL_TODAY);
				} else if (selDay) {
					cell.cls(DatePicker.#CLASS_DATECELL_SELECTED);
				}
				wDt = wDt.tomorrow();
			}
		}
	}

	calendar(sDate) {
		this.#parentDiv.html("");
		let tbl = this.#parentDiv.child("table");
		tbl.caption().html(sDate.jpFormattedDate()).cls(DatePicker.#CLASS_CAPTION);
		let tHead = tbl.thead();
		this.#makeChangeMonth(sDate, tHead);
		let row = tHead.row();
		row.cell().html("Sun").cls(DatePicker.#CLASS_WEEKDAY_CELL).attr("data-magic", this.#randomId)
		row.cell().html("Mon").cls(DatePicker.#CLASS_WEEKDAY_CELL).attr("data-magic", this.#randomId)
		row.cell().html("Tue").cls(DatePicker.#CLASS_WEEKDAY_CELL).attr("data-magic", this.#randomId)
		row.cell().html("Wed").cls(DatePicker.#CLASS_WEEKDAY_CELL).attr("data-magic", this.#randomId)
		row.cell().html("Thu").cls(DatePicker.#CLASS_WEEKDAY_CELL).attr("data-magic", this.#randomId)
		row.cell().html("Fri").cls(DatePicker.#CLASS_WEEKDAY_CELL).attr("data-magic", this.#randomId)
		row.cell().html("Sat").cls(DatePicker.#CLASS_WEEKDAY_CELL).attr("data-magic", this.#randomId)
		this.#createAllDate(tbl.tbody(), sDate)
	}

	#makeChangeMonth(d, thead) {
		let row = thead.row();
		row.cell().cls(DatePicker.#CLASS_JUMP_FIELD).attr("data-magic", this.#randomId).html("<<").title("Previous Year").click(function(d, obj) {
			return function() {
				obj.calendar(d.lastYear());
			}
		}(d, this));

		row.cell().cls(DatePicker.#CLASS_JUMP_FIELD).attr("data-magic", this.#randomId).html("<").title("Previous Month").click(function(d, obj) {
			return function() {
				obj.calendar(d.lastMonth());
			}
		}(d, this));
		row.cell().cls(DatePicker.#CLASS_MONTH_CELL).attr("data-magic", this.#randomId).html(d.getFullMonth()).title("Selected Month").colSpan(3);

		row.cell().cls(DatePicker.#CLASS_JUMP_FIELD).attr("data-magic", this.#randomId).html(">").title("Next Month").click(function(d, obj) {
			return function() {
				obj.calendar(d.nextMonth());
			}
		}(d, this));

		row.cell().cls(DatePicker.#CLASS_JUMP_FIELD).attr("data-magic", this.#randomId).html(">>").title("Next Year").click(function(d, obj) {
			return function() {
				obj.calendar(d.nextYear());
			}
		}(d, this));
		return row;
	}

	setValue(value) {
		this.#element.val(value);
	}
}
