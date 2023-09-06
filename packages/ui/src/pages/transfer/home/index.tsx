import { ManifestBuilder, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useState } from 'react'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import Translation from 'ui/src/components/translation'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
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
	from: z.string().min(1, 'Please select account'),
	actions: z.array(actionsSchema),
	message: z.string().or(z.undefined()),
	messageEncrypted: z.boolean().or(z.undefined()),
})

const initialValues = {
	from: '',
	message: '',
	messageEncrypted: false,
	actions: [{ to: '', resources: [] }],
}

export const Home: React.FC = () => {
	const networkId = useNetworkId()
	const sendTransaction = useSendTransaction()

	const [validation, setValidation] = useState<ZodError>()

	const handleSubmit = async (values: typeof initialValues) => {
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

				if (nfts.length > 0) builder = sendNftTokens(builder, [{ from: values.from, to: action.to, nfts }])
				if (tokens.length > 0) builder = sendFungibleTokens(builder, [{ from: values.from, to: action.to, tokens }])
			}
		})

		const manifest = builder.build()
		const convertedInstructions = await RadixEngineToolkit.Instructions.convert(
			manifest.instructions,
			networkId,
			'String',
		)

		sendTransaction({
			version: 1,
			transactionManifest: convertedInstructions.value as string,
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
