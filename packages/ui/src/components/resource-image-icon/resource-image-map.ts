/**
 * Represents an entry in the image map for resources.
 *
 * @typedef {Object} ImageMapEntry
 * @property {string} name - The name of the image.
 * @property {string} imageUrl - The URL of the image.
 */

/**
 * A map that associates resource IDs with their corresponding image information.
 *
 * @type {Map<string, ImageMapEntry>}
 */
interface ImageMapEntry {
	name: string
	imageUrl: string
}

export const resourceImageMap: Map<string, ImageMapEntry> = new Map([
	[
		'resource_rdx1tkj69fpun8sgxrs9y09nvyhn4hms7f25m96tr3pu0q3yyfw8fj0prg',
		{
			name: 'radix',
			imageUrl: '/images/token-images/radix-Icon-400x400.png',
		},
	],
])

export const getResourceIdByName = (name: string): string | undefined => {
	// eslint-disable-next-line no-restricted-syntax
	for (const [resourceId, imageMapEntry] of resourceImageMap) {
		if (imageMapEntry.name === name) {
			return resourceId
		}
	}
	return undefined
}
