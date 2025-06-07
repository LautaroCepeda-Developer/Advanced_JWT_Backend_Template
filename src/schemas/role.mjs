import * as z from 'zod';

const roleSchema = z.object({
    id: z
        .number({
            invalid_type_error: 'id must be a integer.',
            required_error: 'id is required.',
        })
        .int()
        .min(1),
    name: z
        .string({ required_error: 'name is required.' })
        .trim()
        .min(3)
        .refine((val) => isNameValid(val), {
            message: 'name contains invalid characters.',
        }),
    description: z.string().trim().min(3).nullish(),
    level: z
        .number({
            invalid_type_error: 'level must be an integer.',
            required_error: 'level is required',
        })
        .int()
        .min(1),
});

export const validateRole = async (input) => {
    return await roleSchema.parseAsync(input);
};

export const validatePartialRole = async (input) => {
    return await roleSchema.partial().parseAsync(input);
};
