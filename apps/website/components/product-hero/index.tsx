import React, { useState } from 'react'
import { AccountsIcon, StakingIcon, SettingsIcon } from 'ui/src/components/icons'
import { Box, Flex, MotionBox, Text, Grid } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import Pill from 'ui/src/components/pill'
import Image from 'next/image'
import { ScrollArea } from 'ui/src/components/scroll-area'
import PriceLabel from 'ui/src/components/price-label'
import {
	CloseIcon,
	UpArrowWideIcon,
	Z3usIcon,
	UpRightIcon,
	DownLeftIcon,
	ExternalLinkIcon,
} from 'ui/src/components/icons'
import { DropdownMenuHamburgerIcon } from 'ui/src/components/drop-down-menu'
import RadixTokenImage from 'public/images/token-images/xrd.png'
import OciTokenImage from 'public/images/token-images/oci.png'
import DelphiTokenImage from 'public/images/token-images/dph.png'
import DogeTokenImage from 'public/images/token-images/dgc.png'
import InuTokenImage from 'public/images/token-images/inu.png'

export const SLIDE_PANEL_HEIGHT = 144
export const SLIDE_PANEL_EXPAND_HEIGHT = 462

const TOKENS = [
	{ id: 1, token: 'Radix (XRD)', total: '100', price: '100', change: '100', image: RadixTokenImage },
	{ id: 2, token: 'Ociswap (OCI)', total: '100', price: '100', change: '100', image: OciTokenImage },
	{ id: 3, token: 'Delphibets (DPH)', total: '100', price: '100', change: '100', image: DelphiTokenImage },
	{ id: 4, token: 'Doge³ (DCG)', total: '100', price: '100', change: '100', image: DogeTokenImage },
	{ id: 5, token: 'Radix Inu (INU)', total: '100', price: '100', change: '100', image: InuTokenImage },
]

const ACTIVITIES = [
	{ id: 1, address: 'rxd1...l9uh', total: 100, type: 'send' },
	{ id: 3, address: 'rxd1...l9uh', total: 500, type: 'deposit' },
	{ id: 4, address: 'rxd1...l9uh', total: 400, type: 'send' },
	{ id: 5, address: 'rxd1...l9uh', total: 200, type: 'deposit' },
	{ id: 6, address: 'rxd1...l9uh', total: 100, type: 'deposit' },
	{ id: 7, address: 'rxd1...l9uh', total: 400, type: 'deposit' },
	{ id: 8, address: 'rxd1...l9uh', total: 400, type: 'deposit' },
	{ id: 9, address: 'rxd1...l9uh', total: 100, type: 'deposit' },
	{ id: 10, address: 'rxd1...l9uh', total: 400, type: 'send' },
	{ id: 11, address: 'rxd1...l9uh', total: 300, type: 'deposit' },
	{ id: 12, address: 'rxd1...l9uh', total: 400, type: 'deposit' },
	{ id: 13, address: 'rxd1...l9uh', total: 400, type: 'send' },
]

interface IProps {
	children: React.ReactNode
	name: string
}

export const SlideUpPanel = ({ children, name }: IProps): JSX.Element => {
	const [expanded, setExpanded] = useState(false)
	return (
		<Box
			css={{
				position: 'absolute',
				bottom: '0',
				left: '0',
				right: '0',
				zIndex: '1',
				borderRadius: '20px 20px 0 0',
				background: '$bgPanel',
				boxShadow: '$shadowPanel',
			}}
		>
			<Flex css={{ width: '100%', position: 'relative', zIndex: '2' }} justify="center">
				<Button
					size="6"
					color="ghost"
					iconOnly
					onClick={() => {
						setExpanded(!expanded)
					}}
					css={{
						svg: {
							transform: expanded ? 'rotateX(180deg)' : 'rotateX(0deg)',
							transition: 'all 300ms ease-out',
						},
					}}
				>
					<UpArrowWideIcon />
				</Button>
			</Flex>
			<MotionBox
				variants={{
					contracted: {
						height: `${SLIDE_PANEL_HEIGHT}px`,
						transition: {
							type: 'spring',
							stiffness: 200,
							damping: 20,
						},
					},
					expanded: () => ({
						height: `${SLIDE_PANEL_EXPAND_HEIGHT}px`,
						transition: {
							delay: 0,
							type: 'spring',
							stiffness: 200,
							damping: 26,
						},
					}),
				}}
				initial={false}
				animate={expanded ? 'expanded' : 'contracted'}
			>
				<Box
					css={{
						px: '$4',
						height: '30px',
						borderBottom: '1px solid $borderPanel',
						mt: '-10px',
					}}
				>
					<Text css={{ fontSize: '20px', lineHeight: '20px', fontWeight: '700' }}>{name}</Text>
				</Box>
				<Box css={{ height: 'calc(100% - 30px)', position: 'relative' }}>
					<ScrollArea>{children}</ScrollArea>
				</Box>
			</MotionBox>
		</Box>
	)
}

