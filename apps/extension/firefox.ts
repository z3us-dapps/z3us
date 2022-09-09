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
	commands: {
		_execute_browser_action: {
			suggested_key: {
				default: 'Alt+Shift+Z',
			},
		},
	},
	permissions: [
		'storage',
		'unlimitedStorage',
		'notifications',
		'activeTab',
		'*://*.radixdlt.com/*',
		'*://api.bitfinex.com/*',
		'*://api.coingecko.com/api/*',
		'*://www.radixscan.io/*',
		'*://api.ociswap.com/v1/graphql/*',
		'*://dogecubex.live/api/*',
		'*://api.astrolescent.com/z3us/*',
		'*://pjhht6w8p9.execute-api.eu-west-2.amazonaws.com/prod/*',
		'*://api.dsor.io/*',
	],
	optional_permissions: ['http://*/*', 'https://*/*'],
	background: {
		scripts: ['src/lib/background.ts'],
		persistent: true,
	},
	content_scripts: [
		{
			matches: ['http://*/*', 'https://*/*'],
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
		// 'pte_manifest_compiler_bg.wasm',
	],
	browser_specific_settings: {
		gecko: {
			id: 'webextension@z3us.com',
			strict_min_version: '68.0',
		},
	},
}
