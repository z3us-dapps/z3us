import React from 'react'
import { useAccountStore } from '@src/hooks/use-store'
import { Box, Text, StyledLink } from 'ui/src/components/atoms'
import { getShortAddress } from '@src/utils/string-utils'
import { Tabs, TabsList, TabsContent, TabsTrigger } from 'ui/src/components/tabs'
import { AccountSelector } from '@src/components/account-selector'
import { useTotalDelegatedStake } from '@src/hooks/react-query/queries/radix'
import BigNumber from 'bignumber.js'
import { EXPLORER_URL } from '@src/config'
import { ValidatorList } from './validator-list'
import { StakesList } from './stakes-list'

const TAB_HEIGHT = '246px'

export const Staking: React.FC = () => {
	const { accountAddress, selectAccount } = useAccountStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		selectAccount: state.selectAccountAction,
	}))
	const { data: totalStakesValue } = useTotalDelegatedStake()

	const totalStakes = new BigNumber(totalStakesValue)
	const shortAddress = getShortAddress(accountAddress)

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex)
	}

	return (
		<Box
			css={{
				position: 'absolute',
				bottom: '55px',
				left: '0',
				right: '0',
				height: '497px',
			}}
		>
			<Box>
				<Box css={{ py: '20px', px: '23px' }}>
					<Box>
						<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Staking</Text>
						<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px' }}>
							Stake XRD with a{' '}
							<StyledLink underline href={`${EXPLORER_URL}/validators`} target="_blank">
								Radix validator
							</StyledLink>
							.
						</Text>
					</Box>
					<AccountSelector shortAddress={shortAddress} onAccountChange={handleAccountChange} />
					<Box css={{ pt: '$4', pb: '$4' }}>
						<Tabs defaultValue="tab1">
							<TabsList aria-label="Manage your account">
								<TabsTrigger value="tab1">Stakes</TabsTrigger>
								<TabsTrigger value="tab2">Validators</TabsTrigger>
							</TabsList>
							<TabsContent value="tab1">
								<Box css={{ height: TAB_HEIGHT, position: 'relative' }}>
									<StakesList totalStakes={totalStakes} />
								</Box>
							</TabsContent>
							<TabsContent value="tab2">
								<Box css={{ height: TAB_HEIGHT, position: 'relative' }}>
									<ValidatorList totalStakes={totalStakes} />
								</Box>
							</TabsContent>
						</Tabs>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
