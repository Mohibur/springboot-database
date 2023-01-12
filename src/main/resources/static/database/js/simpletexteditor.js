class SimpleTextEditor {
	#commonid
	#parent;
	#lineCounter;
	#editor
	#lineCountCache;
	constructor(selector) {
		this.#commonid = $.makeid();
		this.#parent = $(selector);
		this.#cons();
	}

	#blockerClass() {
		$.addStyle(`
		.editor-class-${this.#commonid}, .lineCounter-class-${this.#commonid} {
			font-size: 12px;
			line-height: 16px;
			outline: none;
			resize: none;
			height: 400px;
		}

		.editor-class-${this.#commonid} {
			background:  url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAQCAYAAADTasWKAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TpSoVBzuIOGSoTi2IijhqFYpQIdQKrTqYvPQPmjQkKS6OgmvBwZ/FqoOLs64OroIg+APi6uKk6CIl3pcUWsR44fE+zrvn8N59gNCoMM3qGgc03TbTyYSYza2KoVcEEAbQi5jMLGNOklLwra976qa6i/Ms/74/q1/NWwwIiMSzzDBt4g3i6U3b4LxPHGElWSU+J46ZdEHiR64rHr9xLros8MyImUnPE0eIxWIHKx3MSqZGPEUcVTWd8oWsxyrnLc5apcZa9+QvDOf1lWWu0xpBEotYggQRCmooowIbcdp1Uiyk6Tzh4x92/RK5FHKVwcixgCo0yK4f/A9+z9YqTE54SeEE0P3iOB+jQGgXaNYd5/vYcZonQPAZuNLb/moDmPkkvd7WokfAwDZwcd3WlD3gcgcYejJkU3alIC2hUADez+ibcsDgLdC35s2tdY7TByBDs0rdAAeHwFiRstd93t3TObd/e1rz+wEWUHKC3yF8pgAAAAZiS0dEABMA/wAAYJtiwAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+cBDAATNYd/kiMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAEUlEQVQI12NgGDbgPwMDAwMABcsBADn7m50AAAAASUVORK5CYII=');
			width: 500px;
			display: inline-block;
			font-family: lucida console, courier new, courier, monospace;
			margin: 0;
			padding-left: 60px;
			border-radius: 0;
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			font-family: lucida console, courier new, courier, monospace;
			border-top: 1px solid rgb(196, 160, 0);
			border-right: 1px solid rgb(196, 160, 0);
			border-bottom: 1px solid rgb(196, 160, 0);
		}

		.lineCounter-class-${this.#commonid} {
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

		.lineCounter-class-${this.#commonid}:focus-visible, .editor-class-${this.#commonid}:focus-visible {
			outline: none;
		}`, this.#commonid);
	}

	#cons() {
		this.#lineCountCache = 0;
		this.#blockerClass();
		this.#lineCounter = this.#parent.mk("textarea").cls(`lineCounter-class-${this.#commonid}`);
		this.#editor = this.#parent.mk("textarea").cls(`editor-class-${this.#commonid}`);

		this.#editor.on('scroll', () => {
			this.#lineCounter.scrlTop(this.#editor.scrlTop());
			this.#lineCounter.scrlLeft(this.#editor.scrlLeft());
		});


		this.#editor.on('input', function(obj) {
			return function() {
				obj.#line_counter();
			}
		}(this));
	}

	#line_counter() {
		var lineCount = this.#editor.val().split('\n').length;
		var outarr = [];
		if (this.#lineCountCache != lineCount) {
			for (var i = 0; i < lineCount; i++) {
				outarr[i] = (i + 1) + '.';
			}
			this.#lineCounter.val(outarr.join('\n'));
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
}
