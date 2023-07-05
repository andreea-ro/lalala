import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import restaurantsRoute from "./routes/restaurants.js";
import tablesRoute from "./routes/tables.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

const connect = async ()=>{
   try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!")
  } catch (error) {
    throw error ;
  }
};

mongoose.connection.on("disconected", () => { 
    console.log("MongoDB disconnected");
});

mongoose.connection.on("conected", () => {
    console.log("MongoDB connected");
});

app.get("/", (req,res) => {
    res.send("hello")
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/restaurants", restaurantsRoute);
app.use("/api/tables", tablesRoute);
app.use("/api/users", usersRoute);

app.listen(8800, () => {
    connect(); 
    console.log("connected to backend!!!");
});
