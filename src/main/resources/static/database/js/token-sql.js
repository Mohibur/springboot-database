TokenSQL = {
	// import, package
	range: [{
		rule: RangeRules.SL_SQL,
		css: "color:#117311;",
	},
	{
		rule: RangeRules.ML_C,
		css: "color:#117311;"
	},
	{
		rule: RangeRules.set("${", "}", true),
		css: "color: #5a5a5a"
	}],

	number: {
		css: "color: #3333bb"
	},
	single: {
		css: "color:#3f8f3f;"
	},
	double: {
		css: "color: #2d0aff;"
	},
	contains: [
		{
			css: "color: #5a5a5a",
			kw: ["AND", "ANY", "BETWEEN", "CASE", "CHECK", "HAVING", "IN", "IS", "NOT"],
			type: "CONDITION",
			anycase: true // TODO need to implement anycase
		},
		{
			css: "color: #000088",
			kw: ["WHERE", "AS", "BACKUP DATABASE", "DELETE", "EXEC", "INTO", "JOIN", "LIKE", "LIMIT", "NULL", "OR", "SELECT", "SET", "TOP", "TRUNCATE", "UPDATE", "VALUES", "VALUE"],
			type: "DML",
			anycase: true
		},
		{
			css: "color: #000000",
			kw: ["ADD", "ALTER", "COLUMN", "CONSTRAINT", "CREATE", "DATABASE", "DEFAULT", "DESC", "DROP", "EXISTS", "FOREIGN", "INDEX", "KEY", "PRIMARY", "PROCEDURE", "REPLACE", "TABLE", "VIEW"],
			type: "DDL",
			anycase: true
		},
		{
			css: "color: #2f6620;",
			kw: ["ALL", "FROM", "FULL", "INNER", "LEFT", "OUTER", "RIGHT", "UNION"],
			type: "FROM",
			anycase: true
		},
		{
			css: "color: #000000",
			kw: ["DISTINCT", "ROWNUM", "UNIQUE"],
			type: "METHOD",
			anycase: true
		},
		{
			css: "color: #000000",
			kw: ["ASC", "BY", "DSC", "ORDER", "GROUP", "BY"],
			type: "ORDER",
			anycase: true
		},
		{
			css: "color:#2d0400;",
			kw: ["+", "-", "*", "/", "|", "&", "!", "%", "=", "+=", "-=", "*=", "/=", "%=", "!=", "->", "|=", "&=", "&&", "||", "++", "--", ";", "."],
			type: "SYMBOL",
			anycase: true
		},
		{
			kw: ["[", "]", "{", "}", "(", ")"],
			css: "color:#200410;",
			type: "ENCLOSE",
			anycase: false
		}
	],
	rest: {
		css: "color: black;",
		type: "VARIABLE"
	}
}
