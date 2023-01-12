class TabWindow {
	#motherwindow;
	#tabwindow; // hold the tabs;
	#processwindow; // window to hold the window 
	#commonid;
	#tabs = {};

	constructor(selector) {
		this.#commonid = $.makeid();
		this.#motherwindow = $(selector);
		this.#styleClass();
		this.#createTabBock();
		return this;
	}

	getCommonId() {
		return this.#commonid;
	}

	#createTabBock() {
		this.#tabwindow = this.#motherwindow.mk("div").addCls(`tab-parent-class-${this.#commonid}`);
		this.#motherwindow.mk("div").css("clear", "both");
		this.#processwindow = this.#motherwindow.mk("div").addCls(`work-window-body-${this.#commonid}`);
		this.#tabwindow.mk("div").addCls(`escape-class-${this.#commonid}`).html("&nbsp;");
	}

	#styleClass() {
		$.addStyle(`
		.tab-parent-class-${this.#commonid} {
			background: white;
		}
		.tab-class-${this.#commonid} {
			background: #afafaf89;
			float: left;
			max-width:120px;
			min-width:120px;
			padding: 5px;
			border: 1px solid #ceffce;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			text-align: center;
			cursor: pointer;
			margin-left: 5px;
		}

		.tab-class:hover-${this.#commonid} {
			background: #cfcfcf89;
		}

		.tab-active-class-${this.#commonid} {
			background: #eff5ef;
			font-weight:bold;
			font-style: italic;
			border-bottom: 1px solid #eff5ef;
			border-top: 1px solid #a9f5a9;
			border-top-right-radius: 50px 50px;
		}

    .escape-class-${this.#commonid} {
      float:left;
    }

    .work-window-body-${this.#commonid} {
      border-top: 1px solid #eff5ef;
      width: 100%;
      background: #eff5ef;
    }

		`, this.#commonid);
	}

	add(tabid, caption, selector, isactive, onclick) {
		if (isactive == true || isactive === true) isactive = true;
		else isactive = false;
		let s = this.#tabwindow.mk("div").addCls(`tab-class-${this.#commonid}`).html(caption).id(tabid);

		this.#tabwindow.mk("div").addCls(`escape-class-${this.#commonid}`).html("&nbsp;");
		let w = $(selector);
		this.#tabs[tabid] = { t: s, w: w };
		this.#processwindow.append(w);

		s.on("click", function(obj, tabid, onclick) {
			return function() {
				obj.goto(tabid, onclick);
			}
		}(this, tabid, onclick))

		if (isactive) {
			this.clearSelection();
			s.addCls(`tab-active-class-${this.#commonid}`).show();
			w.show();
		} else {
			w.hide();
		}
		return this;
	}

	clearSelection() {
		this.#processwindow.each(h => h.hide());
		this.#tabwindow.each(`.tab-class-${this.#commonid}`, h => h.rmCls(`tab-active-class-${this.#commonid}`))
	}

	goto(id, onclick) {
		let { t, w } = this.#tabs[id];
		this.clearSelection();
		t.addCls(`tab-active-class-${this.getCommonId()}`);
		w.show();
		if (typeof onclick == "function") onclick();
	}

}
