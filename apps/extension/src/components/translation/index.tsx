import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
	text: string
}

const Translation = ({ text }: Props) => {
	const { t } = useTranslation()

	// eslint-disable-next-line
	return <>{`${t(text)}`}</>
}

export default Translation
