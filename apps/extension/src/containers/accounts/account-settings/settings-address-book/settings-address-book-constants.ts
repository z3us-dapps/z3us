import { z } from 'zod'

export const addressBookSchema = z.object({
	from: z.string().min(1, 'Must include from address').max(30, 'Must include from address'),
	message: z.string().max(10, 'Message must be less than 10'),
})

