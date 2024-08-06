const zod = require("zod");

const createTodo = zod.object({
    title : zod.string(),
    description : zod.string(),
    completed : zod.boolean().optional().default(false)
});

const updateTodo = zod.object({
    id : zod.string()
});

module.exports = {
    createTodo : createTodo,
    updateTodo : updateTodo
}

