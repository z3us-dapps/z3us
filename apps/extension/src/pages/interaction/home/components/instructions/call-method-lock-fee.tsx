import type { KnownAddresses, Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import { castValue, destructManifestValueTuple, isLockFeeCallMethod } from '@radixdlt/radix-engine-toolkit'
import { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { resolveManifestAddress } from '@src/radix/manifest'

const messages = defineMessages({
	value: {
		id: 'interaction.manifest.instructions.call_method.lock_fee',
		defaultMessage: `Lock {amount} fee using {accountAddress}`,
	},
})

interface IProps {
	knownAddresses: KnownAddresses
	instruction: ManifestInstruction
}

export const CallMethodLockFee: React.FC<IProps> = ({ instruction, knownAddresses }) => {
	const intl = useIntl()

	const [isVisible, setIsVisible] = useState<boolean>(false)

	useEffect(() => {
		if (!knownAddresses) return
		if (instruction.kind === 'CallMethod') {
			const faucetComponentAddress = knownAddresses.componentAddresses.faucet
			// const xrdResourceAddress = knownAddresses.resourceAddresses.xrd
			isLockFeeCallMethod(instruction, faucetComponentAddress).then(setIsVisible)
		} else {
			setIsVisible(false)
		}
	}, [instruction, knownAddresses])

	if (instruction.kind !== 'CallMethod') return null
	if (!isVisible) return null

	const [amountValue] = destructManifestValueTuple(instruction.args)
	const accountAddress = resolveManifestAddress(instruction.address).value
	const amount = castValue<'Decimal'>(amountValue, 'Decimal').value

	return (
		<>
			{intl.formatMessage(messages.value, {
				accountAddress,
				amount: amount.toString(),
			})}
		</>
	)
}
