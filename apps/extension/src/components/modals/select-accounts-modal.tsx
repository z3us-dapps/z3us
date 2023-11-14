import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import SelectField from 'ui/src/components/form/fields/select-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { PlusIcon, TrashIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

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
		id: 'r4g6hl',
		defaultMessage: 'Please select minimum {number} accounts',
	},
	validation_accounts_exactly: {
		id: 'VBE5Tu',
		defaultMessage: 'Please select exactly {number} accounts',
	},
	form_button_title: {
		id: '8cueNe',
		defaultMessage: 'Share accounts',
	},
	button_add_account: {
		id: 'cU42T7',
		defaultMessage: 'Add another account',
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

const initialValues = {
	accounts: [],
}

export interface IProps {
	required: number
	exactly: boolean
	onConfirm: (addresses: string[]) => void
	onCancel: () => void
}

const SelectAccountsModal: React.FC<IProps> = ({ required, exactly, onConfirm, onCancel }) => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const { accountIndexes, addressBook } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

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
	}, [])

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
