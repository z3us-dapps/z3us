import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'

import { Box, Flex, Text } from '../../atoms'
import Button from '../../button'
import { CloseIcon } from '../../icons'

export const TYPE_SUCCESS = 'success'
export const TYPE_ERROR = 'error'
export const TYPE_INFO = 'info'

const typeMap = {
	[TYPE_SUCCESS]: {
		bg: '$bgToastSuccess',
		icon: '',
		iconBg: '#53c323',
	},
	[TYPE_ERROR]: {
		bg: '$bgToastError',
		icon: '',
		iconBg: '#e94c24',
	},
	[TYPE_INFO]: {
		bg: '$bgToastError',
		icon: '',
		iconBg: '#e94c24',
	},
	caution: { bg: '', icon: '', iconBg: '' },
}

interface IProps {
	children?: React.ReactNode
	type?: string
	title?: string
	subTitle?: string | React.ReactElement
	duration?: number
	isAutoRemovable?: boolean
	onClickClose?: () => void
}

const defaultProps = {
	children: undefined,
	title: undefined,
	subTitle: undefined,
	duration: 3000,
	type: TYPE_SUCCESS,
	isAutoRemovable: true,
	onClickClose: () => {},
}

export const Toast: React.FC<IProps> = ({
	children,
	type,
	title,
	subTitle,
	duration,
	isAutoRemovable,
	onClickClose,
}) => {
	const typeInfo = typeMap[type]

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (isAutoRemovable) {
				onClickClose()
			}
		}, duration)

		return () => clearTimeout(timeoutId)
	}, [])

	return (
		<Box>
			<Flex
				align="center"
				css={{
					background: typeInfo?.bg,
					border: '1px solid $borderPanel2',
					color: '$txtDefault',
					pl: '$3',
					pr: '$1',
					py: '$3',
					br: '$2',
					mt: '$3',
					mx: '$4',
					backdropFilter: 'blur(5px)',
				}}
			>
				<Flex
					align="center"
					justify="center"
					css={{ width: '24px', height: '24px', br: '50%', color: typeInfo?.iconBg, border: '0px solid' }}
				>
					{(() => {
						switch (type) {
							case TYPE_SUCCESS:
								return <CheckIcon />
							case TYPE_ERROR:
								return <ExclamationTriangleIcon />
							default:
								return null
						}
					})()}
				</Flex>
				<Box css={{ ml: '$2', flex: '1' }}>
					{children ? (
						<Text medium size="4">
							{children}
						</Text>
					) : (
						<>
							<Text medium size="4">
								{title}
							</Text>
							{subTitle ? (
								<Text size="3" css={{ mt: '$1' }}>
									{subTitle}
								</Text>
							) : null}
						</>
					)}
				</Box>
				<Button
					onClick={onClickClose}
					color="ghost"
					iconOnly
					aria-label="wallet options"
					size="3"
					css={{ mt: '2px', mr: '2px', color: '$txtMuted' }}
				>
					<CloseIcon />
				</Button>
			</Flex>
		</Box>
	)
}

Toast.defaultProps = defaultProps
