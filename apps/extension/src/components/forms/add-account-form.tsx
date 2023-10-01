import { LTSRadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import type { AddressBookEntry } from 'packages/ui/src/store/types'
import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	name: {
		id: 'forms.add_account.form.name',
		defaultMessage: 'Name',
	},
	validation_name: {
		id: 'forms.add_account.validation.name',
		defaultMessage: 'Name is required',
	},
	form_button_title: {
		id: 'forms.add_account.form.submit_button.title',
		defaultMessage: 'Add',
	},
})

const initialValues = {
	name: '',
}

const AddAccountForm: React.FC = () => {
	const intl = useIntl()
	const client = useMessageClient()
	const networkId = useNetworkId()
	const { accountIndexes, addressBook, addAccount, setAddressBookEntry } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
		addAccount: state.addAccountAction,
		setAddressBookEntry: state.setAddressBookEntryAction,
	}))

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(
		() =>
			z.object({
				name: z.string().min(1, intl.formatMessage(messages.validation_name)),
			}),
		[],
	)

	const handleSubmit = async (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		const idx = Object.keys(accountIndexes).findLastIndex(() => true) + 1
		const publicKey = await client.getPublicKey('account', +idx)
		const address = await LTSRadixEngineToolkit.Derive.virtualAccountAddress(publicKey, networkId)
		const entry = { ...(addressBook[address] || {}), name: values.name } as AddressBookEntry

		addAccount(networkId, +idx, { address, publicKeyHex: publicKey.hexString() })
		setAddressBookEntry(networkId, address, entry)
		setValidation(undefined)
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={intl.formatMessage(messages.form_button_title)}
		>
			<TextField name="name" placeholder={intl.formatMessage(messages.name)} />
		</Form>
	)
}

export default AddAccountForm
