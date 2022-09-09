import React, { useEffect } from 'react'
import { RightArrowIcon } from 'ui/src/components/icons'
import { useImmer } from 'use-immer'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { SearchBox } from '@src/components/search-box'
import { ChevronDownIcon, Cross2Icon, ResetIcon } from '@radix-ui/react-icons'
import { useEventListener } from 'usehooks-ts'
import { CircleAvatar } from '@src/components/circle-avatar'
import { useKnownTokens } from '@src/hooks/react-query/queries/radixscan'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { NoResultsPlaceholder } from '@src/components/no-results-placeholder'
import Button from 'ui/src/components/button'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { parseResourceIdentifier } from '@src/services/radix/serializer'
import { VisibleToken, VisibleTokens, Token } from '@src/types'
import { TokenItem } from './token-item'

interface ImmerProps {
	isModalOpen: boolean
	search: string
	filteredTokens: Array<VisibleToken>
}

interface IProps {
	triggerType?: 'input' | 'minimal'
	token?: Token
	tokens: string[]
	onTokenChange: (token: string) => void
}

const defaultProps = {
	triggerType: undefined,
	token: undefined,
}

const makeFilteredTokensList = (tokens: Array<string>, knownTokens: VisibleTokens): Array<VisibleToken> =>
	tokens.map((token: string) => ({
		rri: token,
		name: knownTokens?.[token]?.name || '',
		symbol: knownTokens?.[token]?.symbol || '',
	}))

export const TokenSelector: React.FC<IProps> = ({ triggerType, token, tokens, onTokenChange }) => {
	const { data: knownTokens } = useKnownTokens()
	const [state, setState] = useImmer<ImmerProps>({
		isModalOpen: false,
		search: '',
		filteredTokens: [],
	})

	const searchedTokens = state.filteredTokens.filter((_token: VisibleToken) => {
		const search = state.search.toLowerCase()
		return (
			(search !== '' && _token.name?.toLowerCase().includes(search)) || _token.symbol?.toLowerCase().includes(search)
		)
	})

	const hasSearchResults = searchedTokens?.length > 0

	const handleCloseModal = () => {
		setState(draft => {
			draft.isModalOpen = false
		})
	}

	const handleSearchTokens = (search: string) => {
		setState(draft => {
			draft.search = search
		})
	}

	const handleValueChange = (rri: string) => {
		onTokenChange(rri)
		handleCloseModal()
	}

	const handleClearSelection = () => {
		setState(draft => {
			draft.search = ''
		})
		onTokenChange('')
		handleCloseModal()
	}

	const handleClickTrigger = () => {
		setState(draft => {
			draft.isModalOpen = true
		})
	}

	useEffect(() => {
		setState(draft => {
			if (!tokens) return
			draft.filteredTokens = makeFilteredTokensList(tokens, knownTokens)
		})
	}, [state.search, tokens])

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			handleCloseModal()
		}
	})

	return (
		<Dialog open={state.isModalOpen}>
			<DialogTrigger asChild onClick={handleClickTrigger}>
				<div>
					{(() => {
						switch (triggerType) {
							case 'minimal':
								return (
									<Button
										css={{
											maxWidth: '113px',
											display: 'flex',
											justifyContent: 'flex-start',
											height: '48px',
											px: '0',
											borderRadius: '30px 5px 5px 30px',
											transition: '$default',
											bg: 'transparent',
										}}
									>
										<Flex justify="start" align="center" css={{ width: '100%', textAlign: 'left', pr: '$1' }}>
											<Box css={{ p: '8px', pr: '4px' }}>
												<CircleAvatar
													width={32}
													height={32}
													borderWidth={0}
													shadow={false}
													image={token?.image || token?.iconURL}
													fallbackText={token?.symbol}
												/>
											</Box>
											<Box css={{ flexShrink: '0', color: '$txtHelp', pt: '2px' }}>
												<ChevronDownIcon />
											</Box>
										</Flex>
									</Button>
								)
							// @TODO: phase this style out
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
											<Text
												truncate
												size="4"
												uppercase
												css={{ flex: '1', pr: '$1', fontWeight: '600', maxWidth: '60px' }}
											>
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
											<CircleAvatar
												image={token?.image || token?.iconURL}
												fallbackText={token?.symbol.toLocaleUpperCase()}
											/>
										</Box>
										<Box css={{ flex: '1' }}>
											<Flex css={{ mt: '2px' }}>
												<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500' }}>Token:</Text>
												<Text
													truncate
													uppercase
													css={{
														fontSize: '14px',
														lineHeight: '17px',
														fontWeight: '500',
														ml: '4px',
														maxWidth: '200px',
													}}
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
				</div>
			</DialogTrigger>
			<DialogContent css={{ p: '0' }}>
				<Flex direction="column" css={{ position: 'relative' }}>
					<Button
						color="ghost"
						iconOnly
						aria-label="close edit token selector modal"
						size="1"
						css={{ position: 'absolute', top: '$2', right: '$2' }}
						onClick={handleCloseModal}
					>
						<Cross2Icon />
					</Button>
					<Box css={{ p: '$5', pb: '$4', borderBottom: '1px solid $borderPanel' }}>
						<Text size="6" bold css={{ mb: '$2' }}>
							Select token
						</Text>
						<Text css={{ mt: '$3' }}>Search list and click to select token.</Text>
						<Box css={{ mt: '$2' }}>
							<SearchBox
								focusOnMount
								showCancelOnlyWithValueButton
								onSearch={handleSearchTokens}
								placeholder="Search..."
								debounce={300}
							/>
						</Box>
					</Box>
					<Box css={{ height: '295px', position: 'relative' }}>
						{hasSearchResults ? (
							<ScrollArea>
								<Box css={{ px: '$5', pb: '$5', pt: '$2' }}>
									{searchedTokens.map(({ rri }: VisibleToken) => (
										<TokenItem rri={rri} onClick={handleValueChange} />
									))}
								</Box>
							</ScrollArea>
						) : (
							<NoResultsPlaceholder />
						)}
					</Box>
					<Flex justify="end" gap="2" css={{ py: '$4', pl: '$3', pr: '$5', borderTop: '1px solid $borderPanel' }}>
						<Box css={{ flex: '1' }}>
							<Button size="3" color="ghost" aria-label="clear" onClick={handleClearSelection}>
								<ResetIcon />
								Clear
							</Button>
						</Box>
						<Button size="3" color="tertiary" aria-label="close token select modal" onClick={handleCloseModal}>
							Close
						</Button>
					</Flex>
				</Flex>
			</DialogContent>
		</Dialog>
	)
}

TokenSelector.defaultProps = defaultProps
