import { Response, Request } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import todoSchema from "../types/validators/todo.validator";
import mongoose from "mongoose";
import { TodoSchema } from "../types/zodTypes";
import Todo from "../models/todo.model";

const createTodo = asyncHandler(async (req: Request, res: Response) => {
    const {error} = todoSchema.safeParse(req.body)
    const {title, description, userId} = req.body as TodoSchema

    if(error) {
        return res.status(400).json({message: error.errors[0].message})
    }

    const newTodo = await Todo.create({
        title,
        description,
        userId
    })

    if(!newTodo){
        return res.status(400).json({ message: "Could'nt create the todo"})
    }

    res.status(200).json({ newTodo, message: "Todo created successfully"});
})

const fetchTodos = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body

    if(!mongoose.isValidObjectId(userId)){
        return res.status(400).json({message: "Invalid User ID"})
    }

    const todos = await Todo.find({userId});

    if(!todos){
        return res.status(404).json({message: "No todos found"});
    }

    return res.status(200).json({ todos, message: "Todos fetched successfully"});
})

const updateTodo = asyncHandler(async (req: Request, res: Response) => {
    const {error} = todoSchema.safeParse(req.body)
    const {title, description, todoId, userId} = req.body as TodoSchema

    if(error) {
        return res.status(400).json({message: error.errors[0].message})
    }

    const updatedTodo = await Todo.findOneAndUpdate({todoId, userId}, {title, description}, {new: true})

    if(!updatedTodo){
        return res.status(404).json({message: "Could'nt update the todo"});
    }

    return res.status(200).json({ updatedTodo, message: "Todo updated successfully"});
})

const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
    const {todoId, userId} = req.body;

    if(!mongoose.isValidObjectId(todoId) && !mongoose.isValidObjectId(userId)){
        return res.status(400).json({message: "Invalid Todo ID or User ID"})
    }

    const deletedTodo = await Todo.findOneAndDelete({todoId, userId})

    if(!deletedTodo){
        return res.status(404).json({message: "No Todo with this ID found"})
    }

    return res.status(200).json({todo: deleteTodo, message: "Todo deleted successfully"})
})

const toggleStatus = asyncHandler(async (req: Request, res: Response) =>{
    const { todoId, userId } = req.body;
    
    if(!mongoose.isValidObjectId(todoId) && !mongoose.isValidObjectId(userId)){
        return res.status(400).json({message: "Invalid Todo ID or User ID"});
    }

    const findTodo = await Todo.findOne({todoId, userId});

    if(!findTodo){
        return res.status(404).json({message: "No todo with this ID found"});
    }

    findTodo.completed =!findTodo.completed;
    await findTodo.save();

    res.status(200).json({todo: findTodo,message: "Todo is complete status toggled successfully"});
})

export {
    createTodo,
    updateTodo,
    fetchTodos,
    deleteTodo,
    toggleStatus
}