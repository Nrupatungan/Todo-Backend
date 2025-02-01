import e from "express";
import cors from "cors";

const app = e();
app.use(e.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(e.urlencoded({ extended: true }));

//routes import
import userRoutes from "./routes/user.route"
import todoRoutes from "./routes/todo.route"

//routes declaration
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/todo", todoRoutes)

export default app;