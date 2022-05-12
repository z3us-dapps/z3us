import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Grid } from '@nextui-org/react'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import { ToolTip } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'
import { Header } from 'components/header'
import { Container } from 'components/container'
import { config } from 'config'
import { ChromeIcon } from './chrome-icon'
import { BraveIcon } from './brave-icon'
import { FireFoxIcon } from './firefox-icon'
import { EdgeIcon } from './edge-icon'

export const BrowserIconLinks = (): JSX.Element => (
	<Flex align="center" gap="2" css={{ svg: { width: '30px', height: '30px' } }}>
		<ToolTip message="Chrome" bgColor="$bgPanel2">
			<Button target="_blank" href={config.CHROME_STORE_URL} as="a" size="5" color="ghost" iconOnly>
				<ChromeIcon />
			</Button>
		</ToolTip>
		<ToolTip message="Brave" bgColor="$bgPanel2">
			<Button target="_blank" href={config.CHROME_STORE_URL} as="a" size="5" color="ghost" iconOnly>
				<BraveIcon />
			</Button>
		</ToolTip>
		<ToolTip message="Firefox" bgColor="$bgPanel2">
			<Button target="_blank" href={config.CHROME_STORE_URL} as="a" size="5" color="ghost" iconOnly>
				<FireFoxIcon />
			</Button>
		</ToolTip>
		<ToolTip message="Edge" bgColor="$bgPanel2">
			<Button target="_blank" href={config.CHROME_STORE_URL} as="a" size="5" color="ghost" iconOnly>
				<EdgeIcon />
			</Button>
		</ToolTip>
	</Flex>
)
