import * as z from 'zod/v4';

const roleSchema = z.object({
    id: z
        .string({
            required_error: 'id is required.',
        })
        .min(1)
        .refine((val) => isNumber(val), {
            error: 'id can only be an intenger.',
        })
        .refine((val) => parseInt(val) > 0, { error: 'id is invalid.' }),
    name: z
        .string({ required_error: 'name is required.' })
        .trim()
        .min(3)
        .refine((val) => isNameValid(val), {
            error: 'name contains invalid characters.',
        }),
    description: z.string().trim().min(3).nullish(),
    level: z
        .string({
            required_error: 'level is required',
        })
        .min(1)
        .refine((val) => isNumber(val), {
            error: 'level can only be an intenger.',
        })
        .refine((val) => parseInt(val) > 0, { error: 'level is invalid.' }),
});

export const validateRole = async (input) => {
    return await roleSchema.parseAsync(input);
};

export const validatePartialRole = async (input) => {
    return await roleSchema.partial().parseAsync(input);
};
