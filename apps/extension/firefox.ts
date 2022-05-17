import pkg from './package.json'

export default {
	manifest_version: 2,
	version: pkg.version,
	author: 'https://z3us.com',
	name: 'Z3US',
	short_name: 'Z3US',
	description: 'An open source community centered browser wallet for the Radix DLT network.',
	browser_action: {
		default_icon: {
			'16': 'favicon-16x16.png',
			'48': 'favicon-48x48.png',
			'128': 'favicon-128x128.png',
		},
		default_popup: 'popup-theme-light.html',
		default_title: 'Z3US',
	},
	permissions: ['storage', 'unlimitedStorage', 'webRequest', 'notifications', 'https://*/*'],
	background: {
		scripts: ['src/lib/background.ts'],
		persistent: true,
	},
	content_scripts: [
		{
			matches: ['<all_urls>'],
			run_at: 'document_start',
			all_frames: true,
			js: ['src/lib/content-script.ts'],
		},
	],
	web_accessible_resources: [
		'popup-theme-dark.html',
		'popup-theme-system.html',
		'assets/inpage.js',
		'assets/actions.js',
	],
	browser_specific_settings: {
		gecko: {
			id: 'webextension@z3us.com',
			strict_min_version: '68.0',
		},
	},
}
