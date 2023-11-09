import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id:1, title: 'CSS', isDone: true},
    {id:2, title: 'JS', isDone: true},
    {id:3, title: 'React', isDone: false},
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all')

  function removeTask(id: number) {
    let filteredTasks = tasks.filter( t => t.id !== id )
    setTasks(filteredTasks)
  }
  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <TodoList title='What to leran' tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
