import { Router } from "express";
import { createTodo, deleteTodo, fetchTodos, toggleStatus, updateTodo } from "../controllers/todo.controller";

const router = Router()

router.route("/").post(createTodo)
router.route("/").get(fetchTodos)
router.route("/").put(updateTodo)
router.route("/").delete(deleteTodo)
router.route("/toggle").patch(toggleStatus)

export default router