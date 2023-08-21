import React, { useEffect, useRef } from 'react'

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
				<FormField type="text" label="from" name="from" ref={inputRef} />
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
