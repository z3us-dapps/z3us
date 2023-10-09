import { type Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import { defineMessages, useIntl } from 'react-intl'

const messages = defineMessages({
	value: {
		id: 'interaction.manifest.instructions.take_from_worktop',
		defaultMessage: `Withdraw {amount} of {resourceAddress}`,
	},
})

interface IProps {
	instruction: Extract<ManifestInstruction, { kind: 'TakeFromWorktop' }>
}

export const TakeFromWorktop: React.FC<IProps> = ({ instruction }) => {
	const intl = useIntl()

	if (instruction.kind !== 'TakeFromWorktop') return null

	return (
		<>
			{intl.formatMessage(messages.value, {
				resourceAddress: instruction.resourceAddress,
				amount: instruction.amount.toString(),
			})}
		</>
	)
}
