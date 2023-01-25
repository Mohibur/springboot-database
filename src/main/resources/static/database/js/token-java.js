TokenJava = {
	// range will define start and end. in case of picking comment start and end will be used;
	// order: 1
	range: [{
		rule: RangeRules.SL_C,
		css: "color:#117311;",
	}, {
		rule: RangeRules.ML_C,
		css: "color:#117311;"
	}, {
		rule: RangeRules.ML_JAVA,
		css: "color:#000088;"
	}],
	// will use provided funtion. 
	// if no function is provided then default 
	// order: 2
	number: {
		rule: function(token) {
			if (token.match(/^[0-9.]+[fdl]$/)) {
				token = token.slice(0, -1);
			}
			if (token.match(/^\s+$/)) return false;
			token = Number(token);
			return !isNaN(token);
		},
		css: "color: #3333bb"
	},
	// will have match as start with and end with.
	// this is useful, since, we did not add @ in symbol list;
	startEnd: [
		{
			startsWith: "@",
			endsWith: undefined,
			css: "color: gray;",
			type: "ANNOTATION"
		}
	],
	// this is flat match
	matches: [{
		// rule can be: [equal, regexp]
		rule: "equal",
		match: ".",
		css: "color:black;",
		type: "DOT"
	}],
	single: {
		css: "color:#3f8f3f;"
	},
	double: {
		css: "color: #2d0aff;"
	},

	contains: [
		{
			css: "color:#7f0055; font-weight:bold;",
			kw: ["import", "package"],
		},
		{
			css: "color:blue;",
			kw: ["int", "long", "var", "float", "double", "String", "null"]
		},
		{
			css: "color:blue;",
			kw: ["class", "interface", "abstract", "selaed"]
		},
		{
			css: "color:blue;",
			kw: ["static", "final"]
		},
		{
			css: "color: #000088;",
			kw: ["public", "private", "protected"],
		},
		{
			css: "color: #000088;",
			kw: ["throw", "throws", "try", "catch", "finally"]
		},
		{
			css: "color: #68977d;",
			kw: ["+", "-", "*", "/", "|", "&", "!", "%", "=",
				"+=", "-=", "*=", "/=", "%=", "!=", "->", "|=", "&=", "&&", "||", "++", "--", ";"],
		},
		{
			kw: ["[", "]", "{", "}", "(", ")"],
			css: "color:#570026;"
		}
	],
	rest: {
		css: "color: #000000;"
	}
}
