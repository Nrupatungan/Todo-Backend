import { z } from "zod";

const todoSchema = z.object({
    todoId: z.string().optional(),
    title: z.string().nonempty("Title cannot be empty"),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    userId: z.string(),
})

export default todoSchema