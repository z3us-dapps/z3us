import { ManifestBuilder } from '@radixdlt/radix-engine-toolkit'
import { ValidationErrorMessage } from 'packages/ui/src/components/validation-error-message'
import React, { useState } from 'react'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import Translation from 'ui/src/components/translation'
import { useSendTransaction } from 'ui/src/hooks/dapp/use-send-transaction'
import { sendFungibleTokens, sendNftTokens } from 'ui/src/manifests/transfer'

import TransferFormFields from './components/transfer-form-fields'
import * as styles from './styles.css'

const positiveNumberValidator = (value: number): boolean => value > 0

const tokenSchema = z.object({
	address: z.string().min(1, 'Please select token'),
	amount: z.number().refine(positiveNumberValidator, { message: 'Please enter a valid amount' }),
})

const nftSchema = z.object({
	address: z.string().min(1, 'Please select NFT collection'),
	id: z.string().min(1, 'Please select NFT item'),
	// ids: z.array(z.string().min(1, 'NFT id can not be empty')).min(1, 'Please select NFT items'),
})

const tokenOrNft = tokenSchema.or(nftSchema)

const actionsSchema = z.object({
	to: z.string().min(1, 'Please enter recipient'),
	resources: z.array(tokenOrNft),
})

const validationSchema = z.object({
	message: z.string(),
	messageEncrypted: z.boolean().or(z.undefined()),
	from: z.string().min(1, 'Please select account'),
	actions: z.array(actionsSchema),
})

const initialValues = {
	from: '',
	message: '',
	messageEncrypted: false,
	actions: [{ to: '', resources: [] }],
}

export const Home: React.FC = () => {
	const [validation, setValidation] = useState<ZodError>()
	const sendTransaction = useSendTransaction()

	const handleSubmit = (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		let builder = new ManifestBuilder()
		values.actions.forEach(action => {
			if (action.resources?.length > 0) {
				const nfts = []
				const tokens = []
				action.resources.forEach(({ address, id, amount }) => {
					if (id) {
						nfts.push({ resource: address, ids: [id] })
					} else {
						tokens.push({ resource: address, amount })
					}
				})

				builder = sendNftTokens(builder, [{ from: values.from, to: action.to, nfts }])
				builder = sendFungibleTokens(builder, [{ from: values.from, to: action.to, tokens }])
			}
		})

		const manifest = builder.build()

		sendTransaction({
			version: 1,
			transactionManifest: manifest.toString(),
			message: values.message,
		})
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={<Translation capitalizeFirstLetter text="transfer.tokensNfts.submitFormButtonTitle" />}
			className={styles.formWrapper}
		>
			<ValidationErrorMessage message={validation?.flatten().formErrors[0]} />
			<TransferFormFields />
		</Form>
	)
}

export default Home
