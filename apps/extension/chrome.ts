import pkg from './package.json'

export default {
	manifest_version: 3,
	version: pkg.version,
	author: 'https://z3us.com',
	name: 'Z3US',
	short_name: 'Z3US',
	description: 'An open source community centered browser wallet for the Radix DLT network.',
	action: {
		default_popup: 'popup-theme-light.html',
		default_title: 'Z3US',
		default_icon: {
			'16': 'favicon-16x16.png',
			'48': 'favicon-48x48.png',
			'128': 'favicon-128x128.png',
		},
	},
	commands: {
		_execute_action: {
			suggested_key: {
				default: 'Alt+Shift+Z',
				windows: 'Alt+Shift+Z',
				mac: 'Alt+Shift+Z',
				chromeos: 'Alt+Shift+Z',
				linux: 'Alt+Shift+Z',
			},
		},
	},
	icons: {
		'16': 'favicon-16x16.png',
		'48': 'favicon-48x48.png',
		'128': 'favicon-128x128.png',
	},
	permissions: ['storage', 'unlimitedStorage', 'notifications', 'activeTab'],
	host_permissions: [
		'*://*.radixdlt.com/*',
		'*://api.bitfinex.com/*',
		'*://api.coingecko.com/api/*',
		'*://www.radixscan.io/*',
		'*://api.ociswap.com/v1/graphql/*',
		'*://dogecubex.live/api/*',
		'*://api.astrolescent.com/z3us/*',
		'*://pjhht6w8p9.execute-api.eu-west-2.amazonaws.com/prod/*',
	],
	background: {
		service_worker: 'src/lib/background.ts',
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
		{
			matches: ['<all_urls>'],
			resources: [
				'popup-theme-dark.html',
				'popup-theme-system.html',
				'assets/inpage.js',
				'assets/actions.js',
				// 'pte_manifest_compiler_bg.wasm',
			],
		},
	],
}
