import React, { useEffect, useRef } from 'react'
import { z } from 'zod'

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
				<FormField type="text" label="from" name="from" ref={inputRef} />
				<FormField type="text" label="to" name="to" />
				<FormField type="textarea" label="message" name="message" validate={() => {}} />

				<FieldsGroup name="tokens">
					<FormField type="text" label="resource" name="resource" />
					<FormField type="number" label="amount" name="amount" />

					{/* <TextArea />
					<Select option={[]} name="xxx"/>
					<ToggleField />

					<AccountSelect name="from" />
					<AddressBookSelect name="to" />
					<FungibleAmountField />
					<NonFungibleIdsSelect /> */}
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
