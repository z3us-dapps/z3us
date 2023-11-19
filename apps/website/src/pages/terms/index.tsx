import { TextPage } from '@/components/layouts/text-page'
import { Meta } from '@/components/meta'
import { allDocs } from 'contentlayer/generated'
import React from 'react'

interface DocPageProps {
	params: {
		slug: string[]
	}
}

function getDocFromParams({ params }: DocPageProps) {
	const slug = params.slug?.join('/') || ''
	const doc = allDocs.find(_doc => _doc.slugAsParams === slug)

	if (!doc) {
		return null
	}

	return doc
}

// eslint-disable-next-line react/function-component-definition
export default function TermsPage(props: { doc: any }) {
	const { doc } = props

	return (
		<>
			<Meta
				title="Z3US: terms and conditions"
				description="A community centered open source browser wallet for the Radix DLT network."
				slug="terms"
			/>
			<TextPage mdxCode={doc.body.code} />
		</>
	)
}

export const getStaticProps = () => {
	const doc = getDocFromParams({ params: { slug: ['terms'] } })

	return {
		props: {
			title: 'Terms page',
			doc,
		},
	}
}
