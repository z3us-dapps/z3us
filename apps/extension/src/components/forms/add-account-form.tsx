import { LTSRadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { type AddressBookEntry, CURVE, SCHEME } from 'ui/src/store/types'

import { buildAccountDerivationPath } from '@src/crypto/derivation_path'
import { useGetPublicKey } from '@src/hooks/use-get-public-key'

const messages = defineMessages({
	name: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
	validation_name: {
		id: 'Gvxoji',
		defaultMessage: 'Name is required',
	},
	form_button_title: {
		id: '2/2yg+',
		defaultMessage: 'Add',
	},
})

const initialValues = {
	name: '',
}

const AddAccountForm: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const getPublicKey = useGetPublicKey()

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

		const idx =
			Math.max(
				-1,
				...Object.values(accountIndexes)
					.filter(account => account.scheme !== SCHEME.BIP440OLYMPIA)
					.map(account => account.entityIndex),
			) + 1
		const derivationPath = buildAccountDerivationPath(networkId, idx)
		const publicKey = await getPublicKey(CURVE.CURVE25519, derivationPath)
		const address = await LTSRadixEngineToolkit.Derive.virtualAccountAddress(publicKey, networkId)
		const entry = { ...(addressBook[address] || {}), name: values.name } as AddressBookEntry

		addAccount(networkId, address, {
			address,
			entityIndex: +idx,
			publicKeyHex: publicKey.hexString(),
			curve: CURVE.CURVE25519,
			scheme: SCHEME.CAP26,
			derivationPath,
		})
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
