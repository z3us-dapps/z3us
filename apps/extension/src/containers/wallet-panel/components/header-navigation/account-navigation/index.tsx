/* eslint-disable react/no-array-index-key */
import React from 'react'
import { useLocation, useRoute } from 'wouter'
import { useStore } from '@src/store'
import { getShortAddress } from '@src/utils/string-utils'
import Button from 'ui/src/components/button'
import { CopyIcon } from '@radix-ui/react-icons'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { ACCOUNTS } from '@src/containers/wallet-panel/config'

const accountUrl = `/wallet/account`

export const AccountNaviation: React.FC = () => {
	const { activeApp, accountAddress, addressBook, addresses, expanded, activeSlideIndex, setActiveSlide } = useStore(
		state => ({
			activeApp: state.activeApp,
			accountAddress: state.getCurrentAddressAction(),
			addresses: [...Object.values(state.publicAddresses), ...Object.values(state.hwPublicAddresses)],
			addressBook: state.addressBook,
			expanded: state.accountPanelExpanded,
			activeSlideIndex: state.activeSlideIndex,
			setActiveSlide: state.setActiveSlideIndexAction,
		}),
	)
	const [page] = activeApp
	const [, setLocation] = useLocation()
	const [isAccountMatch] = useRoute('/wallet/account')
	const isNavVisible = page === ACCOUNTS && isAccountMatch && !expanded

	const entry = addressBook[accountAddress]
	const shortAddress = getShortAddress(accountAddress)

	const handleBreadCrumbClick = async (idx: number) => {
		await setActiveSlide(idx)
		setLocation(accountUrl)
	}

	const handleCopyAddress = () => {
		copyTextToClipboard(accountAddress)
	}

	return (
		<Flex justify="center" css={{ position: 'relative', flex: '1' }}>
			<Flex
				align="center"
				css={{
					position: 'absolute',
					top: '5px',
					transition: '$default',
					pe: expanded ? 'auto' : 'none',
					opacity: expanded ? 1 : 0,
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
