import matches from './content_matches.json'
import hosts from './host_permissions.json'
import pkg from './package.json'

export default {
	manifest_version: 3,
	version: pkg.version,
	author: 'https://z3us.com',
	name: 'Z3US',
	short_name: 'Z3US',
	description: 'An open source community centered browser wallet for the Radix DLT network.',
	action: {
		default_popup: 'popup-theme-system.html',
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
	permissions: ['storage', 'unlimitedStorage', 'notifications', 'activeTab', 'scripting'],
	host_permissions: hosts.concat(['http://*/*', 'https://*/*']),
	background: {
		service_worker: 'src/lib/background.ts',
	},
	content_scripts: [
		{
			matches,
			run_at: 'document_start',
			all_frames: true,
			js: ['src/lib/content-script.ts'],
		},
	],
	web_accessible_resources: [
		{
			matches: ['http://*/*', 'https://*/*'],
			resources: [
				'popup-theme-dark.html',
				'popup-theme-light.html',
				'popup-theme-system.html',
				'assets/*',
				// 'pte_manifest_compiler_bg.wasm',
			],
		},
	],
}
