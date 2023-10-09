import type { PersonaDataRequestItem, PersonaDataRequestResponseItem } from '@radixdlt/radix-dapp-toolkit'
import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import SelectField from 'ui/src/components/form/fields/select-field'
import TextField from 'ui/src/components/form/fields/text-field'
import { CirclePlusIcon, Close2Icon, TrashIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from './styles.css'

const messages = defineMessages({
	form_button_title: {
		id: 'modals.persona_data.form.submit_button.title',
		defaultMessage: 'Login',
	},
	email_address: {
		id: 'modals.persona_data.form.email_address',
		defaultMessage: 'Email address',
	},
	button_add_email_address: {
		id: 'modals.persona_data.form.button_add.email_address',
		defaultMessage: 'Add email address',
	},
	validation_email: {
		id: 'modals.persona_data.validation.email',
		defaultMessage: 'Please select valid email',
	},
	validation_emails_required: {
		id: 'modals.persona_data.validation.emails',
		defaultMessage: 'Please select minimum {number} emails',
	},
	validation_emails_exactly: {
		id: 'modals.persona_data.validation.validation_emails_exactly',
		defaultMessage: 'Please select exactly {number} emails',
	},
	phone_number: {
		id: 'modals.persona_data.form.phone_number',
		defaultMessage: 'Phone number',
	},
	button_add_phone_number: {
		id: 'modals.persona_data.form.button_add.phone_number',
		defaultMessage: 'Add phone number',
	},
	validation_phone_number: {
		id: 'modals.persona_data.validation.phone_number',
		defaultMessage: 'Please select valid phone number',
	},
	validation_phone_numbers_required: {
		id: 'modals.persona_data.validation.phone_numbers',
		defaultMessage: 'Please select minimum {number} phone numbers',
	},
	validation_phone_numbers_exactly: {
		id: 'modals.persona_data.validation.validation_phone_numbers_exactly',
		defaultMessage: 'Please select exactly {number} phone numbers',
	},
	close: {
		id: 'modals.persona_data.close_button',
		defaultMessage: 'Cancel',
	},
	variant: {
		id: 'modals.persona_data.form.variant',
		defaultMessage: 'Name variant',
	},
	western: {
		id: 'modals.persona_data.western',
		defaultMessage: 'Western',
	},
	eastern: {
		id: 'modals.persona_data.eastern',
		defaultMessage: 'Eastern',
	},
	nickname: {
		id: 'modals.persona_data.form.nickname',
		defaultMessage: 'Nickname',
	},
	validation_nickname: {
		id: 'modals.persona_data.validation.nickname',
		defaultMessage: 'Please insert valid nickname',
	},
	given_names: {
		id: 'modals.persona_data.form.given_names',
		defaultMessage: 'Given names',
	},
	validation_given_names: {
		id: 'modals.persona_data.validation.given_names',
		defaultMessage: 'Please insert valid given names',
	},
	family_name: {
		id: 'modals.persona_data.form.family_name',
		defaultMessage: 'Family name',
	},
	validation_family_name: {
		id: 'modals.persona_data.validation.family_name',
		defaultMessage: 'Please insert valid family name',
	},
	validation_names_required: {
		id: 'modals.persona_data.validation.names',
		defaultMessage: 'Name details are required',
	},
})

const nameVariants = ['western', 'eastern']

export interface IProps {
	identityAddress: string
	request: PersonaDataRequestItem
	onConfirm: (response: PersonaDataRequestResponseItem) => void
	onCancel: () => void
}

const SelectPersonaModal: React.FC<IProps> = ({ identityAddress, request, onConfirm, onCancel }) => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const networkId = useNetworkId()
	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
	}))

	const [validation, setValidation] = useState<ZodError>()
	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(true)

	const initialValues = {
		names: [
			{
				variant: 'western',
				nickname: personaIndexes?.[identityAddress].label || '',
				givenNames: '',
				familyName: '',
			},
		],
		emailAddresses: [],
		phoneNumbers: [],
	}

	const validationSchema = useMemo(() => {
		const schema: any = {}
		if (request.isRequestingName) {
			schema.names = z
				.array(
					z.object({
						variant: z.literal('western').or(z.literal('eastern')),
						givenNames: z.string().min(1, intl.formatMessage(messages.validation_given_names)),
						familyName: z.string().min(1, intl.formatMessage(messages.validation_family_name)),
						nickname: z.string().min(1, intl.formatMessage(messages.validation_nickname)).or(z.undefined()),
					}),
				)
				.min(1, intl.formatMessage(messages.validation_names_required))
				.max(1, intl.formatMessage(messages.validation_names_required))
		}
		if (request.numberOfRequestedEmailAddresses) {
			const emailSchema = z.object({
				email: z.string().min(1, intl.formatMessage(messages.validation_email)),
			})

			schema.emailAddresses = z.array(emailSchema).min(
				1,
				intl.formatMessage(messages.validation_emails_required, {
					number: request.numberOfRequestedEmailAddresses.quantity,
				}),
			)
			if (request.numberOfRequestedEmailAddresses.quantifier === 'exactly') {
				schema.emailAddresses = schema.emailAddresses.max(
					request.numberOfRequestedEmailAddresses.quantity,
					intl.formatMessage(messages.validation_emails_exactly, {
						number: request.numberOfRequestedEmailAddresses.quantity,
					}),
				)
			}
		}
		if (request.numberOfRequestedPhoneNumbers) {
			const phoneSchema = z.object({
				number: z.string().min(1, intl.formatMessage(messages.validation_phone_number)),
			})

			schema.phoneNumbers = z.array(phoneSchema).min(
				1,
				intl.formatMessage(messages.validation_phone_numbers_required, {
					number: request.numberOfRequestedPhoneNumbers.quantity,
				}),
			)
			if (request.numberOfRequestedPhoneNumbers.quantifier === 'exactly') {
				schema.phoneNumbers = schema.phoneNumbers.max(
					request.numberOfRequestedPhoneNumbers.quantity,
					intl.formatMessage(messages.validation_phone_numbers_exactly, {
						number: request.numberOfRequestedPhoneNumbers.quantity,
					}),
				)
			}
		}

		return z.object(schema)
	}, [])

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleScroll = (event: Event) => {
		const target = event.target as Element
		const { scrollTop } = target

		setIsScrolled(scrollTop > 0)
	}

	const handleSubmit = async (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}
		const response: PersonaDataRequestResponseItem = {}
		if (request.isRequestingName) {
			response.name = values.names[0] as PersonaDataRequestResponseItem['name']
		}
		if (request.numberOfRequestedEmailAddresses) {
			response.emailAddresses = values.emailAddresses.map(({ email }) => email)
		}
		if (request.numberOfRequestedPhoneNumbers) {
			response.phoneNumbers = values.phoneNumbers.map(({ number }) => number)
		}
		onConfirm(response)
		setIsOpen(false)
		setValidation(undefined)
	}

	const handleCancel = () => {
		onCancel()
		setIsOpen(false)
		setValidation(undefined)
	}

	const handleEscapeKeyDown = () => {
		handleCancel()
	}

	const handleOnInteractOutside = () => {
		handleCancel()
	}

	return (
		<DialogRoot open={isOpen} modal>
			<DialogPortal>
				<DialogOverlay className={dialogStyles.dialogOverlay} />
				<DialogContent
					onEscapeKeyDown={handleEscapeKeyDown}
					onInteractOutside={handleOnInteractOutside}
					className={clsx(dialogStyles.dialogContent, styles.content)}
				>
					<ScrollArea onScroll={handleScroll}>
						<Box className={styles.scrollWrapper}>
							<Form
								onSubmit={handleSubmit}
								initialValues={initialValues}
								errors={validation?.format()}
								submitButtonTitle={intl.formatMessage(messages.form_button_title)}
							>
								<FieldsGroup name="names" defaultKeys={1} ignoreTriggers>
									<SelectField
										name="variant"
										placeholder={intl.formatMessage(messages.variant)}
										data={nameVariants.map(variant => ({
											id: variant,
											title: intl.formatMessage(messages[variant]),
										}))}
									/>
									<TextField name="nickname" placeholder={intl.formatMessage(messages.nickname)} />
									<TextField name="givenNames" placeholder={intl.formatMessage(messages.given_names)} />
									<TextField name="familyName" placeholder={intl.formatMessage(messages.family_name)} />
								</FieldsGroup>
								<FieldsGroup
									name="emailAddresses"
									defaultKeys={1}
									trashTrigger={
										<Button styleVariant="ghost" sizeVariant="small" iconOnly>
											<TrashIcon />
										</Button>
									}
									addTrigger={
										<Button
											styleVariant="secondary"
											sizeVariant="xlarge"
											fullWidth
											leftIcon={
												<Box marginLeft="small">
													<CirclePlusIcon />
												</Box>
											}
										>
											{intl.formatMessage(messages.button_add_email_address)}
										</Button>
									}
								>
									<TextField name="email" placeholder={intl.formatMessage(messages.email_address)} />
								</FieldsGroup>
								<FieldsGroup
									name="phoneNumbers"
									defaultKeys={1}
									trashTrigger={
										<Button styleVariant="ghost" sizeVariant="small" iconOnly>
											<TrashIcon />
										</Button>
									}
									addTrigger={
										<Button
											styleVariant="secondary"
											sizeVariant="xlarge"
											fullWidth
											leftIcon={
												<Box marginLeft="small">
													<CirclePlusIcon />
												</Box>
											}
										>
											{intl.formatMessage(messages.button_add_phone_number)}
										</Button>
									}
								>
									<TextField name="number" placeholder={intl.formatMessage(messages.phone_number)} />
								</FieldsGroup>
							</Form>
						</Box>
					</ScrollArea>
					<Box className={clsx(styles.headerWrapper, isScrolled && styles.headerWrapperShadow)}>
						<Box flexGrow={1} />
						<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
							<ToolTip message={intl.formatMessage(messages.close)}>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={handleCancel}>
									<Close2Icon />
								</Button>
							</ToolTip>
						</Box>
					</Box>
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}

export default SelectPersonaModal
