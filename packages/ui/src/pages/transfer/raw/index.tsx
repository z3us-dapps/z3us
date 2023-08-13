import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'

import { type FormElement, Input } from 'ui/src/components/input'
import Translation from 'ui/src/components/translation'

import { TransferWrapper } from '../components/transfer-wrapper'
import * as styles from './styles.css'

export const Raw: React.FC = () => {
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
		<TransferWrapper
			title={<Translation capitalizeFirstLetter text="transfer.raw.title" />}
			description={<Translation capitalizeFirstLetter text="transfer.raw.description" />}
			helpTitle={<Translation capitalizeFirstLetter text="transfer.raw.helpTitle" />}
			help={<Translation capitalizeFirstLetter text="transfer.raw.help" />}
			transaction={inputValue ? { version: 1, transactionManifest: inputValue } : null}
		>
			<Input
				className={styles.transferRawTextAreaMessage}
				value={inputValue}
				ref={inputRef}
				elementType="textarea"
				sizeVariant="medium"
				placeholder={t('transfer.raw.inputPlaceholder')}
				onChange={handleChange}
			/>
		</TransferWrapper>
	)
}

export default Raw
