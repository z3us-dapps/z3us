import { useContext } from 'react'

import { ImageContext } from 'ui/src/context/images'

export const useImages = () => useContext(ImageContext)
