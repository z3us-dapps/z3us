import { ManifestBuilder, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useSearchParams } from 'react-router-dom'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'
import { sendFungibleTokens, sendNftTokens } from 'ui/src/manifests/transfer'

import TransferFormFields, { MAX_MESSAGE_LENGTH } from './components/transfer-form-fields'
import * as styles from './styles.css'

const positiveNumberValidator = (value: number): boolean => value > 0

const messages = defineMessages({
	button_submit: {
		id: '9WRlF4',
		defaultMessage: 'Send',
	},
	validation_token_address_required: {
		id: 'IXFNmv',
		defaultMessage: 'Resource is required',
	},
	validation_token_address: {
		id: 'gO3ocF',
		defaultMessage: 'Please select token',
	},
	validation_token_amount_required: {
		id: 'jU3fsF',
		defaultMessage: 'Amount is required',
	},
	validation_token_amount: {
		id: 'FrNeCi',
		defaultMessage: 'Please enter a valid amount',
	},
	validation_nft_collection_required: {
		id: 'IwILnS',
		defaultMessage: 'NFT collection is required',
	},
	validation_nft_collection: {
		id: 'jPKpFd',
		defaultMessage: 'Please select NFT collection',
	},
	validation_nft_item_required: {
		id: 'BKQjIu',
		defaultMessage: 'NFT item is required',
	},
	validation_nft_item: {
		id: 'yTLHBR',
		defaultMessage: 'Please select NFT item',
	},
	validation_from: {
		id: 'w2XWRt',
		defaultMessage: 'Please select account',
	},
	validation_message: {
		id: '9Xeynx',
		defaultMessage: 'Message can not be longer than {length}',
	},
	validation_to: {
		id: 'qdvh1F',
		defaultMessage: 'Please select recipient',
	},
	validation_values_length: {
		id: '8Dy6y8',
		defaultMessage: 'At least one group is required',
	},
})

export const Home: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const sendTransaction = useSendTransaction()
	const [searchParams] = useSearchParams()
	const accountId = searchParams.get('accountId') || '-'
	const resourceId = searchParams.get('resourceId')
	const rawNftId = searchParams.get('nftId')

	const initialValues = useMemo(
		() => ({
			from: [
				{
					account: accountId !== '-' ? accountId : '',
					actions: [
						{
							to: '',
							resources: resourceId
								? [{ address: resourceId, id: rawNftId ? decodeURIComponent(rawNftId) : '', amount: 0 }]
								: [],
						},
					],
				},
			],
			message: '',
			messageEncrypted: false,
		}),
		[accountId, resourceId, rawNftId],
	)

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(() => {
		const tokenSchema = z.object({
			address: z
				.string({ required_error: intl.formatMessage(messages.validation_token_address_required) })
				.min(1, intl.formatMessage(messages.validation_token_address)),
			amount: z
				.number({ required_error: intl.formatMessage(messages.validation_token_amount_required) })
				.refine(positiveNumberValidator, { message: intl.formatMessage(messages.validation_token_amount) }),
		})

		const nftSchema = z.object({
			address: z
				.string({ required_error: intl.formatMessage(messages.validation_nft_collection_required) })
				.min(1, intl.formatMessage(messages.validation_nft_collection)),
			id: z
				.string({ required_error: intl.formatMessage(messages.validation_nft_item_required) })
				.min(1, intl.formatMessage(messages.validation_nft_item)),
			// ids: z.array(z.string().min(1, intl.formatMessage(messages.validation_nft_items_empty))).min(1, intl.formatMessage(messages.validation_nft_items)),
		})

		const tokenOrNft = tokenSchema.or(nftSchema)

		const actionsSchema = z.object({
			to: z.string().min(1, intl.formatMessage(messages.validation_to)),
			resources: z.array(tokenOrNft),
		})

		return z.object({
			from: z
				.array(
					z.object({
						account: z.string().min(1, intl.formatMessage(messages.validation_from)),
						actions: z.array(actionsSchema),
					}),
				)
				.min(1, intl.formatMessage(messages.validation_values_length)),
			message: z
				.string()
				.max(MAX_MESSAGE_LENGTH, intl.formatMessage(messages.validation_message, { length: MAX_MESSAGE_LENGTH }))
				.or(z.undefined()),
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
		values.from.forEach(({ account, actions }) =>
			actions.forEach(action => {
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

					if (nfts.length > 0) builder = sendNftTokens(builder, [{ from: account, to: action.to, nfts }])
					if (tokens.length > 0) builder = sendFungibleTokens(builder, [{ from: account, to: action.to, tokens }])
				}
			}),
		)

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
