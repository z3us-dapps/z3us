import React from 'react'
import { useTranslation } from 'react-i18next'

import { capitalizeFirstLetter as textCapitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

interface TTranslationProps {
	text: string
	capitalizeFirstLetter?: boolean
}

const translationDefaultProps = {
	capitalizeFirstLetter: false,
}

const Translation = ({ text, capitalizeFirstLetter }: TTranslationProps) => {
	const { t } = useTranslation()

	const translatedString = `${t(text)}`

	if (capitalizeFirstLetter) {
		return <>{textCapitalizeFirstLetter(translatedString)}</>
	}

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{translatedString}</>
}

Translation.defaultProps = translationDefaultProps

export default Translation
