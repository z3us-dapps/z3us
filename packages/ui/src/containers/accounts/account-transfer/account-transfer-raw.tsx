import React, { useEffect, useRef, useState } from 'react'

import { type FormElement, Input } from 'ui/src/components/input'

import { AccountTransfer } from './account-transfer'

export const AccountTransferRaw: React.FC = () => {
	const inputRef = useRef(null)
	const [inputValue, setInputValue] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleChange = (event: React.ChangeEvent<FormElement>) => {
		const { value } = event.target
		setInputValue(value)
	}

	return (
		<AccountTransfer
			title="Send raw transaction"
			description="Enter transaction manifest"
			helpTitle="Raw transaction"
			help="Enter raw transaction manifest text to send to your linked Radix Wallet. No method call to 'lock_fee' is required - the wallet will add this automatically."
			transaction={inputValue ? { version: 1, transactionManifest: inputValue } : null}
		>
			<Input
				value={inputValue}
				ref={inputRef}
				elementType="textarea"
				sizeVariant="medium"
				placeholder="Enter transaction manifest"
				onChange={handleChange}
			/>
		</AccountTransfer>
	)
}
