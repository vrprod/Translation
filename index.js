require('dotenv').config()
const { Languages } = require('./database')

let arr = [
	'ae',
	'cs',
	'de',
	'el',
	'en',
	'es',
	'fr',
	'hu',
	'id',
	'il',
	'it',
	'ko',
	'lt',
	'nl',
	'pl',
	'pt',
	'ru',
	'sv-SE',
	'tr',
	'uk',
	'vi',
	'zh-TW',
	'zh-CN',
	'ja',
	'da',
]

for (let i = 0; i < arr.length; i++) {
	const TransFile = require('./locales/' + arr[i] + '/translation.json')
	const { lang } = TransFile[0]

	Object.entries(TransFile[1]).forEach(async ([name, text]) => {
		let LangItem = await Languages.findOne({ name, lang })

		if (LangItem === null) LangItem = new Languages()

		LangItem.overwrite({
			lang,
			name,
			text
		})

		console.log(`Adding => ${lang} : ${name}`)
		await LangItem.save()
		console.log(`Added! ${lang} : ${name}`)
	})
}
