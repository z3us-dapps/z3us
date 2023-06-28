import type { ClassValue } from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

import { type FormElement, Input } from 'ui/src/components/input'

import { AccountTransfer } from './account-transfer'

interface IAccountTransferRawProps {
	className?: ClassValue
}

export const AccountTransferRaw: React.FC<IAccountTransferRawProps> = props => {
	const { className } = props

	const inputRef = useRef(null)
	const [inputValue, setInputValue] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	return (
		<AccountTransfer
			className={className}
			title="Send raw transaction"
			description="Enter transaction manifest"
			helpTitle="Raw transaction"
			help="Enter raw transaction manifest text to send to your linked Radix Wallet. No method call to 'lock_fee' is required - the wallet will add this automatically."
		>
			{setTransaction => (
				<Input
					value={inputValue}
					ref={inputRef}
					elementType="textarea"
					sizeVariant="medium"
					placeholder="Enter transaction manifest"
					onChange={(event: React.ChangeEvent<FormElement>) => {
						const { value } = event.target
						setInputValue(value)
						setTransaction({ version: 1, transactionManifest: value })
					}}
				/>
			)}
		</AccountTransfer>
	)
}
