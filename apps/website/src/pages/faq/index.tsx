import { FaqPage } from '@/components/layouts/faq-page'
import { Meta } from '@/components/meta'
import React, { useEffect } from 'react'

import { darkThemeClass } from 'ui/src/components/system/theme.css'

// eslint-disable-next-line react/function-component-definition
export default function Faq() {
	useEffect(() => {
		setTimeout(() => {
			document.documentElement.classList.add(darkThemeClass)
			document.documentElement.classList.add('dark')
		}, 50)
	}, [])

	return (
		<>
			<Meta
				title="Z3US: Frequently asked questions"
				description="A community centered open source browser wallet for the Radix DLT network."
				slug="faq"
			/>
			<FaqPage />
		</>
	)
}
