import { type Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'

import { Box } from 'ui/src/components/box'
import FieldValue from 'ui/src/components/resource/components/field-value'
import { AccountSnippet } from 'ui/src/components/snippet/account'

import { resolveManifestAddress } from '@src/radix/manifest'

interface IProps {
	instruction: Extract<ManifestInstruction, { kind: 'CallFunction' }>
}

export const CallFunction: React.FC<IProps> = ({ instruction }) => {
	if (instruction.kind !== 'CallFunction') return null

	const address = resolveManifestAddress(instruction.packageAddress).value

	return (
		<Box display="flex" flexDirection="row" gap="small">
			<AccountSnippet address={address} />
			{`${instruction.blueprintName} ${instruction.functionName}`}
			<FieldValue field={instruction.args} />
		</Box>
	)
}
