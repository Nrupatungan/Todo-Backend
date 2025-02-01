import {z} from "zod"

const userSchema = z.object({
    clerkId: z.string(),
    email: z.string().nonempty("Email is required").email(),
    username: z.string().min(3, {message: "Username must have atleast 3 characters"}).max(10, {message: "Username cannot be more than 10 characters long"}).optional(),
    password: z.string().nonempty("Password is required").min(8, {message: "Password must have atleast 8 characters"}).max(20, {message: "Password cannot be more than 20 characters long"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, {message: "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character"}),
})

export default userSchema
