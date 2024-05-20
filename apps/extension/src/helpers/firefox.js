import fs from 'fs'

fs.cpSync('dist', 'dist-firefox', { recursive: true })

const firefoxExcludedPermissions = ['offscreen', 'sidePanel']

const manifest = JSON.parse(fs.readFileSync('dist-firefox/manifest.json', 'utf8'))
const content = {
	...manifest,
	permissions: manifest.permissions.filter(permission => !firefoxExcludedPermissions.includes(permission)),
	web_accessible_resources: manifest.web_accessible_resources.map(res => {
		delete res['use_dynamic_url']
		return res
	}),
	background: {
		persistent: true,
		scripts: ['service-worker-loader.js'],
	},
	browser_specific_settings: {
		gecko: {
			id: 'webextension@z3us.com',
			strict_min_version: '112.0',
		},
	},
	sidebar_action: {
		open_at_install: false,
		default_title: 'Z3US',
		default_panel: 'src/pages/app/system.html',
		default_icon: {
			16: 'favicon-16x16.png',
			48: 'favicon-48x48.png',
			128: 'favicon-128x128.png',
		},
	},
}

fs.writeFileSync('dist-firefox/manifest.json', JSON.stringify(content, null, 2))
