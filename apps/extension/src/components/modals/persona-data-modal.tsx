import type { PersonaDataRequestItem, PersonaDataRequestResponseItem } from '@radixdlt/radix-dapp-toolkit'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import PersonaDataForm from 'ui/src/components/form/persona-data-form'
import { Close2Icon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from './styles.css'

const messages = defineMessages({
	close: {
		id: '47FYwb',
		defaultMessage: 'Cancel',
	},
	validation_email: {
		id: 'LPhKkU',
		defaultMessage: 'Please select valid email',
	},
	validation_emails_required: {
		id: 'A1yYFc',
		defaultMessage: 'Please select minimum {number} emails',
	},
	validation_emails_exactly: {
		id: 'cCYHTG',
		defaultMessage: 'Please select exactly {number} emails',
	},
	validation_phone_number: {
		id: 'aY46qO',
		defaultMessage: 'Please select valid phone number',
	},
	validation_phone_numbers_required: {
		id: 'tLFk2j',
		defaultMessage: 'Please select minimum {number} phone numbers',
	},
	validation_phone_numbers_exactly: {
		id: 'Ggnw/D',
		defaultMessage: 'Please select exactly {number} phone numbers',
	},
	validation_nickname: {
		id: 'R16INh',
		defaultMessage: 'Please insert valid nickname',
	},
	validation_given_names: {
		id: '1vfXfh',
		defaultMessage: 'Please insert valid given names',
	},
	validation_family_name: {
		id: 'Q4s2E+',
		defaultMessage: 'Please insert valid family name',
	},
	validation_names_required: {
		id: '28fmWQ',
		defaultMessage: 'Name details are required',
	},
})

export interface IProps {
	identityAddress: string
	request: PersonaDataRequestItem
	onConfirm: (response: PersonaDataRequestResponseItem) => void
	onCancel: () => void
}

const SelectPersonaModal: React.FC<IProps> = ({ identityAddress, request, onConfirm, onCancel }) => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const { personaIndexes, updatePersona } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
		updatePersona: state.addPersonaAction,
	}))

	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(true)

	const validationSchema = useMemo(() => {
		const schema: any = {}
		if (request.isRequestingName) {
			schema.names = z
				.array(
					z.object({
						variant: z.literal('western').or(z.literal('eastern')),
						givenNames: z.string().min(1, intl.formatMessage(messages.validation_given_names)),
						familyName: z.string().min(1, intl.formatMessage(messages.validation_family_name)),
						nickname: z.string().or(z.undefined()),
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

	const handleScroll = (event: Event) => {
		const target = event.target as Element
		const { scrollTop } = target

		setIsScrolled(scrollTop > 0)
	}

	const handleSubmit = async values => {
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

		const labelParts: string[] = []
		if (response.name?.givenNames) {
			labelParts.push(response.name?.givenNames)
		}
		if (response.name?.nickname) {
			labelParts.push(`"${response.name?.nickname}"`)
		}
		if (response.name?.familyName) {
			labelParts.push(response.name?.familyName)
		}

		const currentDetails = personaIndexes?.[identityAddress]
		const persona = {
			...currentDetails,
			label: labelParts.length > 0 ? labelParts.join(' ') : currentDetails.label,
			nickName: response.name?.nickname,
			nameVariant: response.name?.variant,
			givenNames: response.name?.givenNames,
			familyName: response.name?.familyName,
			emailAddresses: values.emailAddresses.map(({ email }) => email),
			phoneNumbers: values.phoneNumbers.map(({ number }) => number),
		}

		updatePersona(networkId, identityAddress, persona)
		onConfirm(response)
		setIsOpen(false)
	}

	const handleCancel = () => {
		onCancel()
		setIsOpen(false)
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
							<PersonaDataForm
								identityAddress={identityAddress}
								customValidationSchema={validationSchema}
								onSubmit={handleSubmit}
							/>
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
