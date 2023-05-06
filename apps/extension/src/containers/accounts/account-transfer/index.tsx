/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { FormElement, Input } from 'ui/src/components-v2/input'
import { Text } from 'ui/src/components-v2/typography'
import { AtSignIcon, CheckCircleIcon, ChevronDown2Icon, CoinsIcon, WriteNoteIcon } from 'ui/src/components/icons'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Link } from '@src/components/link'
import Translation from '@src/components/translation'
import { accountMenuSlugs } from '@src/constants'

import * as styles from './account-transfer.css'

interface IAccountTransferRequiredProps {}

interface IAccountTransferOptionalProps {
	className?: string
	scrollableNode?: HTMLElement | null
}

interface IAccountTransferProps extends IAccountTransferRequiredProps, IAccountTransferOptionalProps {}

const defaultProps: IAccountTransferOptionalProps = {
	className: undefined,
	scrollableNode: undefined,
}

export const AccountTransfer = forwardRef<HTMLElement, IAccountTransferProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollableNode } = props

		const { t } = useTranslation()
		const inputRef = useRef(null)
		const [inputValue, setInputValue] = useState<string>('')

		const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
			const { value } = event.target

			// setInputValue(value)
		}

		const handleAddMessage = () => {
			// eslint-disable-next-line
			console.log('add message')
		}

		return (
			<Box ref={ref} className={clsx(styles.transferWrapper, className)}>
				<Box className={styles.transferFlexColWrapper}>
					<Box>
						<Box paddingBottom="large">
							<Text size="xxxlarge" weight="strong" color="strong">
								Send
							</Text>
						</Box>
						<Box display="flex" paddingBottom="medium" alignItems="center">
							<Box flexGrow={1} alignItems="center">
								<Text size="medium" color="strong">
									From
								</Text>
							</Box>
							<Box display="flex" alignItems="center">
								<Box display="flex" alignItems="center" marginRight="xxsmall">
									<WriteNoteIcon />
								</Box>
								<Box component="button" onClick={handleAddMessage} cursor="pointer">
									<Text size="medium" underline="always" truncate>
										Add message
									</Text>
								</Box>
							</Box>
						</Box>
						<Box width="full">
							<Input
								sizeVariant="large"
								value={inputValue}
								ref={inputRef}
								placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
								onChange={handleOnChange}
							/>
						</Box>
					</Box>
					<Box>
						<Box display="flex" paddingBottom="medium">
							<Box display="flex" alignItems="center" width="full">
								<Box flexGrow={1}>
									<Text size="medium" color="strong">
										To
									</Text>
								</Box>
								<Box display="flex" alignItems="center" color="green500" marginRight="xxsmall">
									<CheckCircleIcon />
								</Box>

								<Box display="flex" alignItems="center" gap="medium">
									<Box alignItems="center">
										<Text size="medium" truncate>
											Known address
										</Text>
									</Box>
									<Box className={styles.transferUiTextSeperator} />
									<Box display="flex" alignItems="center">
										<Box display="flex" alignItems="center" marginRight="xxsmall">
											<AtSignIcon />
										</Box>
										<Box component="button" cursor="pointer">
											<Text size="medium" truncate underline="always">
												Add address
											</Text>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
						<Box width="full">
							<Input
								sizeVariant="large"
								value={inputValue}
								ref={inputRef}
								placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
								onChange={handleOnChange}
							/>
						</Box>
					</Box>
					<Box>
						<Box display="flex" paddingBottom="medium">
							<Box flexGrow={1}>
								<Text size="medium" color="strong">
									Amount
								</Text>
							</Box>
							{/* <Box display="flex"> */}
							{/* 	<Text size="medium" truncate> */}
							{/* 		Available:&nbsp; */}
							{/* 	</Text> */}
							{/* 	<Link to="/accounts"> */}
							{/* 		<Text size="medium" truncate> */}
							{/* 			3.13 BTC */}
							{/* 		</Text> */}
							{/* 	</Link> */}
							{/* </Box> */}
						</Box>
						<Box width="full">
							<Input
								sizeVariant="large"
								value={inputValue}
								ref={inputRef}
								placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
								onChange={handleOnChange}
							/>
						</Box>
						<Box display="flex" paddingTop="small">
							<Box display="flex" alignItems="center" flexGrow={1} gap="medium">
								<Box display="flex" alignItems="center">
									<Text size="medium" truncate>
										Available:&nbsp;
									</Text>
									<Link to={accountMenuSlugs.ACCOUNTS}>
										<Text size="medium" truncate>
											3.13 BTC
										</Text>
									</Link>
								</Box>
								<Box className={styles.transferUiTextSeperator} />
								<Link to={accountMenuSlugs.ACCOUNTS} underline="hover">
									<Box display="flex" gap="xxsmall" alignItems="center">
										<Text size="medium">$70,887 USD</Text>
										<ChevronDown2Icon />
									</Box>
								</Link>
							</Box>
							<Box display="flex" alignItems="center">
								{/* <Text size="medium" truncate> */}
								{/* 	Available:&nbsp; */}
								{/* </Text> */}
								<Box display="flex" alignItems="center" marginRight="xxsmall">
									<CoinsIcon />
								</Box>
								<Box component="button" cursor="pointer">
									<Text size="medium" truncate underline="always">
										Send another token
									</Text>
								</Box>
							</Box>
						</Box>
					</Box>
					<Box display="flex" paddingTop="medium" width="full">
						<Button styleVariant="primary" sizeVariant="xlarge" fullWidth disabled 							rightIcon={<ChevronDown2Icon />}
>
							<Translation capitalizeFirstLetter text="global.continue" />
						</Button>
					</Box>

					{/* {[...Array(30)].map((_, i) => ( */}
					{/* 	// eslint-disable-next-line */}
					{/* 	<Box key={i}> */}
					{/* 		<Text size="xxxlarge">transfer</Text> */}
					{/* 	</Box> */}
					{/* ))} */}
				</Box>
			</Box>
		)
	},
)

AccountTransfer.defaultProps = defaultProps
