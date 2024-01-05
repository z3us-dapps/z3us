import type { ManifestV3Export } from '@crxjs/vite-plugin'
import { defineManifest } from '@crxjs/vite-plugin'

import { version } from '../../../package.json'
import matches from './content_matches.json'
import host_permissions from './host_permissions.json'

const [major, minor, patch] = version.replace(/[^\d.-]+/g, '').split(/[.-]/)
const permissions = [
	'storage',
	'offscreen',
	'unlimitedStorage',
	'notifications',
	'activeTab',
	'scripting',
	'contextMenus',
]

const manifest: ManifestV3Export = {
	manifest_version: 3,
	version: `${major}.${minor}.${patch}`,
	version_name: version,
	author: 'https://z3us.com',
	name: 'Z3US',
	short_name: 'Z3US',
	description: 'An open source community centered browser wallet for the Radix DLT network.',
	omnibox: { keyword: 'z3us' },
	action: {
		default_popup: 'src/pages/app/system.html',
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
	permissions,
	host_permissions,
	background: {
		service_worker: 'src/browser/background.ts',
		type: 'module',
	},
	content_scripts: [
		{
			js: ['src/browser/content-script.ts'],
			matches,
			run_at: 'document_idle',
			all_frames: true,
		},
	],
	content_security_policy: {
		extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
	},
}

export default defineManifest(manifest)
