import React, { useState } from 'react'
import Button from 'ui/src/components/button'
import { Z3usIcon } from 'ui/src/components/icons'
import { Box, MotionBox } from 'ui/src/components/atoms'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from 'ui/src/components/drop-down-menu'
import { Z3US_URL } from '@src/config'

export const Z3usMenu: React.FC = () => {
	const [isOpen, setIsopen] = useState(false)

	const handleConnectHW = () => {
		window.open(`${Z3US_URL}/docs`)
	}

	return (
		<MotionBox animate={isOpen ? 'open' : 'closed'}>
			<DropdownMenu onOpenChange={setIsopen}>
				<DropdownMenuTrigger asChild>
					<Button iconOnly aria-label="wallet options" color="ghost" size="4" css={{ mr: '2px' }} clickable={false}>
						<Z3usIcon color="#7448ff" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="bottom" sideOffset={6} alignOffset={-3} css={{ minWidth: '130px' }}>
					<DropdownMenuItem onSelect={handleConnectHW}>
						<Box css={{ flex: '1', pr: '$4' }}>Documentation</Box>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</MotionBox>
	)
}
