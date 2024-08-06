import { useState } from 'react';

export function CreateTodos({ setTodos, todos }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
    <div>
        <label htmlFor="title">Title : </label>
        <input style={{padding: 10, margin: 10 }}
        type="text" 
        id="title" 
        placeholder="Enter your goal" 
        onChange={function(e) { setTitle(e.target.value) }} /><br />

        <label htmlFor="description">Description : </label>
        <input style={{padding: 10, margin: 10 }} 
        type="text" 
        id="description" 
        placeholder="Express your goal" 
        onChange={function(e) { setDescription(e.target.value) }} /><br />

        <button style={{margin: 10}} onClick={() => {
            fetch("http://localhost:3000/createTodos", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "content-Type": "application/json"
                }
            })
                .then(async function(res) {
                    const jsonOutput = await res.json();
                    alert("Todo is created");
                    setTodos([...todos, {title, description, completed: false}]);
                })
        }}>create Todo</button>
    </div>
    );
}