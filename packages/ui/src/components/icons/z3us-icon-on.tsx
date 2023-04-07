/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const Z3usIconOn = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', width = '24', height = '24', bgColor, ...props }, forwardedRef) => (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			{...props}
			ref={forwardedRef}
		>
			<g clipPath="url(#clip0_1223_144)">
				<path
					d="M22.8 12.0002C22.8 17.9649 17.9646 22.8002 12 22.8002C6.03528 22.8002 1.19995 17.9649 1.19995 12.0002C1.19995 6.03552 6.03528 1.2002 12 1.2002C17.9646 1.2002 22.8 6.03552 22.8 12.0002Z"
					fill={bgColor}
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM12 22.8C17.9647 22.8 22.8 17.9647 22.8 12C22.8 6.03532 17.9647 1.2 12 1.2C6.03532 1.2 1.2 6.03532 1.2 12C1.2 17.9647 6.03532 22.8 12 22.8Z"
					fill={color}
				/>
				<path
					d="M22.8 12.0002C22.8 17.9649 17.9646 22.8002 12 22.8002C6.03528 22.8002 1.19995 17.9649 1.19995 12.0002C1.19995 6.03552 6.03528 1.2002 12 1.2002C17.9646 1.2002 22.8 6.03552 22.8 12.0002Z"
					fill={bgColor}
				/>
				<mask
					id="mask0_1223_144"
					style={{ maskType: 'alpha' }}
					maskUnits="userSpaceOnUse"
					x="1"
					y="1"
					width="22"
					height="22"
				>
					<path
						d="M22.1992 12.0003C22.1992 17.6336 17.6325 22.2003 11.9992 22.2003C6.36589 22.2003 1.79919 17.6336 1.79919 12.0003C1.79919 6.36699 6.36589 1.80029 11.9992 1.80029C17.6325 1.80029 22.1992 6.36699 22.1992 12.0003Z"
						fill="#C4C4C4"
					/>
				</mask>
				<g mask="url(#mask0_1223_144)">
					<path
						d="M22.4991 1.26025H1.37914C1.31286 1.26025 1.25914 1.31398 1.25914 1.38025V8.56345L9.53185 5.668C9.68789 5.61339 9.85114 5.72921 9.85114 5.89453V8.22518C9.85114 8.3905 10.0144 8.50632 10.1704 8.4517L18.4431 5.55625L8.49994 11.7708C8.34008 11.8707 8.13274 11.7557 8.13274 11.5672V10.3085C8.13274 10.1153 7.91601 10.0013 7.75677 10.1107L1.25914 14.5779V22.5003C1.25914 22.6328 1.36659 22.7403 1.49914 22.7403H22.6191C22.6854 22.7403 22.7391 22.6865 22.7391 22.6203V15.4371L14.4664 18.3325C14.3104 18.3871 14.1471 18.2713 14.1471 18.106V15.7753C14.1471 15.61 13.9839 15.4942 13.8279 15.5488L5.55514 18.4443L15.4983 12.2298C15.6582 12.1298 15.8655 12.2448 15.8655 12.4333V13.692C15.8655 13.8852 16.0823 13.9993 16.2415 13.8898L22.7391 9.42265V1.50025C22.7391 1.36771 22.6317 1.26025 22.4991 1.26025Z"
						fill={color}
					/>
				</g>
				<g filter="url(#filter0_dddii_1223_144)">
					<rect x="12" y="12" width="12" height="12" rx="6" fill="#19B00C" />
					<path
						d="M15.75 18.75L17 20.25L20.25 15.75"
						stroke="white"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
				<path
					opacity="0.2"
					d="M12 18C12 14.6863 14.6863 12 18 12C21.3137 12 24 14.6863 24 18C24 21.3137 21.3137 24 18 24C14.6863 24 12 21.3137 12 18Z"
					fill="url(#paint0_linear_1223_144)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_dddii_1223_144"
					x="-20"
					y="-20"
					width="76"
					height="76"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="16" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1223_144" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="4" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
					<feBlend mode="normal" in2="effect1_dropShadow_1223_144" result="effect2_dropShadow_1223_144" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="1" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
					<feBlend mode="normal" in2="effect2_dropShadow_1223_144" result="effect3_dropShadow_1223_144" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_1223_144" result="shape" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-1" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
					<feBlend mode="normal" in2="shape" result="effect4_innerShadow_1223_144" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
					<feBlend mode="normal" in2="effect4_innerShadow_1223_144" result="effect5_innerShadow_1223_144" />
				</filter>
				<linearGradient id="paint0_linear_1223_144" x1="18" y1="12" x2="18" y2="24" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="1" stopColor="white" stopOpacity="0" />
				</linearGradient>
				<clipPath id="clip0_1223_144">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>
	),
)

export default Z3usIconOn
