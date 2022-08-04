import React from 'react'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useEventListener } from 'usehooks-ts'
import { AccountAddress } from '@src/components/account-address'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger, PopoverClose } from 'ui/src/components/popover'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { ColorSettings } from '@src/types'
import { Side } from '@radix-ui/popper'
import { colorMap, generateGradient, presetMap } from '@src/config'
import { AvatarButton } from '../../../components/avatar-button'

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
	toolTipSide?: Side
	toolTipBgColor?: string
	toolTipMessage?: string
	address: string
}

const defaultProps = {
	children: undefined,
	toolTipSideOffset: 3,
	toolTipSide: 'bottom',
	toolTipBgColor: '$bgPanel2',
	toolTipMessage: 'Edit color',
}

export const AccountModal = ({
	children,
	toolTipSideOffset,
	toolTipBgColor,
	toolTipMessage,
	toolTipSide,
	address,
}: IProps): JSX.Element => {
	const { entry, setPublicAddress } = useStore(state => ({
		entry: Object.values(state.publicAddresses).find(account => account.address === address),
		setPublicAddress: state.setPublicAddressAction,
	}))

	const [state, setState] = useImmer({
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
			draft[ColorSettings.COLOR_PRIMARY] = entry?.colorSettings[ColorSettings.COLOR_PRIMARY]
			draft[ColorSettings.COLOR_PRIMARY_STOP] = entry?.colorSettings[ColorSettings.COLOR_PRIMARY_STOP]
			draft[ColorSettings.COLOR_SECONDARY] = entry?.colorSettings[ColorSettings.COLOR_SECONDARY]
			draft[ColorSettings.COLOR_SECONDARY_STOP] = entry?.colorSettings[ColorSettings.COLOR_SECONDARY_STOP]
			draft[ColorSettings.COLOR_TERTIARY] = entry?.colorSettings[ColorSettings.COLOR_TERTIARY]
			draft[ColorSettings.COLOR_TERTIARY_STOP] = entry?.colorSettings[ColorSettings.COLOR_TERTIARY_STOP]
			draft[ColorSettings.COLOR_TEXT] = entry?.colorSettings[ColorSettings.COLOR_TEXT]
			draft[ColorSettings.COLOR_BORDER] = entry?.colorSettings[ColorSettings.COLOR_BORDER]
			draft[ColorSettings.GRADIENT_TYPE] = entry?.colorSettings[ColorSettings.GRADIENT_TYPE]
			draft[ColorSettings.GRADIENT_START] = entry?.colorSettings[ColorSettings.GRADIENT_START]
			draft.isModalOpen = false
		})
	}

	const handleSaveGradient = () => {
		const background = generateGradient(
			state[ColorSettings.COLOR_PRIMARY],
			state[ColorSettings.COLOR_PRIMARY_STOP],
			state[ColorSettings.COLOR_SECONDARY],
			state[ColorSettings.COLOR_SECONDARY_STOP],
			state[ColorSettings.COLOR_TERTIARY],
			state[ColorSettings.COLOR_TERTIARY_STOP],
			state[ColorSettings.GRADIENT_TYPE],
			state[ColorSettings.GRADIENT_START],
		)

		setPublicAddress(address, {
			background,
			colorSettings: {
				[ColorSettings.COLOR_TEXT]: state[ColorSettings.COLOR_TEXT],
				[ColorSettings.COLOR_BORDER]: state[ColorSettings.COLOR_BORDER],
				[ColorSettings.COLOR_PRIMARY]: state[ColorSettings.COLOR_PRIMARY],
				[ColorSettings.COLOR_PRIMARY_STOP]: state[ColorSettings.COLOR_PRIMARY_STOP],
				[ColorSettings.COLOR_SECONDARY]: state[ColorSettings.COLOR_SECONDARY],
				[ColorSettings.COLOR_SECONDARY_STOP]: state[ColorSettings.COLOR_SECONDARY_STOP],
				[ColorSettings.COLOR_TERTIARY]: state[ColorSettings.COLOR_TERTIARY],
				[ColorSettings.COLOR_TERTIARY_STOP]: state[ColorSettings.COLOR_TERTIARY_STOP],
				[ColorSettings.GRADIENT_TYPE]: state[ColorSettings.GRADIENT_TYPE],
				[ColorSettings.GRADIENT_START]: state[ColorSettings.GRADIENT_START],
			},
		})

		setState(draft => {
			draft.isModalOpen = false
		})
	}

	const handleSelectPreset = (preset: string) => {
		setState(draft => {
			draft[ColorSettings.COLOR_PRIMARY] = presetMap[preset][ColorSettings.COLOR_PRIMARY]
			draft[ColorSettings.COLOR_PRIMARY_STOP] = presetMap[preset][ColorSettings.COLOR_PRIMARY_STOP]
			draft[ColorSettings.COLOR_SECONDARY] = presetMap[preset][ColorSettings.COLOR_SECONDARY]
			draft[ColorSettings.COLOR_SECONDARY_STOP] = presetMap[preset][ColorSettings.COLOR_SECONDARY_STOP]
			draft[ColorSettings.COLOR_TERTIARY] = presetMap[preset][ColorSettings.COLOR_TERTIARY]
			draft[ColorSettings.COLOR_TERTIARY_STOP] = presetMap[preset][ColorSettings.COLOR_TERTIARY_STOP]
			draft[ColorSettings.COLOR_TEXT] = presetMap[preset][ColorSettings.COLOR_TEXT]
			draft[ColorSettings.COLOR_BORDER] = presetMap[preset][ColorSettings.COLOR_BORDER]
			draft[ColorSettings.GRADIENT_TYPE] = presetMap[preset][ColorSettings.GRADIENT_TYPE]
			draft[ColorSettings.GRADIENT_START] = presetMap[preset][ColorSettings.GRADIENT_START]
		})
	}

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			setState(draft => {
				draft.isModalOpen = false
			})
		}
	})

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
					<TooltipContent side={toolTipSide} sideOffset={toolTipSideOffset} css={{ backgroundColor: toolTipBgColor }}>
						<TooltipArrow css={{ fill: toolTipBgColor }} />
						{toolTipMessage}
					</TooltipContent>
				</Tooltip>
			</DialogTrigger>
			<DialogContent css={{ p: '0' }}>
				<Flex direction="column" css={{ position: 'relative' }}>
					<Button
						color="ghost"
						iconOnly
						aria-label="close color select modal"
						size="1"
						css={{ position: 'absolute', top: '$2', right: '$2', color: state[ColorSettings.COLOR_TEXT] }}
						onClick={handleCloseModal}
					>
						<Cross2Icon />
					</Button>
					<Flex
						align="center"
						justify="center"
						css={{
							background: generateGradient(
								state[ColorSettings.COLOR_PRIMARY],
								state[ColorSettings.COLOR_PRIMARY_STOP],
								state[ColorSettings.COLOR_SECONDARY],
								state[ColorSettings.COLOR_SECONDARY_STOP],
								state[ColorSettings.COLOR_TERTIARY],
								state[ColorSettings.COLOR_TERTIARY_STOP],
								state[ColorSettings.GRADIENT_TYPE],
								state[ColorSettings.GRADIENT_START],
							),
							borderRadius: '4px 4px 0px 0px',
							borderBottom: `2px solid ${state[ColorSettings.COLOR_BORDER]}`,
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
					<Box
						css={{
							flex: '1',
							p: '$5',
							pb: '0',
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gridColumnGap: '12px',
						}}
					>
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
										css={{ width: '84px', ml: '$2' }}
									/>
								</Flex>
							</Box>
						))}
					</Box>
					<Box css={{ pt: '$2', px: '$5' }}>
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
													_color[ColorSettings.COLOR_PRIMARY],
													_color[ColorSettings.COLOR_PRIMARY_STOP],
													_color[ColorSettings.COLOR_SECONDARY],
													_color[ColorSettings.COLOR_SECONDARY_STOP],
													_color[ColorSettings.COLOR_TERTIARY],
													_color[ColorSettings.COLOR_TERTIARY_STOP],
													_color[ColorSettings.GRADIENT_TYPE],
													_color[ColorSettings.GRADIENT_START],
												),
											}}
										/>
									</Button>
								</Box>
							))}
						</Flex>
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
