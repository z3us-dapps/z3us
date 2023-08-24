import React, { useEffect, useRef } from 'react'

import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from 'ui/src/components/accordion'
import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { FormField } from 'ui/src/components/form/form-field'
import Translation from 'ui/src/components/translation'

import { TransferWrapper } from '../components/transfer-wrapper'

const initialValues = {
	from: '',
	to: '',
	message: '',
	tokens: [],
	nfts: [],
}

export const Demo: React.FC = () => {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		if (values.nfts) values.nfts = Object.values(values.nfts).map(nft => ({ ...nft, ids: nft.ids.map(({ id }) => id) }))
		console.log(values)
	}

	return (
		<TransferWrapper
			transaction={null}
			title={<Translation capitalizeFirstLetter text="transfer.demo.title" />}
			description={<Translation capitalizeFirstLetter text="transfer.demo.description" />}
		>
			<Form onSubmit={handleSubmit} initialValues={initialValues}>
				<AccordionRoot key={`accordion-${1}`} type="single" defaultValue={`send-${1}`} collapsible>
					<AccordionItem value={`send-${1}`}>
						<AccordionTrigger>
							<h2>Group one</h2>
						</AccordionTrigger>
						<AccordionContent>
							<Box padding="large">Group one here</Box>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value={`send-${2}`}>
						<AccordionTrigger>
							<h2>Group two</h2>
						</AccordionTrigger>
						<AccordionContent>
							<Box padding="large">Group two here</Box>
						</AccordionContent>
					</AccordionItem>
				</AccordionRoot>

				<FormField type="text" label="from" name="from" ref={inputRef} />
				<FormField type="select" label="from" name="from" ref={inputRef} />
				<FormField type="text" label="to" name="to" />
				<FormField type="textarea" label="message" name="message" />
				<FieldsGroup name="tokens">
					<FormField type="text" label="resource" name="resource" />
					<FormField type="number" label="amount" name="amount" />
				</FieldsGroup>
				<FieldsGroup name="nfts">
					<FormField type="text" label="resource" name="resource" />
					<FieldsGroup name="ids">
						<FormField type="text" label="id" name="id" />
					</FieldsGroup>
				</FieldsGroup>
			</Form>
		</TransferWrapper>
	)
}

export default Demo