export const ProductFooter = (): JSX.Element => (
	<Box
		css={{
			position: 'absolute',
			bottom: '0',
			width: '100%',
			height: '70px',
			background: '$bgPanel',
			zIndex: '2',
			color: '$txtDefault',
			borderTop: '1px solid',
			borderColor: '$borderPanel',
			borderRadius: '0 0 20px 20px',
		}}
	>
		<Flex css={{ pt: '7px' }}>
			<Button
				as="button"
				css={{
					flex: 1,
					padding: 0,
					position: 'relative',
					display: 'flex',
					outline: 'none',
					border: 'none',
					height: '54px',
					alignItems: 'center',
					flexDirection: 'column',
					background: '$bgPanel',
					transition: 'all 300ms ease-out',
					'&:focus:not(&:focus-visible)': {
						boxShadow: 'none',
					},
				}}
			>
				<Box
					as="span"
					css={{
						mt: '$5',
						color: '$iconActive',
						svg: { transition: 'all 300ms ease-out' },
					}}
				>
					<AccountsIcon />
				</Box>
				<Text
					as="span"
					css={{
						textTransform: 'uppercase',
						fontSize: '11px',
						pt: '2px',
						fontWeight: '800',
						color: '$iconActive',
						svg: { transition: 'all 300ms ease-out' },
					}}
				>
					Accounts
				</Text>
			</Button>
			<Button
				as="button"
				css={{
					flex: 1,
					padding: 0,
					position: 'relative',
					display: 'flex',
					outline: 'none',
					border: 'none',
					height: '54px',
					alignItems: 'center',
					flexDirection: 'column',
					background: '$bgPanel',
					transition: 'all 300ms ease-out',
					'&:focus:not(&:focus-visible)': {
						boxShadow: 'none',
					},
				}}
			>
				<Box
					as="span"
					css={{
						mt: '$5',
						svg: { transition: 'all 300ms ease-out' },
					}}
				>
					<StakingIcon />
				</Box>
				<Text
					as="span"
					css={{
						textTransform: 'uppercase',
						fontSize: '11px',
						pt: '2px',
						fontWeight: '800',
						color: '$iconDefault',
						svg: { transition: 'all 300ms ease-out' },
					}}
				>
					Staking
				</Text>
			</Button>
			<Button
				as="button"
				css={{
					flex: 1,
					padding: 0,
					position: 'relative',
					display: 'flex',
					outline: 'none',
					border: 'none',
					height: '54px',
					alignItems: 'center',
					flexDirection: 'column',
					background: '$bgPanel',
					transition: 'all 300ms ease-out',
					'&:focus:not(&:focus-visible)': {
						boxShadow: 'none',
					},
				}}
			>
				<Box
					as="span"
					css={{
						mt: '$5',
						svg: { transition: 'all 300ms ease-out' },
					}}
				>
					<SettingsIcon />
				</Box>
				<Text
					as="span"
					css={{
						textTransform: 'uppercase',
						fontSize: '11px',
						pt: '2px',
						fontWeight: '800',
						color: '$iconDefault',
						svg: { transition: 'all 300ms ease-out' },
					}}
				>
					Settings
				</Text>
			</Button>
		</Flex>
	</Box>
)

export const ProductShell: React.FC = ({ children }) => (
	<Box
		css={{
			position: 'relative',
			width: '360px',
			height: '628px',
			borderRadius: '20px',
			background: '$bgPanel2',
			boxShadow: '0px 10px 44px rgba(0, 0, 0, 0.35)',
			overflow: 'hidden',
		}}
	>
		{children}
	</Box>
)

