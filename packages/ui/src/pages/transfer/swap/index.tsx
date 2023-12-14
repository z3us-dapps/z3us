import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { ZodError } from 'zod'
import { object, z } from 'zod'

import { Box } from 'ui/src/components/box'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import {
	CirclePlusIcon,
	DotsHorizontalCircleIcon,
	InformationIcon,
	ShareIcon,
	TrashIcon,
} from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
// import { Tabs, TabsContent } from 'ui/src/components/tabs'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { brandImages } from 'ui/src/context/images-provider'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'

import { FormFields as AstrolecentFormFields } from './components/astrolescent/form-fields'
import { FormFields as OciFormFields } from './components/oci/form-fields'
import * as styles from './styles.css'

const messages = defineMessages({
	button_add_swap: {
		id: 'Clukea',
		defaultMessage: 'Add another swap',
	},
	validation_token_required: {
		id: 'IXFNmv',
		defaultMessage: 'Resource is required',
	},
	tab_oci: {
		id: 'fmr4rE',
		defaultMessage: 'Oci',
	},
	tab_astrolecent: {
		id: 'CrAj8T',
		defaultMessage: 'Astrolecent',
	},
	button_submit: {
		id: 's8BnAC',
		defaultMessage: 'Swap',
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

const OCI = 'oci'
const ASTROLECENT = 'astrolecent'

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

export const Swap: React.FC = () => {
	const intl = useIntl()
	const sendTransaction = useSendTransaction()
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const [formValues, setFormValues] = useState<typeof init>(init)
	const [validation, setValidation] = useState<ZodError>()

	const exchangeInfo = useMemo(
		() => ({
			[OCI]: {
				title: intl.formatMessage(messages.tab_oci),
				image: brandImages.OCI_SWAP,
			},
			[ASTROLECENT]: {
				title: intl.formatMessage(messages.tab_astrolecent),
				image: brandImages.ASTROLESCENT,
			},
		}),
		[],
	)

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
				<Box className={styles.swapExchangeButtonWrapper}>
					<Box paddingRight="small">
						<Text size="medium">Exchange:</Text>
					</Box>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Box
								component="button"
								display="inline-flex"
								alignItems="center"
								className={clsx(
									plainButtonStyles.plainButtonHoverWrapper,
									plainButtonStyles.plainButtonHoverUnderlineWrapper,
								)}
							>
								<Text size="medium" color="inherit">
									Ociswap
								</Text>
								<Box paddingLeft="small">
									<ResourceImageIcon size="small" address={brandImages.OCI_SWAP} />
								</Box>
							</Box>
						</DropdownMenuTrigger>
						<DropdownMenuPortal>
							<DropdownMenuContent align="start" sideOffset={2} className={styles.swapDropdownContentWrapper}>
								{Object.entries(exchangeInfo).map(([key, { title, image }]) => (
									<DropdownMenuItem
										key={key}
										onSelect={() => {
											console.log('key ', key)
										}}
									>
										<DropdownMenuLeftSlot>
											<ResourceImageIcon size="small" address={image} />
										</DropdownMenuLeftSlot>
										<Box display="flex" marginLeft="small">
											<Text size="xsmall" truncate>
												{title}
											</Text>
										</Box>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenuPortal>
					</DropdownMenu>
				</Box>
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
					<OciFormFields />

					{/* <Tabs
						list={[
							{ label: intl.formatMessage(messages.tab_oci), value: OCI },
							{ label: intl.formatMessage(messages.tab_astrolecent), value: ASTROLECENT },
						]}
						defaultValue={OCI}
					>
						<TabsContent value={OCI}>
							<OciFormFields />
						</TabsContent>
						<TabsContent value={ASTROLECENT}>
							<AstrolecentFormFields />
						</TabsContent>
					</Tabs> */}
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
