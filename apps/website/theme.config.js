// theme.config.js
export default {
	projectLink: 'https://github.com/shuding/nextra', // GitHub link in the navbar
	docsRepositoryBase: 'https://github.com/shuding/nextra/blob/master', // base URL for the docs repository
	titleSuffix: ' – Nextra',
	nextLinks: true,
	prevLinks: true,
	search: true,
	customSearch: null, // customizable, you can use algolia for example
	darkMode: true,
	footer: true,
	footerText: `MIT ${new Date().getFullYear()} © z3us.`,
	footerEditLink: `Edit this page on GitHub`,
	logo: (
		<>
			<span>z3us</span>
		</>
	),
	head: (
		<>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="description" content="Nextra: the next docs builder" />
			<meta name="og:title" content="Nextra: the next docs builder" />
		</>
	),
}