export const ProductHero = (): JSX.Element => (
	<ProductShell>
		<Flex
			css={{
				display: 'flex',
				position: 'relative',
				top: 0,
				left: 0,
				right: 0,
				height: '48px',
				pt: '17px',
				pl: '6px',
				pr: '6px',
				justifyContent: 'space-between',
			}}
		>
			<Button iconOnly aria-label="wallet options" color="ghost" size="4">
				<Z3usIcon color="#7448ff" />
			</Button>
			<Button iconOnly aria-label="wallet options" color="ghost" size="3" css={{ mr: '2px' }}>
				<DropdownMenuHamburgerIcon
					css={{
						stroke: '$iconDefault',
					}}
				/>
			</Button>
		</Flex>
		<Box
			css={{
				position: 'absolute',
				top: '48px',
				bottom: '70px',
				width: '100%',
				color: '$txtDefault',
			}}
		>
			<SlideUpPanel name="Tokens">
				{TOKENS.map(token => (
					<Flex
						key={token.id}
						css={{
							borderTop: `${token.id === 1 ? '0' : '1'}px solid`,
							borderColor: '$borderPanel',
							height: '68px',
							px: '16px',
						}}
					>
						<Box css={{ mt: '16px', img: { borderRadius: '50%' } }}>
							<Image layout="fixed" src={token.image} alt="Z3US Wallet" width={36} height={36} />
						</Box>
						<Box css={{ flex: '1', pl: '14px', mt: '16px' }}>
							<Text bold css={{ fontSize: '16px', lineHeight: '22px' }}>
								{token.token}
							</Text>
							<Text color="help" size="3">
								{token.total}
							</Text>
						</Box>
						<Box css={{ mt: '24px' }} />
					</Flex>
				))}
			</SlideUpPanel>
		</Box>
		<ProductFooter />
	</ProductShell>
)

export const ProductUx = (): JSX.Element => (
	<ProductShell>
		<Flex
			css={{
				display: 'flex',
				position: 'relative',
				top: 0,
				left: 0,
				right: 0,
				height: '48px',
				pt: '17px',
				pl: '6px',
				pr: '6px',
				justifyContent: 'space-between',
			}}
		>
			<Button iconOnly aria-label="wallet options" color="ghost" size="4">
				<Z3usIcon color="#7448ff" />
			</Button>
			<Button iconOnly aria-label="wallet options" color="ghost" size="3" css={{ mt: '2px' }}>
				<CloseIcon />
			</Button>
		</Flex>
		<Flex css={{ position: 'absolute', top: '48px', bottom: '70px', width: '100%' }}>
			<Box css={{ width: '100%' }}>
				<Flex direction="column" align="center">
					<Box css={{ mt: '10px', img: { borderRadius: '50%' } }}>
						<Image layout="fixed" src={RadixTokenImage} alt="Z3US Wallet" width={50} height={50} />
					</Box>
					<Text bold size="6" css={{ mt: '15px' }}>
						Radix (XRD)
					</Text>
					<Text bold size="10" css={{ mt: '5px' }}>
						$54.94
					</Text>
				</Flex>
				<Flex align="center" justify="center" css={{ width: '100%', mt: '9px' }}>
					<Text bold size="4" css={{ mr: '$2', mt: '-1px' }}>
						$0.09
					</Text>
					<PriceLabel color="green">
						<Text size="2" bold>
							3.35%
						</Text>
					</PriceLabel>
				</Flex>
				<Flex justify="center" css={{ mt: '$2' }}>
					<Grid gap="5" columns="3" css={{ pt: '20px' }}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size="5" color="inverse" iconOnly circle>
									<UpRightIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent sideOffset={3}>
								<TooltipArrow />
								Send
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size="5" color="inverse" iconOnly circle>
									<DownLeftIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent sideOffset={3}>
								<TooltipArrow />
								Deposit
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size="5" color="inverse" iconOnly circle>
									<ExternalLinkIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent sideOffset={3}>
								<TooltipArrow />
								Explorer
							</TooltipContent>
						</Tooltip>
					</Grid>
				</Flex>
			</Box>
			<SlideUpPanel name="Activity">
				{ACTIVITIES.map(activity => (
					<Flex
						key={activity.id}
						css={{
							borderTop: `${activity.id === 1 ? '0' : '1'}px solid`,
							borderColor: '$borderPanel',
							height: '68px',
							px: '16px',
						}}
					>
						<Box css={{ mt: '16px', img: { borderRadius: '50%' } }}>
							<Image layout="fixed" src={RadixTokenImage} alt="Z3US Wallet" width={36} height={36} />
						</Box>
						<Box css={{ flex: '1', pl: '14px', mt: '16px' }}>
							<Text bold css={{ fontSize: '16px', lineHeight: '22px' }}>
								{activity.total} XRD
							</Text>
							<Text color="help" size="3">
								{activity.address}
							</Text>
						</Box>
						<Box css={{ mt: '24px' }}>
							{activity.type === 'send' ? (
								<Pill color="gradientOrange">Send</Pill>
							) : (
								<Pill color="gradientGreen">Deposit</Pill>
							)}
						</Box>
					</Flex>
				))}
			</SlideUpPanel>
		</Flex>
	</ProductShell>
)
