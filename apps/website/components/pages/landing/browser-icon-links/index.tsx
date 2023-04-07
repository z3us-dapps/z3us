import { config } from 'config'
import React from 'react'

import { Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { ToolTip } from 'ui/src/components/tool-tip'

import { BraveIcon } from './brave-icon'
import { ChromeIcon } from './chrome-icon'
import { EdgeIcon } from './edge-icon'
import { FireFoxIcon } from './firefox-icon'

export const BrowserIconLinks = (): JSX.Element => (
	<Flex
		align="center"
		css={{
			gap: '10px',
			svg: { width: '40px', height: '40px' },
			'@xs': { gap: '20px' },
			'@md': { gap: '12px', svg: { width: '30px', height: '30px' } },
		}}
	>
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
			<Button target="_blank" href={config.FIREFOX_STORE_URL} as="a" size="5" color="ghost" iconOnly>
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
