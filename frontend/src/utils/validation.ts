import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email format" });

const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" });

const userNameSchema = z.string().min(3, { message: "User name must be at least 3 characters long" });

const signUpSchema = z.object({
    username: userNameSchema,
    email: emailSchema,
    password: passwordSchema,
});

const signInSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, { message: "Password is required" }),
});

export {
    signUpSchema,
    signInSchema,
}