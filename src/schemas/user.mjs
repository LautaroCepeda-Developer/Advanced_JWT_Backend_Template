import * as z from 'zod';
import { isUsernameValid } from '../tools/commonValidations.mjs';

const userSchema = z.object({
    id: z
        .number({
            invalid_type_error: 'Id must be a integer.',
            required_error: 'id is required.',
        })
        .int()
        .min(1),
    fullname: z
        .string({
            required_error: 'fullname is required.',
        })
        .min(3),
    email: z
        .string({
            required_error: 'email is required.',
        })
        .toLowerCase()
        .email({ pattern: z.regexes.unicodeEmail }),
    username: z
        .string({ required_error: 'username is required.' })
        .min(5)
        .refine((val) => isUsernameValid(val), {
            message: 'username contains invalid characters.',
        }),
    password: z.string({
        required_error: 'password is required.',
    }),
    roleId: z
        .number({
            invalid_type_error: 'roleId must be a integer.',
            required_error: 'roleId is required.',
        })
        .int()
        .min(1),
});

export const validateUser = async (input) => {
    return await userSchema.parseAsync(input);
};

export const validatePartialUser = async (input) => {
    return await userSchema.partial().parseAsync(input);
};
