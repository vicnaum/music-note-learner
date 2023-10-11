// .eslintrc.js
module.exports = {
	// ... other settings
	extends: [
		// ... other extends
		'plugin:prettier/recommended',
	],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'warn',
	},
};
