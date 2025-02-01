import { z } from "zod";
import userSchema from "./validators/user.validator";
import todoSchema from "./validators/todo.validator";

type UserSchema = z.infer<typeof userSchema>
type TodoSchema = z.infer<typeof todoSchema>

export {
    UserSchema,
    TodoSchema
}