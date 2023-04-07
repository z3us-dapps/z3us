/* eslint-disable react/no-array-index-key */
import { CopyIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useLocation, useRoute } from 'wouter'

import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'

import { ACCOUNTS } from '@src/config'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { getShortAddress } from '@src/utils/string-utils'

export const AccountNaviation: React.FC = () => {
	const { activeApp, expanded, entry, addresses, activeSlideIndex, setActiveSlide } = useNoneSharedStore(state => ({
		activeApp: state.activeApp,
		expanded: state.accountPanelExpanded,
		addresses: Object.values(state.publicAddresses).map(({ address }) => address),
		entry: Object.values(state.publicAddresses).find(_account => _account.address === state.getCurrentAddressAction()),
		activeSlideIndex: state.activeSlideIndex,
		setActiveSlide: state.setActiveSlideIndexAction,
	}))
	const [page] = activeApp
	const [, setLocation] = useLocation()
	const [isAccountMatch] = useRoute('/wallet/account')
	const isNavVisible = page === ACCOUNTS && isAccountMatch && !expanded

	const shortAddress = getShortAddress(entry?.address)

	const handleBreadCrumbClick = async (idx: number) => {
		await setActiveSlide(idx)
		setLocation('/wallet/account')
	}

	const handleCopyAddress = () => {
		copyTextToClipboard(entry?.address)
	}

	return (
		<Flex justify="center" css={{ position: 'relative', flex: '1' }}>
			<Flex
				align="center"
				css={{
					position: 'absolute',
					top: '5px',
					transition: '$default',
					pe: page === ACCOUNTS && isAccountMatch && expanded ? 'auto' : 'none',
					opacity: page === ACCOUNTS && isAccountMatch && expanded ? 1 : 0,
				}}
			>
				<Text truncate size="4" medium css={{ mr: '$1', maxWidth: '220px' }}>
					{entry?.name ? `${entry.name} (${shortAddress})` : shortAddress}
				</Text>
				<ButtonTipFeedback tooltip="Copy address">
					<Button size="1" iconOnly color="ghost" onClick={handleCopyAddress}>
						<CopyIcon />
					</Button>
				</ButtonTipFeedback>
			</Flex>
			<Flex
				justify="center"
				data-test-e2e="account-breadcrumb"
				css={{
					flex: '1',
					pt: '6px',
					transition: '$default',
					opacity: isNavVisible ? 1 : 0,
					pointerEvents: isNavVisible ? 'all' : 'none',
					overflow: 'hidden',
					// TODO: we will need to do a drop down when there are too many accounts to fit on the top
					// overflowX: 'scroll',
					// overflowY: 'hidden',
				}}
			>
				<Button iconOnly size="1" onClick={() => handleBreadCrumbClick(-1)}>
					<Box
						css={{
							border: '1px solid $iconDefault',
							borderRadius: '50%',
							transition: 'all 150ms ease-out',
							background: 'transparent',
							transformOrigin: 'center',
							width: '5px',
							height: '5px',
							...(activeSlideIndex === -1
								? { transform: 'scale(1.5) translate(0,0px)', opacity: '1' }
								: { transform: 'scale(1.0)', opacity: '0.4' }),
						}}
					/>
				</Button>
				{addresses.map((_, idx) => (
					<Button
						iconOnly
						size="1"
						key={idx}
						onClick={() => handleBreadCrumbClick(idx)}
						css={{
							transition: 'all 150ms ease-out',
						}}
					>
						<Box
							css={{
								borderRadius: '50%',
								transition: '$default',
								background: '$txtDefault',
								width: '5px',
								height: '5px',
								transformOrigin: 'center',
								...(idx === activeSlideIndex
									? { transform: 'scale(1.5) translate(0,0px)', opacity: '1' }
									: { transform: 'scale(1.0)', opacity: '0.4' }),
							}}
						/>
					</Button>
				))}
				<Button iconOnly size="1" onClick={() => handleBreadCrumbClick(addresses.length)}>
					<Box
						data-test-e2e="account-breadcrumb-last-btn"
						css={{
							border: '1px solid $iconDefault',
							borderRadius: '50%',
							transition: 'all 150ms ease-out',
							background: 'transparent',
							transformOrigin: 'center',
							width: '5px',
							height: '5px',
							...(activeSlideIndex === addresses.length
								? { transform: 'scale(1.5) translate(0,0px)', opacity: '1' }
								: { transform: 'scale(1.0)', opacity: '0.4' }),
						}}
					/>
				</Button>
			</Flex>
		</Flex>
	)
}
