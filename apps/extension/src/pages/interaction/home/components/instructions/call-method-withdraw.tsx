import type { KnownAddresses, Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import { castValue, destructManifestValueTuple, isAccountWithdrawCallMethod } from '@radixdlt/radix-engine-toolkit'
import { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { resolveManifestAddress } from '@src/radix/manifest'

const messages = defineMessages({
	value: {
		id: 'interaction.manifest.instructions.call_method.withdraw',
		defaultMessage: `Withdraw {amount} of {resourceAddress} from {accountAddress}`,
	},
})

interface IProps {
	knownAddresses: KnownAddresses
	instruction: ManifestInstruction
}

export const CallMethodWithdraw: React.FC<IProps> = ({ instruction, knownAddresses }) => {
	const intl = useIntl()

	const [isVisible, setIsVisible] = useState<boolean>(false)

	useEffect(() => {
		if (instruction.kind === 'CallMethod') {
			isAccountWithdrawCallMethod(instruction).then(setIsVisible)
		} else {
			setIsVisible(false)
		}
	}, [instruction, knownAddresses])

	if (instruction.kind !== 'CallMethod') return null
	if (!isVisible) return null

	const [resourceAddressValue, amountValue] = destructManifestValueTuple(instruction.args)
	const accountAddress = resolveManifestAddress(instruction.address).value
	const resourceAddress = resolveManifestAddress(castValue<'Address'>(resourceAddressValue, 'Address').value).value
	const amount = castValue<'Decimal'>(amountValue, 'Decimal').value

	return (
		<>
			{intl.formatMessage(messages.value, {
				accountAddress,
				resourceAddress,
				amount: amount.toString(),
			})}
		</>
	)
}
