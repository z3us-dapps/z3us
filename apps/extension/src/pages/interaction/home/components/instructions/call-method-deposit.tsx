import type { KnownAddresses, Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import { castValue, destructManifestValueTuple, isAccountDepositCallMethod } from '@radixdlt/radix-engine-toolkit'
import { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { resolveManifestAddress } from '@src/radix/manifest'

const messages = defineMessages({
	value: {
		id: 'interaction.manifest.instructions.call_method.deposit',
		defaultMessage: `Deposit {bucket} into {accountAddress}`,
	},
})

interface IProps {
	knownAddresses: KnownAddresses
	instruction: ManifestInstruction
}

export const CallMethodDeposit: React.FC<IProps> = ({ instruction, knownAddresses }) => {
	const intl = useIntl()

	const [isVisible, setIsVisible] = useState<boolean>(false)

	useEffect(() => {
		if (instruction.kind === 'CallMethod') {
			isAccountDepositCallMethod(instruction).then(setIsVisible)
		} else {
			setIsVisible(false)
		}
	}, [instruction, knownAddresses])

	if (instruction.kind !== 'CallMethod') return null
	if (!isVisible) return null

	const [bucketValue] = destructManifestValueTuple(instruction.args)
	const accountAddress = resolveManifestAddress(instruction.address).value
	const bucket = castValue<'Bucket'>(bucketValue, 'Bucket').value
	// const [resourceAddress, amount] = summary.bucketAmounts[bucket]

	return (
		<>
			{intl.formatMessage(messages.value, {
				accountAddress,
				bucket,
			})}
		</>
	)
}
