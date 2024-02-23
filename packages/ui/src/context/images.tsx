import type { Context } from 'react'
import { createContext } from 'react'

export type TImages = Map<string, string>

export type State = {
	images: TImages
	setImages: (images: TImages) => void
}

export const ImageContext: Context<State> = createContext<State>({
	images: new Map(),
	setImages: () => {},
})
