import { FaqPage } from '@/components/layouts/faq-page'
import { Meta } from '@/components/meta'
import React from 'react'

// eslint-disable-next-line react/function-component-definition
export default function Faq() {
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
