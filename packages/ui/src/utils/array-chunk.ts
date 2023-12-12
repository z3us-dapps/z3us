export function splitArrayIntoChunks<T>(inputArray: T[], chunkSize: number): T[][] {
	return Array.from({ length: Math.ceil(inputArray.length / chunkSize) }, (_, i) =>
		inputArray.slice(i * chunkSize, (i + 1) * chunkSize),
	)
}
