import { CSS } from './theme'

export type PropsWithCSS<P> = P & { css?: CSS | undefined }
