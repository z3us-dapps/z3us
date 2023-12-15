import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { Text } from 'ui/src/components/typography'
import { brandImages } from 'ui/src/context/images-provider'

import { FormFields as AstrolecentFormFields } from './components/astrolescent/form-fields'
import { FormFields as OciFormFields } from './components/oci/form-fields'
import * as styles from './styles.css'

const messages = defineMessages({
	dex: {
		id: 'a7U+1J',
		defaultMessage: 'Exchange:',
	},
	tab_oci: {
		id: 'eyMKyf',
		defaultMessage: 'OCI',
	},
	tab_astrolecent: {
		id: 'CrAj8T',
		defaultMessage: 'Astrolecent',
	},
})

const OCI = 'oci'
const ASTROLECENT = 'astrolecent'

export const Dex: React.FC = () => {
	const intl = useIntl()

	const exchangeInfo = useMemo(
		() => ({
			[OCI]: {
				title: intl.formatMessage(messages.tab_oci),
				image: brandImages.OCI_SWAP,
			},
			[ASTROLECENT]: {
				title: intl.formatMessage(messages.tab_astrolecent),
				image: brandImages.ASTROLESCENT,
			},
		}),
		[],
	)

	const [dex, setDex] = useState<keyof typeof exchangeInfo>(OCI)

	return (
		<Box>
			<Box className={styles.swapExchangeButtonWrapper}>
				<Box paddingRight="small">
					<Text size="medium">{intl.formatMessage(messages.dex)}</Text>
				</Box>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Box
							component="button"
							display="inline-flex"
							alignItems="center"
							className={clsx(
								plainButtonStyles.plainButtonHoverWrapper,
								plainButtonStyles.plainButtonHoverUnderlineWrapper,
							)}
						>
							<Text size="medium" color="inherit">
								{exchangeInfo[dex].title}
							</Text>
							<Box paddingLeft="small">
								<ResourceImageIcon size="small" address={exchangeInfo[dex].image} />
							</Box>
						</Box>
					</DropdownMenuTrigger>
					<DropdownMenuPortal>
						<DropdownMenuContent align="start" sideOffset={2} className={styles.swapDropdownContentWrapper}>
							{Object.entries(exchangeInfo).map(([key, { title, image }]) => (
								<DropdownMenuItem key={key} onSelect={() => setDex(key as keyof typeof exchangeInfo)}>
									<DropdownMenuLeftSlot>
										<ResourceImageIcon size="small" address={image} />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall" truncate>
											{title}
										</Text>
									</Box>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenuPortal>
				</DropdownMenu>
			</Box>
			{
				{
					[OCI]: <OciFormFields />,
					[ASTROLECENT]: <AstrolecentFormFields />,
				}[dex]
			}
		</Box>
	)
}
