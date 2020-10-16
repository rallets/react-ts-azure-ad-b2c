module.exports = {
	extends: [
		"react-app", // Create React App base settings
		"eslint:recommended", // recommended ESLint rules
		"plugin:@typescript-eslint/recommended", // recommended rules from @typescript-eslint/eslint-plugin
		"prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with Prettier.
		"plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display Prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	rules: {
		"prettier/prettier": ["error", {
			"printWidth": 140,
			"singleQuote": true,
			"tabWidth": 4,
			"useTabs": true,
			"endOfLine": "auto",
			"jsxBracketSameLine": true,
			"bracketSpacing": true,
		}],
		"@typescript-eslint/no-empty-function": ["error", { "allow": ["arrowFunctions"] }]
	},
};
