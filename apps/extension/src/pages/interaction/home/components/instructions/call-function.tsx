import { type Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import { defineMessages, useIntl } from 'react-intl'

import { ResourceSnippet } from 'ui/src/components/resource-snippet'
import FieldValue from 'ui/src/pages/accounts/components/resource-details/field-value'

import { resolveManifestAddress } from '@src/radix/manifest'

const messages = defineMessages({
	unknown: {
		id: 'interaction.manifest.instructions.call_function.unknown',
		defaultMessage: `{package} -> {functionName} with values: {values}`,
	},
})

interface IProps {
	instruction: Extract<ManifestInstruction, { kind: 'CallFunction' }>
}

export const CallFunction: React.FC<IProps> = ({ instruction }) => {
	const intl = useIntl()

	if (instruction.kind !== 'CallFunction') return null

	const address = resolveManifestAddress(instruction.packageAddress).value

	return (
		<>
			{intl.formatMessage(messages.unknown, {
				functionName: instruction.functionName,
				package: <ResourceSnippet address={address} />,
				values: <FieldValue field={instruction.args} />,
			})}
		</>
	)
}
