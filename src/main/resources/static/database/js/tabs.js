class TabWindow {
	#tab_active_class
	#tab_parent_class
	#tab_class
	#escape_class
	#work_window_body

	#motherwindow;
	#tabwindow; // hold the tabs;
	#processwindow; // window to hold the window 
	#commonid;
	#tabs = {};

	constructor(selector) {
		this.#commonid = $.makeid();
		this.#setClassNames();
		this.#motherwindow = $(selector);
		this.#styleClass();
		this.#createTabBock();
		return this;
	}


	getCommonId() {
		return this.#commonid;
	}

	#createTabBock() {
		this.#tabwindow = this.#motherwindow.mk("div").addCls(this.#tab_parent_class);
		this.#motherwindow.mk("div").css("clear", "both");
		this.#processwindow = this.#motherwindow.mk("div").addCls(this.#work_window_body);
		this.#tabwindow.mk("div").addCls(this.#escape_class).html("&nbsp;");
	}

	#setClassNames() {
		this.#tab_active_class = `tab-active-class-${this.#commonid}`;
		this.#tab_parent_class = `tab-parent-class-${this.#commonid}`;
		this.#tab_class = `tab-class-${this.#commonid}`;
		this.#escape_class = `escape-class-${this.#commonid}`;
	}

	#styleClass() {
		$.addStyle(`
		.${this.#tab_parent_class} {
			background: white;
		}

		.${this.#tab_class} {
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

		.${this.#tab_class}:hover {
			background: #cfcfcf89;
		}

		.${this.#tab_active_class} {
			background: #eff5ef;
			font-weight:bold;
			font-style: italic;
			border-bottom: 1px solid #eff5ef;
			border-top: 1px solid #a9f5a9;
			border-top-right-radius: 50px 50px;
		}

		.${this.#escape_class} {
			float:left;
		}

    .${this.#work_window_body} {
      border-top: 1px solid #eff5ef;
      width: 100%;
      background: #eff5ef;
    }

		`, this.#commonid);
	}

	add(tabid, caption, selector, isactive, onclick) {
		if (isactive == true || isactive === true) isactive = true;
		else isactive = false;
		let s = this.#tabwindow.mk("div").addCls(this.#tab_class).html(caption).Id(tabid);

		this.#tabwindow.mk("div").addCls(this.#escape_class).html("&nbsp;");
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
			s.addCls(this.#tab_active_class).show();
			w.show();
		} else {
			w.hide();
		}
		return this;
	}

	clearSelection() {
		this.#processwindow.each(h => h.hide());
		this.#tabwindow.each(this.#tab_class, h => h.rmCls(this.#tab_active_class))
	}

	goto(id, onclick) {
		let { t, w } = this.#tabs[id];
		this.clearSelection();
		t.addCls(this.#tab_active_class);
		w.show();
		if (typeof onclick == "function") onclick();
	}

}
