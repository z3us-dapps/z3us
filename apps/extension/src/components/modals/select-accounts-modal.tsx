import clsx from 'clsx'
import { useContext, useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useIsMounted } from 'usehooks-ts'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import { Form } from 'ui/src/components/form'
import { FormContext } from 'ui/src/components/form/context'
// import { FieldContext } from '../../field-wrapper/context'
import { FieldContext } from 'ui/src/components/form/field-wrapper/context'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import SelectField from 'ui/src/components/form/fields/select-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { PlusIcon, TrashIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { useApprovedDapps } from 'ui/src/hooks/use-approved-dapps'
import type { ApprovedDapps } from 'ui/src/store/types'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'

import * as styles from './styles.css'

const messages = defineMessages({
	accounts_placeholder: {
		id: '0+6+jP',
		defaultMessage: 'Select account',
	},
	validation_account: {
		id: 'm8tyA0',
		defaultMessage: 'Please select valid account',
	},
	validation_accounts_required: {
		id: 'gzjHi6',
		defaultMessage: 'Please select a minimum of {number} account(s)',
	},
	validation_accounts_exactly: {
		id: 'VBE5Tu',
		defaultMessage: 'Please select exactly {number} accounts',
	},
	form_button_share_all_account: {
		id: 'rw4ys0',
		defaultMessage: 'Share all accounts',
	},
	form_button_title: {
		id: '8cueNe',
		defaultMessage: 'Share accounts',
	},
	button_add_account: {
		id: 'qJcduu',
		defaultMessage: 'Add account',
	},
	close: {
		id: '47FYwb',
		defaultMessage: 'Cancel',
	},
	select_accounts_modal_title: {
		id: '8cueNe',
		defaultMessage: 'Share accounts',
	},
	select_accounts_modal_sub_title: {
		id: 'JiQ2D5',
		defaultMessage: 'Select one or multiple accounts to share',
	},
})

// move this function as it is used twice
function getInitialAccounts(dappAddress: string, approvedDapps: ApprovedDapps): string[] {
	const { accounts = [] } = approvedDapps[dappAddress] || {}
	return accounts
}

const SelectAccountsShareAllButton: React.FC<{ interaction: WalletInteractionWithTabId }> = ({ interaction }) => {
	const intl = useIntl()
	const isMounted = useIsMounted()

	const { onFieldChange } = useContext(FormContext)
	const approvedDapps = useApprovedDapps()
	const selectedAccounts = getInitialAccounts(interaction.metadata.dAppDefinitionAddress, approvedDapps)

	useEffect(() => {
		const interactionAccounts = selectedAccounts?.map(_address => ({ address: _address }))
		if (interactionAccounts?.length > 0) {
			onFieldChange('accounts', interactionAccounts)

			// TODO: fix this
			setTimeout(() => {
				onFieldChange('accounts', interactionAccounts)
			}, 0)
		}
	}, [selectedAccounts?.length, isMounted])

	return (
		<Box paddingTop="medium">
			<Button styleVariant="secondary" sizeVariant="xlarge" fullWidth leftIcon={<PlusIcon />}>
				{intl.formatMessage(messages.form_button_share_all_account)}
			</Button>
		</Box>
	)
}

export interface IProps {
	required: number
	exactly: boolean
	interaction: WalletInteractionWithTabId
	onConfirm: (addresses: string[]) => void
	onCancel: () => void
}

const initialValues = { accounts: [] }

const SelectAccountsModal: React.FC<IProps> = ({ required, exactly, interaction, onConfirm, onCancel }) => {
	const intl = useIntl()
	const accountIndexes = useAccountIndexes()
	const addressBook = useAddressBook()

	const [validation, setValidation] = useState<ZodError>()
	const [isOpen, setIsOpen] = useState<boolean>(true)

	const validationSchema = useMemo(() => {
		const accountSchema = z.object({
			address: z.string().min(1, intl.formatMessage(messages.validation_account)),
		})

		let accountsSchema = z
			.array(accountSchema)
			.min(1, intl.formatMessage(messages.validation_accounts_required, { number: required }))
		if (exactly) {
			accountsSchema = accountsSchema.max(
				required,
				intl.formatMessage(messages.validation_accounts_exactly, { number: required }),
			)
		}

		return z.object({
			accounts: accountsSchema,
		})
	}, [exactly, required])

	const handleSubmit = async (values: typeof initialValues) => {
		console.log('🚀 ~ file: select-accounts-modal.tsx:123 ~ handleSubmit ~ values:', values)
		// setValidation(undefined)
		// const result = validationSchema.safeParse(values)
		// if (result.success === false) {
		// 	setValidation(result.error)
		// 	return
		// }
		// onConfirm(values.accounts.map(({ address }) => address))
		// setIsOpen(false)
		// setValidation(undefined)
	}

	const handleCancel = () => {
		onCancel()
		setIsOpen(false)
		setValidation(undefined)
	}

	return (
		<Dialog open={isOpen} onClose={handleCancel}>
			<Box className={styles.modalContentWrapper}>
				<Box className={styles.modalContentTitleTextWrapper}>
					<Text color="strong" size="large" weight="strong">
						{intl.formatMessage(messages.select_accounts_modal_title)}
					</Text>
					<Text size="small">{intl.formatMessage(messages.select_accounts_modal_sub_title)}</Text>
				</Box>
				<Form
					onSubmit={handleSubmit}
					initialValues={initialValues}
					errors={validation?.format()}
					className={styles.modalFormFieldWrapper}
				>
					<FieldsGroup
						name="accounts"
						className={styles.formFieldModalGroupWrapper}
						defaultKeys={1}
						trashTrigger={
							<Button styleVariant="ghost" sizeVariant="small" iconOnly>
								<TrashIcon />
							</Button>
						}
						addTrigger={
							<Box className={clsx(styles.modalPersonaFormWrapper, styles.modalContentFormBorderWrapper)}>
								<Button styleVariant="secondary" sizeVariant="xlarge" fullWidth leftIcon={<PlusIcon />}>
									{intl.formatMessage(messages.button_add_account)}
								</Button>
							</Box>
						}
					>
						<Box>
							<SelectField
								name="address"
								fullWidth
								sizeVariant="large"
								placeholder={intl.formatMessage(messages.accounts_placeholder)}
								data={Object.keys(accountIndexes).map(address => ({
									id: address,
									title: addressBook[address]?.name || address,
								}))}
							/>
						</Box>
					</FieldsGroup>
					<SelectAccountsShareAllButton interaction={interaction} />
					<Box paddingTop="medium">
						<SubmitButton>
							<Button fullWidth sizeVariant="xlarge">
								{intl.formatMessage(messages.form_button_title)}
							</Button>
						</SubmitButton>
					</Box>
				</Form>
			</Box>
		</Dialog>
	)
}

export default SelectAccountsModal
