import clsx, { ClassValue } from 'clsx'
import React, { forwardRef, useState } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { SelectSimple } from 'ui/src/components-v2/select'
import { Text } from 'ui/src/components-v2/typography'
import { Button } from 'ui/src/components-v2/button'
import { Switch } from 'ui/src/components-v2/switch'

import { LoadingBarsIcon } from 'ui/src/components/icons'

import * as styles from '../account-settings.css'

// TODO: remove demo
type IMetaProps = {
	title: string
	description?: string
}

const Meta: React.FC<IMetaProps> = props => {
	const { title = 'hello', description = 'def' } = props

	return (
		<div style={{ display: 'none' }}>
			<pre>{title}</pre>
			<pre>{description}</pre>
		</div>
	)
}

interface ISettingsGeneralProps {
	className?: ClassValue
}

export const SettingsGeneral: React.FC<ISettingsGeneralProps> = forwardRef<HTMLElement, ISettingsGeneralProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const [value, setValue] = useState<string | undefined>()

		return (
			<Box ref={ref} className={clsx(styles.settingsSectionFlexColumnWrapper, className)}>
				<Meta title="asdf" />
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
						<Box display="flex" flexDirection="column">
							<Text size="large" weight="strong" color="strong">
								Session lock
							</Text>
							<Box>
								<Text size="small">Ut imperdiet</Text>
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<SelectSimple
								value={value}
								placeholder="Select currency"
								onValueChange={val => {
									setValue(val)
								}}
								data={Array.from({ length: 20 }, (_, i) => ({
									id: `${i}`,
									title: `${i} -- ${(Math.random() + 1)
										.toString(36)
										.substring(
											7,
										)} llong test long tes tong test long test llong test long tes tong test long test llong test long tes
								tong test long test llong test long tes tong test long test llong test long tes tong test long test llong test long tes
								tong test long test llong test long tes tong test long test llong test long tes tong test long test llong test long tes
								tong test long test`,
								}))}
							/>
						</Box>
					</Box>
				</Box>
				{/* END LOCK SELECT */}
				{/* START CURRENCY SELECTION SECTION */}
				<Box className={styles.settingsSectionBorderWrapper}>
					<Box className={styles.settingsSectionGridBasic}>
						<Box display="flex" flexDirection="column">
							<Text size="large" weight="strong" color="strong">
								Default currency
							</Text>
							<Box>
								<Text size="small">Ut imperdiet</Text>
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Box>
								<SelectSimple
									value={value}
									placeholder="Select currency"
									onValueChange={val => {
										setValue(val)
									}}
									data={Array.from({ length: 20 }, (_, i) => ({
										id: `${i}`,
										title: `${i} -- ${(Math.random() + 1)
											.toString(36)
											.substring(
												7,
											)} llong test long tes tong test long test llong test long tes tong test long test llong test long tes
								tong test long test llong test long tes tong test long test llong test long tes tong test long test llong test long tes
								tong test long test llong test long tes tong test long test llong test long tes tong test long test llong test long tes
								tong test long test`,
									}))}
								/>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* END CURRENCY SELECTION */}
				{/* START NOTIFICATIONS SECTION */}
				<Box className={styles.settingsSectionBorderWrapper}>
					<Box className={styles.settingsSectionGridBasic}>
						<Box display="flex" flexDirection="column">
							<Text size="large" weight="strong" color="strong">
								Notifications
							</Text>
							<Box>
								<Text size="small">Ut imperdiet</Text>
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Box display="flex" alignItems="center" gap="medium">
								<Box>
									<Switch />
								</Box>
								<Box>
									<Text size="xsmall">Push</Text>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* END NOTIFICATIONS SECTION */}
				{/* START SAVE SETTINGS SECTION */}
				<Box className={styles.settingsSectionBorderWrapper}>
					<Box className={styles.settingsSectionGridBasic}>
						<Box display="flex" flexDirection="column">
							<Text size="large" weight="strong" color="strong">
								Save settings
							</Text>
							<Box>
								<Text size="small">Sync to cloud</Text>
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Box>
								<pre>folder to save the settings</pre>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* END SAVE SETTINGS SECTION */}
				{/* SAVE SECTION */}
				<Box>
					<Box className={styles.settingsSectionGridBasic}>
						<Box display="flex" flexDirection="column">
							&nbsp;
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Box width="full" display="flex" justifyContent="flex-end">
								<Button
									styleVariant="primary"
									sizeVariant="large"
									disabled
									rightIcon={
										<Box marginLeft="small">
											<LoadingBarsIcon />
										</Box>
									}
								>
									Save
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* END SAVE SECTION */}
			</Box>
		)
	},
)
