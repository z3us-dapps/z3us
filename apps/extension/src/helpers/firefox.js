import fs from 'fs'

fs.cpSync('dist', 'dist-firefox', { recursive: true })

const manifest = JSON.parse(fs.readFileSync('dist-firefox/manifest.json', 'utf8'))
const content = {
	...manifest,
	permissions: manifest.permissions.filter(permission => permission !== 'offscreen'),
	web_accessible_resources: manifest.web_accessible_resources.map(res => {
		delete res['use_dynamic_url']
		return res
	}),
	background: {
		scripts: ['service-worker-loader.js'],
		type: 'module',
	},
	browser_specific_settings: {
		gecko: {
			id: 'webextension@z3us.com',
			strict_min_version: '112.0',
		},
	},
}

fs.writeFileSync('dist-firefox/manifest.json', JSON.stringify(content, null, 2))
