import { type Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'

import { Box } from 'ui/src/components/box'
import { ResourceSnippet } from 'ui/src/components/resource-snippet'
import FieldValue from 'ui/src/pages/accounts/components/resource-details/field-value'

import { resolveManifestAddress } from '@src/radix/manifest'

interface IProps {
	instruction: Extract<ManifestInstruction, { kind: 'CallFunction' }>
}

export const CallFunction: React.FC<IProps> = ({ instruction }) => {
	if (instruction.kind !== 'CallFunction') return null

	const address = resolveManifestAddress(instruction.packageAddress).value

	return (
		<Box display="flex" flexDirection="row" gap="small">
			<ResourceSnippet address={address} />
			{`${instruction.blueprintName} ${instruction.functionName}`}
			<FieldValue field={instruction.args} />
		</Box>
	)
}
