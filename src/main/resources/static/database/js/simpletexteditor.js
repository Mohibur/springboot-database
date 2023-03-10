class SimpleTextEditor {
	#editor_class
	#line_counter_class;

	#commonid;
	#parent;
	#lineCounter;
	#editor;
	#lineCountCache;
	constructor(selector) {
		this.#commonid = $.makeid();
		this.#setClass();
		this.#parent = $(selector);
		this.#cons();
	}
	#setClass() {
		this.#editor_class = `editor-class-${this.#commonid}`
		this.#line_counter_class = `line-counter-class-${this.#commonid}`;
	}
	#blockerClass() {
		$.addStyle(`
		.${this.#editor_class}, .${this.#line_counter_class} {
			font-size: 12px;
			line-height: 16px;
			outline: none;
			resize: none;
			height: 400px;
		}

		.${this.#editor_class} {
			background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAQCAYAAADedLXNAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TRZGKgxVFHTJUJwuiIo5ahSJUCLVCqw4mL/2DJg1Jiouj4Fpw8Gex6uDirKuDqyAI/oC4ujgpukiJ9yWFFjFeeLyP8+45vHcfINRKTLPaxgFNt81kPCamM6tixysCCKEP/RiSmWXMSVICvvV1T91Ud1Ge5d/3Z3WrWYsBAZF4lhmmTbxBPL1pG5z3icOsIKvE58RjJl2Q+JHrisdvnPMuCzwzbKaS88RhYjHfwkoLs4KpEU8RR1RNp3wh7bHKeYuzVqqwxj35C0NZfWWZ67SGEcciliBBhIIKiijBRpR2nRQLSTqP+fgHXb9ELoVcRTByLKAMDbLrB/+D37O1cpMTXlIoBrS/OM7HCNCxC9SrjvN97Dj1EyD4DFzpTX+5Bsx8kl5tapEjoGcbuLhuasoecLkDDDwZsim7UpCWkMsB72f0TRmg9xboWvPm1jjH6QOQolklboCDQ2A0T9nrPu/ubJ3bvz2N+f0AQ4pylAV8ZIgAAAAGYktHRAATAP8AAGCbYsAAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfnAQwXHCEDVO9kAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAABBJREFUGNNjYBgFFIAWdAEAChQAhQOVECQAAAAASUVORK5CYII=');
			width: 500px;
			display: inline-block;
			font-family: lucida console, courier new, courier, monospace;
			margin: 0;
			padding-left: 60px;
			border-radius: 0;
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			border-top: 1px solid rgb(196, 160, 0);
			border-right: 1px solid rgb(196, 160, 0);
			border-bottom: 1px solid rgb(196, 160, 0);
		}

		.${this.#line_counter_class} {
			margin: 0;
			border-radius: 0;
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			font-family: lucida console, courier new, courier, monospace;
			display: flex;
			overflow-y: hidden;
			text-align: right;
			box-shadow: none;
			position: absolute;
			width: 3.5rem;
			/* Determine appearance of line counter */
			background-color: #3E3D32;
			color: #928869;
			border-top: 1px solid gold;
			border-left: 1px solid gold;
			border-bottom: 1px solid gold;
		}

		.${this.#line_counter_class}:focus-visible, .${this.#editor_class}:focus-visible {
			outline: none;
		}`, this.#commonid);
	}

	#cons() {
		this.#lineCountCache = 0;
		this.#blockerClass();
		this.#lineCounter = this.#parent.mk("textarea").Cls(this.#line_counter_class);
		this.#editor = this.#parent.mk("textarea").Cls(this.#editor_class);

		this.#editor.on('scroll', () => {
			this.#lineCounter.ScrollTop(this.#editor.ScrollTop());
			this.#lineCounter.ScrollLeft(this.#editor.ScrollLeft());
		});


		this.#editor.on('input', function(obj) {
			return function() {
				obj.#line_counter();
			}
		}(this));
	}

	#line_counter() {
		var lineCount = this.#editor.Val().split('\n').length;
		var outarr = [];
		if (this.#lineCountCache != lineCount) {
			for (var i = 0; i < lineCount; i++) {
				outarr[i] = (i + 1) + '.';
			}
			this.#lineCounter.Val(outarr.join('\n'));
		}
		this.#lineCountCache = lineCount;
	}

	text(v) {
		return this.val(v);
	}

	val(v) {
		if (typeof v == "undefined") return this.#editor.val(v);
		this.#editor.val(v);
		this.#line_counter();
		return this;
	}

	setHeight(num) {
		num = parseFloat(num);
		this.#lineCounter.css("height", num + "px");
		this.#editor.css("height", num + "px");;
		return this;
	}

	setWidth(num) {
		num = parseFloat(num);
		this.#editor.css("width", num + "px");;
		return this;
	}
}
