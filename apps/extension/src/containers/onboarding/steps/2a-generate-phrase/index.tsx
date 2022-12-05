import React, { useEffect, useState } from 'react'
import { useSharedStore } from '@src/hooks/use-store'
import { useEventListener } from 'usehooks-ts'
import { CopyIcon } from '@radix-ui/react-icons'
import { onBoardingSteps } from '@src/store/onboarding'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import Button from 'ui/src/components/button'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import { Mnemonic, StrengthT } from '@radixdlt/crypto'

export const GeneratePhrase = (): JSX.Element => {
	const { mnemonic, setMnemomic, setOnboardingStep } = useSharedStore(state => ({
		mnemonic: state.mnemonic,
		setMnemomic: state.setMnemomicAction,
		setOnboardingStep: state.setOnboardingStepAction,
	}))

	const [strength] = useState<number>(24)

	useEffect(() => {
		if (mnemonic) {
			return
		}
		switch (strength) {
			case 12:
				setMnemomic(Mnemonic.generateNew({ strength: StrengthT.WORD_COUNT_12 }))
				break
			case 15:
				setMnemomic(Mnemonic.generateNew({ strength: StrengthT.WORD_COUNT_15 }))
				break
			case 18:
				setMnemomic(Mnemonic.generateNew({ strength: StrengthT.WORD_COUNT_18 }))
				break
			case 21:
				setMnemomic(Mnemonic.generateNew({ strength: StrengthT.WORD_COUNT_21 }))
				break
			case 24:
				setMnemomic(Mnemonic.generateNew({ strength: StrengthT.WORD_COUNT_24 }))
				break
			default:
				setMnemomic(Mnemonic.generateNew({ strength: StrengthT.WORD_COUNT_18 }))
		}
	}, [])

	const handleContinue = () => {
		setOnboardingStep(onBoardingSteps.CREATE_PASSWORD)
	}

	const handleCopyMnemomic = () => {
		copyTextToClipboard(mnemonic?.words.join(' '))
	}

	useEventListener('keypress', e => {
		if (e.code === 'Enter') {
			handleContinue()
		}
	})

	return (
		<PageWrapper css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
			<Box>
				<PageHeading>Secret phrase</PageHeading>
				<PageSubHeading>
					This is the only way you will be able to recover your account. <br />
					Please store it somewhere safe!
				</PageSubHeading>
			</Box>
			<Box css={{ mt: '$8', flex: '1' }}>
				<Box
					css={{
						background: '$bgPanel',
						p: '$4',
						pb: '50px',
						br: '$2',
						border: '1px solid $borderPanel',
						position: 'relative',
					}}
				>
					<Flex data-test-e2e="create-new-wallet-mnemonic" css={{ overflow: 'hidden', flexWrap: 'wrap' }}>
						{mnemonic?.words.map(word => (
							<Box key={word} css={{ mr: '$2', mb: '$1' }}>
								<Text size="4">{word}</Text>
							</Box>
						))}
					</Flex>
					<ButtonTipFeedback tooltip="Copy phrase">
						<Button
							onClick={handleCopyMnemomic}
							size="2"
							color="primary"
							css={{ position: 'absolute', bottom: '$2', right: '$2' }}
						>
							<CopyIcon />
							Copy
						</Button>
					</ButtonTipFeedback>
				</Box>
			</Box>
			<Flex css={{ width: '100%' }}>
				<Button
					data-test-e2e="create-new-wallet-save-btn"
					fullWidth
					color="primary"
					size="6"
					onClick={handleContinue}
					css={{ flex: '1' }}
				>
					Ok, I saved it!
				</Button>
			</Flex>
			<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
				<Text medium size="3" color="muted">
					Step 1 of 3
				</Text>
			</Flex>
		</PageWrapper>
	)
}
