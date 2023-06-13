import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Avatar } from 'ui/src/components-v2/avatar'
import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { Input } from 'ui/src/components-v2/input'
import { SelectSimple } from 'ui/src/components-v2/select'
import { Text } from 'ui/src/components-v2/typography'
import { LoadingBarsIcon } from 'ui/src/components/icons'

import { AccountCards } from '@src/components/account-cards'
import { useSupportedCurrencies } from '@src/hooks/react-query/queries/market'
import { useNoneSharedStore } from '@src/hooks/use-store'

import * as styles from '../account-settings.css'
import * as accountsStyles from './settings-accounts.css'

const cards = [
	{
		accountId: 'rdx1...ldg0',
		accountName: 'all',
		accountBalance: '$80,043.43',
		// backgroundImage:
		// 	'url("/images/account-images/z3us-apple-hermes-v2.png"), radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
	},
	{
		accountId: 'rdx1b7073886',
		accountName: 'Spend',
		accountBalance: '$1043.43',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
	},
	{
		accountId: 'rdx1b70lllllllllllllllllll388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce',
		accountName: 'Savings',
		accountBalance: '$5043.43',
		backgroundImage:
			'url("/images/account-images/z3us-athens.png"), radial-gradient(77.21% 96.45% at 50% 100%, #C0D7EF 0%, #C0D7EF 17.71%, #C0D7EF 50.52%, #C0D7EF 100%)',
	},
	{
		accountId: 'rdx1b707388613143d8f698c9090f605e677a967eaf70a4c69250ce',
		accountName: 'Defi',
		accountBalance: '$80,043.43',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes-v2.png"), radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
	},
]

interface ISettingsAccountsProps {
	className?: ClassValue
}

export const SettingsAccounts: React.FC<ISettingsAccountsProps> = forwardRef<HTMLElement, ISettingsAccountsProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const { data: currencies } = useSupportedCurrencies()
		const { currency, setCurrency } = useNoneSharedStore(state => ({
			currency: state.currency,
			setCurrency: state.setCurrencyAction,
		}))

		return (
			<Box ref={ref} className={clsx(styles.settingsSectionFlexColumnWrapper, className)}>
				{/* START TITLE SECTION */}
				<Box className={styles.settingsSectionBorderWrapper}>
					<Box display="flex" flexDirection="column" gap="small">
						<Text size="xxlarge" weight="strong" color="strong">
							Accounts settings
						</Text>
						<Box>
							<Text>
								Accounts set imperdiet nam nam velit eu magna, neque eu eu porta. m duis non pretium, mus laoreet tempor
								velit integer tristique etiam integer.
							</Text>
						</Box>
					</Box>
				</Box>
				{/* END TITLE SECTION */}
				{/* START LOCK SECTION */}
				<Box className={styles.settingsSectionBorderWrapper}>
					<Box className={styles.settingsSectionGridBasic}>
						<Box display="flex" flexDirection="column">
							<Text size="large" weight="strong" color="strong">
								Account
							</Text>
							<Box>
								<Text size="small">Ut imperdiet</Text>
							</Box>
						</Box>
						<Box display="flex" flexDirection="row" gap="large">
							<Box className={accountsStyles.accountsSelectWrapper}>
								<SelectSimple
									value={currency}
									placeholder="Select currency"
									onValueChange={setCurrency}
									data={currencies?.map(curr => ({ id: curr, title: curr.toUpperCase() }))}
								/>
							</Box>
							<Box className={accountsStyles.accountsCardWrapper}>
								<Box>
									<AccountCards accountCards={cards} selectedCardIndex={1} isCardShadowVisible={false} />
								</Box>
								<Box display="flex" flexDirection="column" gap="small">
									<Text size="xsmall" weight="medium" color="strong">
										Account Alias
									</Text>
									<Input
										placeholder="Enter account alias"
										value={undefined}
										// value={state.editingAddress.name}
										// onChange={handleChangeName}
										// styleVariant={getError(state.validation, ['name']).error ? 'primary-error' : 'primary'}
									/>
									{/* <ValidationErrorMessage error={getError(state.validation, ['name'])} /> */}
								</Box>
								<Box display="flex" flexDirection="column" gap="small">
									<Text size="xsmall" weight="medium" color="strong">
										Account color
									</Text>
									<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
										{Array.from({ length: 10 }, (_, i) => (
											<Button key={i} active={i === 1} rounded styleVariant="avatar" sizeVariant="small" iconOnly>
												<Box
													width="full"
													height="full"
													borderRadius="full"
													style={{
														background:
															'linear-gradient(105deg, rgb(100, 101, 241), rgb(146, 218, 255), rgb(249, 247, 248))',
													}}
												/>
											</Button>
										))}
									</Box>
								</Box>
								<Box display="flex" flexDirection="column" gap="small">
									<Text size="xsmall" weight="medium" color="strong">
										Account image
									</Text>
									<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
										{Array.from({ length: 10 }, (_, i) => (
											<Button key={i} active={i === 1} styleVariant="avatar" sizeVariant="medium" iconOnly>
												<Avatar
													styleVariant="square"
													sizeVariant="medium"
													src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
													alt="this is the image"
													fallback="df"
												/>
											</Button>
										))}
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* END LOCK SELECT */}

				{/* SAVE SECTION */}
				<Box className={styles.settingsSectionWrapper}>
					<Box className={styles.settingsSectionGridBasic}>
						<Box className={styles.settingsSectionGridBasicSpacer}>&nbsp;</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Box width="full" display="flex" justifyContent="flex-end">
								<Button
									styleVariant="primary"
									sizeVariant="large"
									disabled
									rightIcon={
										<Box marginLeft="small">
											<LoadingBarsIcon />
										</Box>
									}
								>
									Save
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* END SAVE SECTION */}
			</Box>
		)
	},
)
