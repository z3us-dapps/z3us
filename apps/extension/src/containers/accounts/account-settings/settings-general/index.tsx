import clsx, { ClassValue } from 'clsx'
import React, { forwardRef, useState } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValue,
} from 'ui/src/components-v2/select'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronDown2Icon } from 'ui/src/components/icons'

import * as styles from '../account-settings.css'

interface ISettingsGeneralRequiredProps {}

interface ISettingsGeneralOptionalProps {
	className?: ClassValue
}

interface ISettingsGeneralProps extends ISettingsGeneralRequiredProps, ISettingsGeneralOptionalProps {}

const defaultProps: ISettingsGeneralOptionalProps = {
	className: undefined,
}

export const SettingsGeneral = forwardRef<HTMLElement, ISettingsGeneralProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const [value, setValue] = useState<string>('usd')

		return (
			<Box ref={ref} className={clsx(styles.settingsSectionFlexColumnWrapper, className)}>
				{/* START TITLE SECTION */}
				<Box className={styles.settingsSectionBorderWrapper}>
					<Box display="flex" flexDirection="column" gap="small">
						<Text size="xxlarge" weight="strong" color="strong">
							General settings
						</Text>
						<Box>
							<Text>
								Ut imperdiet nam nam velit eu magna, neque eu eu porta. m duis non pretium, mus laoreet tempor velit
								integer tristique etiam integer.
							</Text>
						</Box>
					</Box>
				</Box>
				{/* END TITLE SECTION */}
				{/* START LOCK SECTION */}
				<Box className={styles.settingsSectionBorderWrapper}>
					<Box className={styles.settingsSectionGridBasic}>
						<Box display="flex" flexDirection="column" >
							<Text size="large" weight="strong" color="strong">
								Session lock
							</Text>
							<Box>
								<Text size="small">Ut imperdiet</Text>
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Box>
								{/* TODO: create more simple select */}
								<SelectRoot value={value} onValueChange={setValue}>
									<SelectTrigger asChild aria-label="Lock session">
										<Button styleVariant="secondary" rightIcon={<ChevronDown2Icon />}>
											<SelectValue aria-label={value}>
												<Box display="flex">
													<Box component="span">$70,887&nbsp;</Box>
													<Box component="span" style={{ textTransform: 'uppercase' }}>
														{value}
													</Box>
												</Box>
											</SelectValue>
										</Button>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{Array.from({ length: 10 }).map((_, i, a) => (
												<SelectItem key={`beta.${a.length - i}`} value={`beta.${a.length - i}`}>
													<Text truncate size="small" color="strong">{`beta.${a.length - i}`}</Text>
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</SelectRoot>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* END LOCK SELECT */}
			</Box>
		)
	},
)

SettingsGeneral.defaultProps = defaultProps
