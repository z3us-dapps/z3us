import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { radixWithClassName } from '../system/radix-with-class-name'
import * as styles from './avatar.css'

export const Avatar = radixWithClassName(AvatarPrimitive.Root, styles.avatarRoot)
export const AvatarImage = radixWithClassName(AvatarPrimitive.Image, styles.avatarImage)
export const AvatarFallback = radixWithClassName(AvatarPrimitive.Fallback, styles.avatarFallback)
