import * as z from 'zod/v4';
import { isNameValid, isNumber } from '../tools/commonValidations.mjs';

const userSchema = z.object({
    id: z
        .string({
            required_error: 'id is required.',
        })
        .min(1)
        .refine((val) => isNumber(val), {
            error: 'id can only be an intenger.',
        })
        .refine((val) => parseInt(val) > 0, { error: 'id is invalid.' }),
    fullname: z
        .string({
            required_error: 'fullname is required.',
        })
        .trim()
        .min(3),
    email: z
        .email({
            pattern: z.regexes.unicodeEmail,
            required_error: 'email is required.',
            error: 'email is invalid.',
        })
        .toLowerCase(),
    username: z
        .string({ required_error: 'username is required.' })
        .trim()
        .min(5)
        .refine((val) => isNameValid(val), {
            error: 'username contains invalid characters.',
        }),
    password: z.string({
        required_error: 'password is required.',
    }),
    roleId: z
        .string({
            required_error: 'roleId is required.',
        })
        .min(1)
        .refine((val) => isNumber(val), {
            error: 'roleId can only be an intenger.',
        })
        .refine((val) => parseInt(val) > 0, { error: 'roleId is invalid.' }),
});

export const validateUser = async (input) => {
    return await userSchema.parseAsync(input);
};

export const validatePartialUser = async (input) => {
    return await userSchema.partial().parseAsync(input);
};
