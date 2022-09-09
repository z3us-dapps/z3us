import React from 'react'
import Image from 'next/image'
import { Flex } from 'ui/src/components/atoms'
import { ToolTip } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'
import { config } from 'config'

export const PartnerLinks = (): JSX.Element => (
	<Flex
		align="center"
		css={{
			gap: '10px',
			svg: { width: '40px', height: '40px' },
			'@xs': { gap: '20px' },
			'@md': { gap: '30px', svg: { width: '60px', height: '60px' } },
		}}
	>
		<ToolTip message="Oci swap" bgColor="$bgPanel2">
			<Button target="_blank" href={config.OCI_SWAP_URL} as="a" size="6" color="ghost" iconOnly>
				<Image src="/images/partner-icons/oci-swap-logo.png" alt="Oci swap logo" width={60} height={60} />
			</Button>
		</ToolTip>
		<ToolTip message="Caviar swap" bgColor="$bgPanel2">
			<Button target="_blank" href={config.CAVIAR_SWAP_URL} as="a" size="6" color="ghost" iconOnly>
				<Image src="/images/partner-icons/caviar-swap-logo.png" alt="Caviar swap logo" width={60} height={60} />
			</Button>
		</ToolTip>
		<ToolTip message="Doge Cube" bgColor="$bgPanel2">
			<Button target="_blank" href={config.DOGE_CUBE_URL} as="a" size="6" color="ghost" iconOnly>
				<Image src="/images/partner-icons/doge-cube-icon.png" alt="Doge Cube logo" width={60} height={60} />
			</Button>
		</ToolTip>
		<ToolTip message="Radit" bgColor="$bgPanel2">
			<Button target="_blank" href={config.RADIT_IO_URL} as="a" size="6" color="ghost" iconOnly>
				<Image src="/images/partner-icons/radit-logo.png" alt="Radit logo" width={60} height={60} />
			</Button>
		</ToolTip>
		<ToolTip message="Astrolescent" bgColor="$bgPanel2">
			<Button target="_blank" href={config.ASTROLESCENT_URL} as="a" size="6" color="ghost" iconOnly>
				<Image
					src="/images/partner-icons/astrolescent-swap-logo.png"
					alt="Astrolescent swap logo"
					width={60}
					height={60}
				/>
			</Button>
		</ToolTip>
	</Flex>
)
