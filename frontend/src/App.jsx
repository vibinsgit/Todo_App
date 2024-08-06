import React from 'react';
import { useState , useEffect } from 'react';
import { CreateTodos } from './components/CreateTodos'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);
  //These is wrong approch these sent infinite request
  //thus affet our backend, so we use useEffect hook
  useEffect(() => {
    fetch("http://localhost:3000/viewTodos")
    .then(async function(res) {
      const jsonOutput = await res.json();
      setTodos(jsonOutput.todos);
    });
  }, []);
  return (
    <div>
      <CreateTodos setTodos={setTodos} todos={todos} />
      <Todos todos={todos} />
    </div>
  );
}

export default App
