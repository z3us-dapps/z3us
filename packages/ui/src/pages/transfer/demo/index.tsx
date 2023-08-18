import React, { useEffect, useRef } from 'react'

import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { NumberField } from 'ui/src/components/form/number-field'
import { TextField } from 'ui/src/components/form/text-field'
import Translation from 'ui/src/components/translation'

import { TransferWrapper } from '../components/transfer-wrapper'

export const Demo: React.FC = () => {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log((e.currentTarget as any).elements)
	}

	return (
		<TransferWrapper
			transaction={null}
			title={<Translation capitalizeFirstLetter text="transfer.demo.title" />}
			description={<Translation capitalizeFirstLetter text="transfer.demo.description" />}
		>
			<Form onSubmit={handleSubmit}>
				<FieldsGroup name="testgroup">
					<TextField name="txt" ref={inputRef} />
					<NumberField name="nr" />
				</FieldsGroup>
			</Form>
		</TransferWrapper>
	)
}

export default Demo
