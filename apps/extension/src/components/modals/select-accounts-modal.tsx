import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod';
import { z  } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import SelectField from 'ui/src/components/form/fields/select-field'
import { CirclePlusIcon, TrashIcon , Close2Icon } from 'ui/src/components/icons'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from './styles.css'

const messages = defineMessages({
	accounts: {
		id: 'modals.select_accounts.form.accounts',
		defaultMessage: 'Accounts',
	},
	validation_account: {
		id: 'modals.select_accounts.validation.account',
		defaultMessage: 'Please select valid account',
	},
	validation_accounts_required: {
		id: 'modals.select_accounts.validation.accounts',
		defaultMessage: 'Please select minimum {number} accounts',
	},
	validation_accounts_exactly: {
		id: 'modals.select_accounts.validation.validation_accounts_exactly',
		defaultMessage: 'Please select exactly {number} accounts',
	},
	form_button_title: {
		id: 'modals.select_accounts.form.submit_button.title',
		defaultMessage: 'Share',
	},
	button_add_account: {
		id: 'modals.select_accounts.form.button_add_account.title',
		defaultMessage: 'Add another account',
	},
	close: {
		id: 'modals.select_accounts.close_button',
		defaultMessage: 'Cancel',
	},
})

const initialValues = {
	accounts: [],
}

export interface IProps {
	required: number
	exactly: boolean
	onConfirm: (indexes: number[]) => void
	onCancel: () => void
}

const SelectAccountsModal: React.FC<IProps> = ({ required, exactly, onConfirm, onCancel }) => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const networkId = useNetworkId()
	const { accountIndexes, addressBook } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId],
		addressBook: state.addressBook[networkId],
	}))

	const [validation, setValidation] = useState<ZodError>()
	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(true)

	const validationSchema = useMemo(() => {
		const accountSchema = z.object({
			index: z.string().min(1, intl.formatMessage(messages.validation_account)),
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
		onConfirm(values.accounts.map(({ idx }) => +idx))
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
								<FieldsGroup
									name="accounts"
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
											{intl.formatMessage(messages.button_add_account)}
										</Button>
									}
								>
									<SelectField
										name="index"
										placeholder={intl.formatMessage(messages.accounts)}
										data={Object.keys(accountIndexes).map(idx => ({
											id: idx,
											title: addressBook[accountIndexes[idx].address]?.name || accountIndexes[idx].address,
										}))}
									/>
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

export default SelectAccountsModal
