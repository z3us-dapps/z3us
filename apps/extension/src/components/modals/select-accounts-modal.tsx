import clsx from 'clsx'
import { FieldContext } from 'packages/ui/src/components/form/field-wrapper/context'
import { useFieldValue } from 'packages/ui/src/components/form/use-field-value'
import { useContext, useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import { Form } from 'ui/src/components/form'
import { FormContext } from 'ui/src/components/form/context'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import SelectField from 'ui/src/components/form/fields/select-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { PlusIcon, TrashIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { useApprovedDapps } from 'ui/src/hooks/use-approved-dapps'

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

const SelectAccountsShareAllButton: React.FC = () => {
	const intl = useIntl()
	const accountIndexes = useAccountIndexes()
	const { onFieldChange } = useContext(FormContext)

	const handleShareAllAccounts = () => {
		const allAccounts = Object.keys(accountIndexes).map(address => ({
			address,
		}))

		onFieldChange('accounts', allAccounts)
	}

	return (
		<Box paddingTop="medium">
			<Button
				styleVariant="secondary"
				sizeVariant="xlarge"
				fullWidth
				leftIcon={<PlusIcon />}
				onClick={handleShareAllAccounts}
			>
				{intl.formatMessage(messages.form_button_share_all_account)}
			</Button>
		</Box>
	)
}

const AccountsSelect: React.FC<{ selectedAccountsMap: { [address: string]: boolean } }> = ({ selectedAccountsMap }) => {
	const intl = useIntl()
	const accountIndexes = useAccountIndexes()
	const addressBook = useAddressBook()

	const { name: parentName } = useContext(FieldContext)
	const selected = useFieldValue(`${parentName ? `${parentName}.` : ''}address`)

	const data = useMemo(
		() =>
			Object.keys(accountIndexes)
				.filter(address => address === selected || !selectedAccountsMap[address])
				.map(address => ({
					id: address,
					title: addressBook[address]?.name || address,
				})),
		[selectedAccountsMap, addressBook, accountIndexes],
	)

	return (
		<Box>
			<SelectField
				name="address"
				fullWidth
				sizeVariant="large"
				placeholder={intl.formatMessage(messages.accounts_placeholder)}
				data={data}
			/>
		</Box>
	)
}

const AccountsSelectGroup: React.FC = () => {
	const intl = useIntl()

	const { name: parentName } = useContext(FieldContext)
	const selectedAccounts = useFieldValue(`${parentName ? `${parentName}.` : ''}accounts`)

	const selectedAccountsMap = useMemo(
		() => selectedAccounts.reduce((map, selected) => ({ ...map, [selected.address]: true }), {}),
		[selectedAccounts],
	)

	return (
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
			<AccountsSelect selectedAccountsMap={selectedAccountsMap} />
		</FieldsGroup>
	)
}

export interface IProps {
	required: number
	exactly: boolean
	interaction: WalletInteractionWithTabId
	onConfirm: (addresses: string[]) => void
	onCancel: () => void
}

const init = { accounts: [] }

const SelectAccountsModal: React.FC<IProps> = ({ required, exactly, interaction, onConfirm, onCancel }) => {
	const intl = useIntl()
	const accountIndexes = useAccountIndexes()
	const approvedDapps = useApprovedDapps()

	const [initialValues, restFormValues] = useState<typeof init>(init)
	const [validation, setValidation] = useState<ZodError>()
	const [isOpen, setIsOpen] = useState<boolean>(true)

	useEffect(() => {
		const { accounts = [] } = approvedDapps[interaction.metadata.dAppDefinitionAddress] || {}
		accounts.filter(address => !!accountIndexes[address]).map(_address => ({ address: _address }))
		restFormValues({
			accounts: accounts.filter(address => !!accountIndexes[address]).map(_address => ({ address: _address })),
		})
	}, [accountIndexes, approvedDapps])

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
		setValidation(undefined)
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}
		onConfirm(values.accounts.map(({ address }) => address))
		setIsOpen(false)
		setValidation(undefined)
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
					<AccountsSelectGroup />
					<SelectAccountsShareAllButton />
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
