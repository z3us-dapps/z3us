import React, { useEffect, useRef } from 'react'
import { z } from 'zod'

import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from 'ui/src/components/accordion'
import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { NumberField } from 'ui/src/components/form/fields/number-field'
import { SelectField } from 'ui/src/components/form/fields/select-field'
import { TextField } from 'ui/src/components/form/fields/text-field'
import Translation from 'ui/src/components/translation'

import { TransferWrapper } from '../components/transfer-wrapper'

const initialValues = {
	from: '',
	test: '1',
	to: '',
	message: '',
	tokens: [],
	nfts: [],
}

const validationSchema = z.object({
	from: z.string().min(1, 'Please select account'),
	to: z.string().min(1, 'Please enter recipient'),
})

export const Demo: React.FC = () => {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		if (values.nfts) values.nfts = Object.values(values.nfts).map(nft => ({ ...nft, ids: nft.ids.map(({ id }) => id) }))

		// @TODO: parse form values into manifest
		// @TODO: call api and handle request error (toast?)
	}

	const handleValidate = (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) return result.error
		return undefined
	}

	return (
		<TransferWrapper
			transaction={null}
			title={<Translation capitalizeFirstLetter text="transfer.demo.title" />}
			description={<Translation capitalizeFirstLetter text="transfer.demo.description" />}
		>
			<Form onSubmit={handleSubmit} validate={handleValidate} initialValues={initialValues}>
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

				<TextField label="from" name="from" ref={inputRef} />
				<SelectField
					label="test"
					name="test"
					data={[
						{ id: '1', title: 'settings.session.select.oneMinute' },
						{ id: '5', title: 'settings.session.select.fiveMinutes' },
						{ id: '30', title: 'settings.session.select.thirtyMinutes' },
						{ id: '60', title: 'settings.session.select.sixtyMinutes' },
					]}
				/>
				<TextField label="to" name="to" />
				<TextField label="message" name="message" validate={() => {}} />

				<FieldsGroup name="tokens">
					<TextField label="resource" name="resource" />
					<NumberField label="amount" name="amount" />

					{/* <TextArea />
					<Select option={[]} name="xxx"/>
					<ToggleField />

					<AccountSelect name="from" />
					<AddressBookSelect name="to" />
					<FungibleAmountField />
					<NonFungibleIdsSelect /> */}
				</FieldsGroup>

				<FieldsGroup name="nfts">
					<TextField label="resource" name="resource" />
					<FieldsGroup name="ids">
						<TextField label="id" name="id" />
					</FieldsGroup>
				</FieldsGroup>
			</Form>
		</TransferWrapper>
	)
}

export default Demo
