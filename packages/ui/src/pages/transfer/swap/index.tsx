import { useKnownAddresses } from 'packages/ui/src/hooks/dapp/use-known-addresses'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network'
import React, { useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { CirclePlusIcon, TrashIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'

import { Dex } from './dex'
import * as styles from './styles.css'

const messages = defineMessages({
	button_add_swap: {
		id: 'Clukea',
		defaultMessage: 'Add another swap',
	},
	button_submit: {
		id: 's8BnAC',
		defaultMessage: 'Swap',
	},
	validation_token_required: {
		id: 'IXFNmv',
		defaultMessage: 'Resource is required',
	},
	validation_token: {
		id: 'gO3ocF',
		defaultMessage: 'Please select token',
	},
	validation_amount_required: {
		id: 'jU3fsF',
		defaultMessage: 'Amount is required',
	},
	validation_amount: {
		id: 'FrNeCi',
		defaultMessage: 'Please enter a valid amount',
	},
	validation_account: {
		id: 'w2XWRt',
		defaultMessage: 'Please select account',
	},
	validation_swaps: {
		id: 'X54VY/',
		defaultMessage: 'Add least one action is required',
	},
	error_toast: {
		id: 'fjqZcw',
		defaultMessage: 'Failed submitting transaction to the network',
	},
	success_toast: {
		id: 'Gkt0d0',
		defaultMessage: 'Successfully submitted transaction to the network',
	},
	toast_action_label: {
		id: 'K7AkdL',
		defaultMessage: 'Show',
	},
})

const init = {
	swaps: [
		{
			dex: 'oci',
			manifest: '',
			account: '',
			from: [{ address: '', amount: 0 }],
			to: [{ address: '', amount: 0 }],
		},
	],
}

const OCI_RESOURCE_ADDRESS = 'resource_rdx1t52pvtk5wfhltchwh3rkzls2x0r98fw9cjhpyrf3vsykhkuwrf7jg8'

export const Swap: React.FC = () => {
	const intl = useIntl()
	const sendTransaction = useSendTransaction()
	const location = useLocation()
	const navigate = useNavigate()
	const networkId = useNetworkId()
	const [searchParams] = useSearchParams()
	const accountIndexes = useAccountIndexes()
	const { data: knownAddresses } = useKnownAddresses()

	const [formValues, setFormValues] = useState<typeof init>(init)
	const [validation, setValidation] = useState<ZodError>()

	useEffect(() => {
		if (!knownAddresses) return
		const accountIds = Object.keys(accountIndexes)
		if (accountIds.length === 0) return
		setFormValues({
			swaps: [
				{
					dex: 'oci',
					manifest: '',
					account: accountIds[0],
					from: [{ address: knownAddresses.resourceAddresses.xrd, amount: 0 }],
					to: [{ address: networkId === 1 ? OCI_RESOURCE_ADDRESS : '', amount: 0 }],
				},
			],
		})
	}, [networkId, accountIndexes, knownAddresses])

	const validationSchema = useMemo(() => {
		const tokenSchema = z.object({
			address: z
				.string({ required_error: intl.formatMessage(messages.validation_token_required) })
				.min(1, intl.formatMessage(messages.validation_token)),
			amount: z.coerce
				.number({ required_error: intl.formatMessage(messages.validation_amount_required) })
				.gt(0, { message: intl.formatMessage(messages.validation_amount) }),
		})

		return z.object({
			swaps: z
				.array(
					z.object({
						dex: z.literal('oci').or(z.literal('astrolecent')),
						manifest: z.string().min(1),
						account: z.string().min(1, intl.formatMessage(messages.validation_account)),
						from: z.array(tokenSchema).length(1),
						to: z.array(tokenSchema).length(1),
					}),
				)
				.min(1, intl.formatMessage(messages.validation_swaps)),
		})
	}, [])

	const handleSubmit = async (values: typeof init) => {
		setValidation(undefined)
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		const transactionManifest = values.swaps.map(swap => swap.manifest).join('\n')

		await sendTransaction({
			version: 1,
			transactionManifest,
		})
			.then(value => {
				toast.success(intl.formatMessage(messages.success_toast), {
					description: value.status,
					action: {
						label: intl.formatMessage(messages.toast_action_label),
						onClick: () => {
							searchParams.set('tx', `${value.transactionIntentHash}`)
							navigate(`${location.pathname}?${searchParams}`)
						},
					},
				})
				setFormValues(init)
			})
			.catch(error => {
				toast.error(intl.formatMessage(messages.error_toast), { description: error.message || error.error })
			})
	}

	return (
		<Box width="full">
			<Form onSubmit={handleSubmit} initialValues={formValues} errors={validation?.format()}>
				<Box className={styles.swapValidationWrapper}>
					<ValidationErrorMessage message={validation?.flatten().formErrors[0]} />
				</Box>

				<FieldsGroup
					name="swaps"
					defaultKeys={1}
					addTrigger={
						<Button
							styleVariant="secondary"
							sizeVariant="large"
							fullWidth
							leftIcon={
								<Box marginLeft="small">
									<CirclePlusIcon />
								</Box>
							}
						>
							{intl.formatMessage(messages.button_add_swap)}
						</Button>
					}
					trashTrigger={
						<Button styleVariant="ghost" sizeVariant="small" iconOnly>
							<TrashIcon />
						</Button>
					}
				>
					<Dex />
				</FieldsGroup>

				<Box className={styles.swapFromButtonWrapper}>
					<SubmitButton>
						<Button sizeVariant="large" styleVariant="primary" fullWidth>
							{intl.formatMessage(messages.button_submit)}
						</Button>
					</SubmitButton>
				</Box>
			</Form>
		</Box>
	)
}

export default Swap
