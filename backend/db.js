const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vibins:vibins@cluster0.yyqreuu.mongodb.net/todos_db");

const todosSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
});

const todoDB = mongoose.model('todo_table', todosSchema);

module.exports = {
    todoDB
}

