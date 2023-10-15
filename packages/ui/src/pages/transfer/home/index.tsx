import { ManifestBuilder, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'
import { sendFungibleTokens, sendNftTokens } from 'ui/src/manifests/transfer'

import TransferFormFields from './components/transfer-form-fields'
import * as styles from './styles.css'

const positiveNumberValidator = (value: number): boolean => value > 0

const messages = defineMessages({
	button_submit: {
		defaultMessage: 'Send',
	},
	validation_token_address: {
		defaultMessage: 'Please select token',
	},
	validation_token_amount: {
		defaultMessage: 'Please enter a valid amount',
	},
	validation_nft_collection: {
		defaultMessage: 'Please select NFT collection',
	},
	validation_nft_item: {
		defaultMessage: 'Please select NFT item',
	},
	validation_from: {
		defaultMessage: 'Please select account',
	},
	validation_to: {
		defaultMessage: 'Please select recipient',
	},
})

const initialValues = {
	from: '',
	message: '',
	messageEncrypted: false,
	actions: [{ to: '', resources: [] }],
}

export const Home: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const sendTransaction = useSendTransaction()

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(() => {
		const tokenSchema = z.object({
			address: z.string().min(1, intl.formatMessage(messages.validation_token_address)),
			amount: z
				.number()
				.refine(positiveNumberValidator, { message: intl.formatMessage(messages.validation_token_amount) }),
		})

		const nftSchema = z.object({
			address: z.string().min(1, intl.formatMessage(messages.validation_nft_collection)),
			id: z.string().min(1, intl.formatMessage(messages.validation_nft_item)),
			// ids: z.array(z.string().min(1, intl.formatMessage(messages.validation_nft_items_empty))).min(1, intl.formatMessage(messages.validation_nft_items)),
		})

		const tokenOrNft = tokenSchema.or(nftSchema)

		const actionsSchema = z.object({
			to: z.string().min(1, intl.formatMessage(messages.validation_to)),
			resources: z.array(tokenOrNft),
		})

		return z.object({
			from: z.string().min(1, intl.formatMessage(messages.validation_from)),
			actions: z.array(actionsSchema),
			message: z.string().or(z.undefined()),
			messageEncrypted: z.boolean().or(z.undefined()),
		})
	}, [])

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

		await sendTransaction({
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
			submitButtonTitle={intl.formatMessage(messages.button_submit)}
			className={styles.formWrapper}
		>
			<ValidationErrorMessage message={validation?.flatten().formErrors[0]} />
			<TransferFormFields />
		</Form>
	)
}

export default Home
