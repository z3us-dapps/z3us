import React from 'react'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { Cross2Icon } from '@radix-ui/react-icons'
import { CloseIcon } from 'ui/src/components/icons'
import { AccountAddress } from '@src/components/account-address'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger, PopoverClose } from 'ui/src/components/popover'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { ColorSettings } from '@src/services/types'
import { AvatarButton } from '../../../components/avatar-button'

const generateGradient = (
	gradientType: string,
	primary: string,
	primaryStop: string,
	secondary: string,
	secondaryStop: string,
) => {
	const isRadialGradient = gradientType === 'radial'
	return isRadialGradient
		? `radial-gradient(circle at 50% 0%, ${primary} ${primaryStop}%, ${secondary} ${secondaryStop}%)`
		: `linear-gradient(90deg, ${primary} ${primaryStop}%, ${secondary} ${secondaryStop}%)`
}

const PRESET_COLOR_LIGHT_ORCHID = 'preset_color_light_orchid'
const PRESET_COLOR_MINDARO = 'preset_color_mindaro'

const presetMap = {
	[PRESET_COLOR_LIGHT_ORCHID]: {
		[ColorSettings.COLOR_PRIMARY]: '#eeabe0',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#f7dbbf',
		[ColorSettings.COLOR_SECONDARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#330867',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
	},
	[PRESET_COLOR_MINDARO]: {
		[ColorSettings.COLOR_PRIMARY]: '#d8fb91',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#55b3c8',
		[ColorSettings.COLOR_SECONDARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#330867',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
	},
}

const colorMap = {
	[ColorSettings.COLOR_TEXT]: { title: 'Text color' },
	[ColorSettings.COLOR_PRIMARY]: { title: 'Color 1' },
	[ColorSettings.COLOR_SECONDARY]: { title: 'Color 2' },
}

const sharedColorButtonStyle = {
	width: '$9',
	height: '$9',
	br: '$1',
	p: '2px',
	background: 'none',
	outline: 'none',
	border: '1px solid',
	borderColor: '$borderPanel',
}

interface IProps {
	children?: React.ReactNode
	toolTipSideOffset?: number
	toolTipBgColor?: string
	address: string
}

const defaultProps = {
	children: undefined,
	toolTipSideOffset: 3,
	toolTipBgColor: '$bgPanel2',
}

export const AccountModal: React.FC<IProps> = ({ children, toolTipSideOffset, toolTipBgColor, address }) => {
	const { addressBook, setAddressBookEntry } = useStore(state => ({
		addressBook: state.addressBook,
		setAddressBookEntry: state.setAddressBookEntryAction,
	}))

	const entry = addressBook[address]

	const [state, setState] = useImmer({
		...presetMap[PRESET_COLOR_LIGHT_ORCHID],
		...entry?.colorSettings,
		isModalOpen: false,
	})

	const handleOnClick = () => {
		setState(draft => {
			draft.isModalOpen = !draft.isModalOpen
		})
	}

	const handleCloseModal = () => {
		setState(draft => {
			draft.isModalOpen = false
		})
	}

	const handleSaveGradient = () => {
		const background = generateGradient(
			state[ColorSettings.GRADIENT_TYPE],
			state[ColorSettings.COLOR_PRIMARY],
			state[ColorSettings.COLOR_PRIMARY_STOP],
			state[ColorSettings.COLOR_SECONDARY],
			state[ColorSettings.COLOR_SECONDARY_STOP],
		)

		setAddressBookEntry(address, {
			background,
			colorSettings: {
				[ColorSettings.COLOR_TEXT]: state[ColorSettings.COLOR_TEXT],
				[ColorSettings.GRADIENT_TYPE]: state[ColorSettings.GRADIENT_TYPE],
				[ColorSettings.COLOR_PRIMARY]: state[ColorSettings.COLOR_PRIMARY],
				[ColorSettings.COLOR_PRIMARY_STOP]: state[ColorSettings.COLOR_PRIMARY_STOP],
				[ColorSettings.COLOR_SECONDARY]: state[ColorSettings.COLOR_SECONDARY],
				[ColorSettings.COLOR_SECONDARY_STOP]: state[ColorSettings.COLOR_SECONDARY_STOP],
			},
		})

		setState(draft => {
			draft.isModalOpen = false
		})
	}

	const handleSelectPreset = (preset: string) => {
		setState(draft => {
			draft[ColorSettings.COLOR_PRIMARY] = presetMap[preset][ColorSettings.COLOR_PRIMARY]
			draft[ColorSettings.COLOR_SECONDARY] = presetMap[preset][ColorSettings.COLOR_SECONDARY]
			draft[ColorSettings.COLOR_TEXT] = presetMap[preset][ColorSettings.COLOR_TEXT]
		})
	}

	return (
		<Dialog open={state.isModalOpen} modal={false}>
			<DialogTrigger asChild>
				<Tooltip>
					<TooltipTrigger asChild onClick={handleOnClick}>
						{children || (
							<Box>
								<AvatarButton background={entry?.background} />
							</Box>
						)}
					</TooltipTrigger>
					<TooltipContent sideOffset={toolTipSideOffset} css={{ backgroundColor: toolTipBgColor }}>
						<TooltipArrow css={{ fill: toolTipBgColor }} />
						Edit account
					</TooltipContent>
				</Tooltip>
			</DialogTrigger>
			<DialogContent css={{ p: '0' }}>
				<Flex direction="column" css={{ position: 'relative' }}>
					<Button
						color="ghost"
						iconOnly
						aria-label="close color select modal"
						size="2"
						css={{ position: 'absolute', top: '$1', right: '$1' }}
						onClick={handleCloseModal}
					>
						<CloseIcon />
					</Button>
					<Flex
						align="center"
						justify="center"
						css={{
							background: generateGradient(
								state[ColorSettings.GRADIENT_TYPE],
								state[ColorSettings.COLOR_PRIMARY],
								state[ColorSettings.COLOR_PRIMARY_STOP],
								state[ColorSettings.COLOR_SECONDARY],
								state[ColorSettings.COLOR_SECONDARY_STOP],
							),
							borderRadius: '4px 4px 0px 0px',
						}}
					>
						<Flex
							direction="column"
							align="center"
							css={{
								textAlign: 'center',
								position: 'relative',
								zIndex: '1',
								pt: '36px',
								pb: '26px',
							}}
						>
							<AccountAddress
								address={address}
								isCopyButtonVisible={false}
								css={{ color: state[ColorSettings.COLOR_TEXT], fill: state[ColorSettings.COLOR_TEXT] }}
							/>
							<Text
								bold
								as="h2"
								css={{
									fontSize: '32px',
									lineHeight: '38px',
									pt: '2px',
									pb: '2px',
									color: state[ColorSettings.COLOR_TEXT],
								}}
							>
								$99.99
							</Text>
						</Flex>
					</Flex>
					<Box css={{ flex: '1', p: '$5', pb: '0' }}>
						{Object.entries(colorMap).map(([key, color]) => (
							<Box key={key} css={{ pb: '$3' }}>
								<Text bold>{color.title}:</Text>
								<Flex css={{ mt: '$2' }}>
									<Popover>
										<PopoverTrigger asChild>
											<Button css={sharedColorButtonStyle}>
												<Box
													css={{
														width: '100%',
														height: '100%',
														backgroundColor: state[key],
													}}
												/>
											</Button>
										</PopoverTrigger>
										<PopoverContent
											sideOffset={0}
											css={{ width: '200px', backgroundColor: 'transparent', border: 'none' }}
										>
											<Box css={{}}>
												<HexColorPicker
													color={state[key]}
													onChange={_color => {
														setState(draft => {
															draft[key] = _color
														})
													}}
												/>
											</Box>
											<PopoverArrow offset={14} css={{ fill: '$bgPanel' }} />
											<PopoverClose aria-label="Close">
												<Cross2Icon />
											</PopoverClose>
										</PopoverContent>
									</Popover>
									<Input
										value={state[key]}
										placeholder="Enter #HEX"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
											setState(draft => {
												draft[key] = event.currentTarget.value
											})
										}}
										css={{ width: '140px', ml: '$2' }}
									/>
									{key === ColorSettings.COLOR_PRIMARY ? (
										<Input
											value={state[ColorSettings.COLOR_PRIMARY_STOP]}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
												setState(draft => {
													draft[ColorSettings.COLOR_PRIMARY_STOP] = event.currentTarget.value
												})
											}}
											css={{ width: '46px', ml: '$2' }}
										/>
									) : null}
									{key === ColorSettings.COLOR_SECONDARY ? (
										<Input
											value={state[ColorSettings.COLOR_SECONDARY_STOP]}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
												setState(draft => {
													draft[ColorSettings.COLOR_SECONDARY_STOP] = event.currentTarget.value
												})
											}}
											css={{ width: '46px', ml: '$2' }}
										/>
									) : null}
								</Flex>
							</Box>
						))}

						<Box css={{ pt: '$1' }}>
							<Flex gap="3">
								<Button
									color={state[ColorSettings.GRADIENT_TYPE] === 'radial' ? 'primary' : 'tertiary'}
									size="3"
									onClick={() => {
										setState(draft => {
											draft[ColorSettings.GRADIENT_TYPE] = 'radial'
										})
									}}
								>
									Radial
								</Button>
								<Button
									color={state[ColorSettings.GRADIENT_TYPE] === 'linear' ? 'primary' : 'tertiary'}
									size="3"
									onClick={() => {
										setState(draft => {
											draft[ColorSettings.GRADIENT_TYPE] = 'linear'
										})
									}}
								>
									Linear
								</Button>
							</Flex>
						</Box>
						<Box css={{ pt: '$3' }}>
							<Text bold css={{ mb: '$2' }}>
								Select preset:
							</Text>
							<Flex css={{ gap: '$3' }}>
								{Object.entries(presetMap).map(([key, _color]) => (
									<Box key={key} css={{ pb: '$3' }}>
										<Button css={sharedColorButtonStyle} onClick={() => handleSelectPreset(key)}>
											<Box
												css={{
													width: '100%',
													height: '100%',
													background: generateGradient(
														_color[ColorSettings.GRADIENT_TYPE],
														_color[ColorSettings.COLOR_PRIMARY],
														_color[ColorSettings.COLOR_PRIMARY_STOP],
														_color[ColorSettings.COLOR_SECONDARY],
														_color[ColorSettings.COLOR_SECONDARY_STOP],
													),
												}}
											/>
										</Button>
									</Box>
								))}
							</Flex>
						</Box>
					</Box>
					<Flex justify="end" gap="2" css={{ mt: '$3', p: '$3' }}>
						<Button size="3" color="primary" aria-label="save" onClick={handleSaveGradient}>
							Save
						</Button>
						<Button size="3" color="tertiary" aria-label="cancel" onClick={handleCloseModal}>
							Cancel
						</Button>
					</Flex>
				</Flex>
			</DialogContent>
		</Dialog>
	)
}

AccountModal.defaultProps = defaultProps
