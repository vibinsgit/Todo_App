const express = require("express");
const cors = require("cors");
const { createTodo, updateTodo } = require("./types");
const { todoDB } = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173" //it restrict other request from other end-ponts
}));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/createTodos", async (req, res) => {
    const createPayload =req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg : "You send wrong inputs."
        });
        return;
    }
    
    try{
        await todoDB.create({
            title : createPayload.title,
            description : createPayload.description,
            completed : false
        });
        res.json({
            msg: "New todo is created."
        });
    } catch (error) {
        console.log("Database error : ", error);
        res.status(500).json({
            msg: "Internal server error."
        });
    }
});

app.get("/viewTodos", async (req, res) => { 
    try{
        const todos = await todoDB.find({});
        res.json({
            todos
        });
    } catch (error) {
        console.log("Database errror : ", error);
        res.status(500).json({
            msg: "Internal server error."
        });
    }
});

app.put("/updateTodo", async (req, res) => {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg : "You send wrong inputs."
        });
        return;
    }
    try {
        await todoDB.updateOne({
            _id : req.body.id
        },{
            completed : true
        }); 
    
        res.json({
            msg : "Todo mark as completed."
        });
    } catch (error) {
        console.log("Database errror : ", error);
        res.status(500).json({
            msg: "Internal server error."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Port is running on ${PORT}`);
});