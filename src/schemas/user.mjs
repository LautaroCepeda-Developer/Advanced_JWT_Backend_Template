import * as z from 'zod';

const userSchema = z.object({
    id: z
        .number({
            invalid_type_error: 'Id must be a integer',
            required_error: 'Id is required.',
        })
        .int()
        .min(1),
});
