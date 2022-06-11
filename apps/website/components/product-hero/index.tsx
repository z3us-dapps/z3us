/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useEffect } from 'react'
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
	AccountsIcon,
	StakingIcon,
	SettingsIcon,
	PulseIcon,
} from 'ui/src/components/icons'
import { DropdownMenuHamburgerIcon } from 'ui/src/components/drop-down-menu'
import RadixTokenImage from 'public/images/token-images/xrd.png'
import OciTokenImage from 'public/images/token-images/oci.png'
import DelphiTokenImage from 'public/images/token-images/dph.png'
import DogeTokenImage from 'public/images/token-images/dgc.png'
import InuTokenImage from 'public/images/token-images/inu.png'

const SLIDER_WIDTH = 308
const SLIDER_HEIGHT = 169
const LEFT_OFFSET = 26
export const SLIDE_PANEL_HEIGHT = 144
export const SLIDE_PANEL_EXPAND_HEIGHT = 462

const ACCOUNT_SLIDES = [
	{
		id: 1,
		address: 'rdx1...7hfy',
		total: '$5184.68',
		change: '2.31%',
		bg: 'radial-gradient(77.21% 96.45% at 50% 100%, rgb(254, 132, 94) 0%, rgb(224, 139, 171) 18%, rgb(148, 109, 255) 60%)',
		borderColor: 'rgb(217, 228, 243)',
		color: 'rgb(14, 3, 36)',
	},
	{
		id: 2,
		address: 'rdx1...a1vm',
		total: '$124.68',
		change: '1.71%',
		bg: 'radial-gradient(77.21% 96.45% at 50% 100%, rgb(232, 165, 75) 0%, rgb(229, 140, 93) 20%, rgb(174, 196, 221) 40%)',
		borderColor: 'rgb(216, 228, 242)',
		color: 'rgb(65, 22, 12)',
	},
	{
		id: 3,
		address: 'rdx1...6ffh',
		total: '$30.18',
		change: '2.19%',
		bg: 'radial-gradient(78.38% 240.44% at 17.23% 25.44%, rgb(247, 219, 191) 0%, rgb(242, 190, 200) 50%, rgb(238, 171, 224) 100%)',
		borderColor: 'rgb(255, 232, 238)',
		color: 'rgb(14, 3, 36)',
	},
]

const TOKENS = [
	{ id: 1, token: 'Radix (XRD)', total: '59032', price: '100', change: '100', image: RadixTokenImage },
	{ id: 2, token: 'Ociswap (OCI)', total: '100', price: '100', change: '100', image: OciTokenImage },
	{ id: 3, token: 'Delphibets (DPH)', total: '50', price: '100', change: '100', image: DelphiTokenImage },
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
				showRipple={false}
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
				showRipple={false}
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
				showRipple={false}
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
					Settings1
				</Text>
			</Button>
		</Flex>
	</Box>
)

export const ProductShell: React.FC = ({ children }) => (
	<Box
		css={{
			color: '$txtDefault',
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

export const ProductHero = (): JSX.Element => {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0)

	const [xVal, setXVal] = useState(LEFT_OFFSET + activeSlideIndex * -SLIDER_WIDTH)
	const containerRef = useRef(null)
	const containerWidth = containerRef.current?.offsetWidth

	useEffect(() => {
		setXVal(LEFT_OFFSET + activeSlideIndex * -SLIDER_WIDTH)
	}, [activeSlideIndex])

	return (
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
				<Box>
					{ACCOUNT_SLIDES.map((_, idx) => (
						<Button
							iconOnly
							size="1"
							key={idx}
							onClick={() => setActiveSlideIndex(idx)}
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
				</Box>
				<Button iconOnly aria-label="wallet options" color="ghost" size="3" css={{ mr: '2px' }}>
					<DropdownMenuHamburgerIcon
						css={{
							stroke: '$iconDefault',
						}}
					/>
				</Button>
			</Flex>
			<Flex
				ref={containerRef}
				direction="column"
				css={{ position: 'absolute', top: '50px', left: '0', right: '0', height: '279px', zIndex: '1' }}
			>
				<Box css={{ width: `${containerWidth}px`, height: `${SLIDER_HEIGHT}px`, position: 'relative', mt: '20px' }}>
					<MotionBox
						css={{ width: `${SLIDER_WIDTH * (ACCOUNT_SLIDES.length + 2)}px`, display: 'flex' }}
						animate={{ x: xVal }}
						initial={false}
						transition={{ duration: 0.3 }}
					>
						{ACCOUNT_SLIDES.map((address, idx) => (
							<Box
								key={address.id}
								onClick={() => setActiveSlideIndex(idx)}
								css={{
									width: `${SLIDER_WIDTH}px`,
									height: `${SLIDER_HEIGHT}px`,
									px: '6px',
									py: '0',
									border: 'none',
									margin: 0,
								}}
							>
								<Flex
									justify="center"
									css={{
										border: `1px solid ${address.borderColor}`,
										position: 'relative',
										background: address.bg,
										boxShadow: '$accountPanelShadow',
										height: '100%',
										borderRadius: '14px',
										'&::before': {
											content: '""',
											position: 'absolute',
											top: '0',
											bottom: '0',
											left: '0',
											right: '0',
											pointerEvents: 'none',
											backgroundImage: 'url("/images/lightening-card-bg.svg")',
											backgroundSize: '100%',
											backgroundRepeat: 'no-repeat',
											backgroundPosition: 'center 20px',
										},
										'&::after': {
											content: '""',
											borderRadius: '12px',
											position: 'absolute',
											top: '-1px',
											bottom: '-1px',
											left: '-1px',
											right: '-1px',
											border: `2px solid ${address.borderColor}`,
											pointerEvents: 'none',
										},
									}}
								>
									<Flex
										direction="column"
										align="center"
										css={{ textAlign: 'center', position: 'relative', zIndex: '1', pt: '39px' }}
									>
										<Text size="5" css={{ color: address.color }}>
											{address.address}
										</Text>
										<Flex
											justify="center"
											css={{
												pt: '4px',
												pb: '0',
												height: '42px',
												position: 'relative',
												minWidth: '140px',
											}}
										>
											<Text
												bold
												as="h2"
												css={{
													fontSize: '32px',
													lineHeight: '38px',
													color: address.color,
													transition: '$default',
												}}
											>
												{address.total}
											</Text>
										</Flex>
										<Text size="7" css={{ fill: address.color, color: address.color, mt: '4px' }}>
											{address.change}
										</Text>
									</Flex>
								</Flex>
							</Box>
						))}
					</MotionBox>
				</Box>

				<Flex justify="center" css={{ position: 'relative', zIndex: '1' }}>
					<Grid gap="5" columns="3" css={{ pt: '24px' }}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size="5" color="inverse" iconOnly circle>
									<UpRightIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent sideOffset={3}>
								<TooltipArrow css={{ fill: '$bgPanel' }} />
								Send
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size="5" color="inverse" iconOnly circle>
									<DownLeftIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
								<TooltipArrow css={{ fill: '$bgPanel' }} />
								Deposit
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size="5" color="inverse" iconOnly circle>
									<PulseIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent sideOffset={3} css={{ backgroundColor: '$bgPanel' }}>
								<TooltipArrow css={{ fill: '$bgPanel' }} />
								Activity
							</TooltipContent>
						</Tooltip>
					</Grid>
				</Flex>
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
}

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
