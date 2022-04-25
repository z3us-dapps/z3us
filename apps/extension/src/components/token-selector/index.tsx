import React from 'react'
import { RightArrowIcon } from 'ui/src/components/icons'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectViewport,
	SelectGroup,
	SelectItem,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from 'ui/src/components/select'
import { CircleAvatar } from '@src/components/circle-avatar'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Token } from '@src/services/types'
import { parseResourceIdentifier } from '@src/services/radix/serializer'

interface IProps {
	triggerType?: string
	token: Token
	tokens: string[]
	onTokenChange: (token: string) => void
}

const defaultProps = {
	triggerType: undefined,
}

export const TokenSelector: React.FC<IProps> = ({ triggerType, token, tokens, onTokenChange }: IProps) => {
	const handleValueChange = (rri: string) => {
		onTokenChange(rri)
	}

	return (
		<Select defaultValue={token.rri} onValueChange={handleValueChange}>
			<SelectTrigger aria-label="Token selector" asChild>
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
										<Text size="4" uppercase css={{ pr: '$1', fontWeight: '600' }}>
											<SelectValue />
										</Text>
										<ChevronDownIcon />
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
									<SelectValue>
										<Text />
									</SelectValue>
									<Box css={{ p: '8px' }}>
										<CircleAvatar image={token?.image || token?.iconURL} />
									</Box>
									<Box css={{ flex: '1' }}>
										<Flex css={{ mt: '2px' }}>
											<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500' }}>Token:</Text>
											<Text uppercase css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', ml: '4px' }}>
												{parseResourceIdentifier(token.rri).name}
											</Text>
										</Flex>
									</Box>
									<Box css={{ pr: '$1' }}>
										<RightArrowIcon />
									</Box>
								</Button>
							)
					}
				})()}
			</SelectTrigger>
			<SelectContent>
				<SelectScrollUpButton>{'>'}</SelectScrollUpButton>
				<SelectViewport>
					<SelectGroup>
						{tokens.map(_token => (
							<SelectItem key={_token} value={_token}>
								<SelectItemText>
									<Text bold uppercase>
										{parseResourceIdentifier(_token).name}
									</Text>
								</SelectItemText>
								<SelectItemIndicator />
							</SelectItem>
						))}
					</SelectGroup>
				</SelectViewport>
				<SelectScrollDownButton>{'>'}</SelectScrollDownButton>
			</SelectContent>
		</Select>
	)
}

TokenSelector.defaultProps = defaultProps
