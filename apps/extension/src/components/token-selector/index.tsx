import React from 'react'
import { RightArrowIcon } from 'ui/src/components/icons'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
} from 'ui/src/components/drop-down-menu'
import { CircleAvatar } from '@src/components/circle-avatar'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Token } from '@src/services/types'
import { parseResourceIdentifier } from '@src/services/radix/serializer'

interface IProps {
	triggerType?: string
	token?: Token
	tokens: string[]
	onTokenChange: (token: string) => void
}

const defaultProps = {
	triggerType: undefined,
	token: undefined,
}

export const TokenSelector: React.FC<IProps> = ({ triggerType, token, tokens, onTokenChange }: IProps) => {
	const handleValueChange = (rri: string) => {
		onTokenChange(rri)
	}

	const menuAlign = triggerType === 'input' ? 'end' : 'start'
	const menuWidth = triggerType === 'input' ? '120px' : '314px'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{(() => {
					switch (triggerType) {
						case 'input':
							return (
								<Button
									css={{
										maxWidth: '113px',
										position: 'absolute',
										display: 'flex',
										justifyContent: 'flex-start',
										top: '4px',
										right: '4px',
										height: '40px',
										px: '0',
										borderRadius: '20px 5px 5px 20px',
										bg: '$bgPanel2',
									}}
								>
									<Flex justify="start" align="center" css={{ width: '100%', textAlign: 'left', pr: '$1' }}>
										<Box css={{ p: '8px' }}>
											<CircleAvatar
												width={24}
												height={24}
												borderWidth={0}
												shadow={false}
												image={token?.image || token?.iconURL}
												fallbackText={token?.symbol}
											/>
										</Box>
										<Text truncate size="4" uppercase css={{ pr: '$1', fontWeight: '600', maxWidth: '60px' }}>
											{token ? parseResourceIdentifier(token.rri).name : 'Select'}
										</Text>
										<Box css={{ flexShrink: '0' }}>
											<ChevronDownIcon />
										</Box>
									</Flex>
								</Button>
							)
						default:
							return (
								<Button
									css={{
										display: 'flex',
										align: 'center',
										justifyContent: 'flex-start',
										mt: '12px',
										bg: '$bgPanel2',
										borderRadius: '8px',
										height: '64px',
										position: 'relative',
										width: '100%',
										ta: 'left',
										'&:hover': {
											bg: '$bgPanelHover',
										},
									}}
								>
									<Box css={{ p: '8px' }}>
										<CircleAvatar image={token?.image || token?.iconURL} />
									</Box>
									<Box css={{ flex: '1' }}>
										<Flex css={{ mt: '2px' }}>
											<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500' }}>Token:</Text>
											<Text
												truncate
												uppercase
												css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', ml: '4px', maxWidth: '200px' }}
											>
												{token ? parseResourceIdentifier(token.rri).name : 'Select'}
											</Text>
										</Flex>
									</Box>
									<Box css={{ pr: '$1', flexShrink: '0' }}>
										<RightArrowIcon />
									</Box>
								</Button>
							)
					}
				})()}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				avoidCollisions={false}
				align={menuAlign}
				side="bottom"
				sideOffset={10}
				css={{ minWidth: menuWidth }}
			>
				<DropdownMenuRadioGroup value={token?.rri} onValueChange={handleValueChange}>
					{tokens.map(_token => (
						<DropdownMenuRadioItem key={_token} value={_token}>
							<DropdownMenuItemIndicator />
							<Text size="2" bold truncate css={{ maxWidth: '274px' }}>
								{parseResourceIdentifier(_token).name}
							</Text>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

TokenSelector.defaultProps = defaultProps
