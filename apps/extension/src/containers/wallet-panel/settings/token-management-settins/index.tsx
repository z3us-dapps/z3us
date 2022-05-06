import React from 'react'
import { Box } from 'ui/src/components/atoms'
import { PlusIcon, MinusIcon, TokensIcon } from '@radix-ui/react-icons'
import Button from 'ui/src/components/button'
import { CreateTokenModal } from './token-create-modal'
import { MintTokenModal } from './token-mint-modal'
import { BurnTokenModal } from './token-burn-modal'

export const TokenManagementSettings: React.FC = () => (
	<Box css={{ px: '$3', py: '$3' }}>
		<Box css={{ mt: '0' }}>
			<CreateTokenModal
				trigger={
					<Button size="4" color="primary" fullWidth>
						<TokensIcon />
						Create token
					</Button>
				}
			/>
		</Box>
		<Box css={{ mt: '$2' }}>
			<MintTokenModal
				trigger={
					<Button size="4" color="primary" fullWidth>
						<PlusIcon />
						Mint token
					</Button>
				}
			/>
		</Box>
		<Box css={{ mt: '$2' }}>
			<BurnTokenModal
				trigger={
					<Button size="4" color="red" fullWidth>
						<MinusIcon />
						Burn token
					</Button>
				}
			/>
		</Box>
	</Box>
)
