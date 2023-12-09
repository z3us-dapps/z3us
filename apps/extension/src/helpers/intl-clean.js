import fs from 'fs'

const source = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'))

const locales = ['en', 'zh', 'es', 'ru', 'ar', 'pt', 'fr', 'de', 'it', 'pl', 'jp']

locales.forEach(locale => {
	const destination = JSON.parse(fs.readFileSync(`src/locales/${locale}.json`, 'utf8'))
	Object.keys(destination).map(key => {
		if (!source[key]) delete destination[key]
	})
	fs.writeFileSync(`src/locales/${locale}.json`, JSON.stringify(destination, null, 2))
})
