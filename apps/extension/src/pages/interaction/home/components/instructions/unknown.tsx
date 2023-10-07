import {
	InstructionsKind,
	type Intent,
	type Instruction as ManifestInstruction,
	RadixEngineToolkit,
} from '@radixdlt/radix-engine-toolkit'
import { Text } from 'packages/ui/src/components/typography'
import { useEffect, useState } from 'react'

interface IProps {
	intent: Intent
	instruction: ManifestInstruction
}

export const Unknown: React.FC<IProps> = ({ intent, instruction }) => {
	const [value, setValue] = useState<string>('')

	useEffect(() => {
		RadixEngineToolkit.Instructions.convert(
			{
				kind: InstructionsKind.Parsed,
				value: [instruction],
			},
			intent.header.networkId,
			'String',
		).then(converted => setValue(converted.value as string))
	}, [intent])

	return <Text>{value}</Text>
}
