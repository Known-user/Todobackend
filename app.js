import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
    path: "./data/config.env"
})

export const app = express();

//        USING MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET","PUT","POST","DELETE"],
    credentials: true,
}));

//        USING ROUTES
app.use("/api/v1/user",userRouter);
app.use("/api/v1/task",taskRouter);

app.get("/",(req,res)=>{
    res.send("hi");
})

//        USING ERROR MIDDLEWARE
app.use(errorMiddleware); 