import { ManifestBuilder } from '@radixdlt/radix-engine-toolkit'
import React, { useState } from 'react'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useSendTransaction } from 'ui/src/hooks/dapp/use-send-transaction'
import { sendFungibleTokens, sendNftTokens } from 'ui/src/manifests/transfer'

import TransferFormFields from './components/transfer-form-fields'
import * as styles from './styles.css'

const positiveNumberValidator = (value: number): boolean => value > 0

const resourcesSchema = z.object({
	address: z.string().min(1, 'Please select token'),
	amount: z.number().refine(positiveNumberValidator, { message: 'Please enter a valid amount' }),
	ids: z.array(z.string().min(1, 'NFT id can not be empty')).min(1, 'Please select NFT items'),
})

const actionsSchema = z.object({
	to: z.string().min(1, 'Please enter recipient'),
	resources: z.array(resourcesSchema),
})

const validationSchema = z.object({
	message: z.string(),
	messageEncrypted: z.boolean(),
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

		let manifest = new ManifestBuilder()
		values.actions.forEach(action => {
			if (action.resources?.length > 0) {
				const nfts = []
				const tokens = []
				action.resources.forEach(resource => {
					if (resource.ids?.length > 0) {
						nfts.push(resource)
					} else {
						tokens.push(resource)
					}
				})

				manifest = sendNftTokens(new ManifestBuilder(), [{ from: values.from, to: action.to, nfts }])
				manifest = sendFungibleTokens(new ManifestBuilder(), [{ from: values.from, to: action.to, tokens }])
			}
		})

		sendTransaction({
			version: 1,
			transactionManifest: manifest.build().toString(),
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
			{validation && (
				<Box>
					<Text color="red">{validation.flatten().formErrors[0] || ''}</Text>
				</Box>
			)}
			<TransferFormFields />
		</Form>
	)
}

export default Home
