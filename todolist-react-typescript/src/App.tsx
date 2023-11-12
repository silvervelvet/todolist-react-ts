import React, { useState } from 'react';
import './App.css';
import TodoList from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}



function App() {

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter( t => t.id !== id );
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId]
    let newTasks = [ task, ...tasks];
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj});
  }

  function changeStatus (taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId) 
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj})
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl =>tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: 'what to learn', filter: 'active'},
    {id: todolistId2, title: 'what to buy', filter: 'completed'}
  ])

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);

    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  }

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'React', isDone: false}
    ],
    [todolistId2]: [
      {id: v1(), title: 'ReactJS', isDone: true},
      {id: v1(), title: 'NextJS', isDone: true},
      {id: v1(), title: 'Angular', isDone: false}
    ]
  })

  return (
    <div className="App">
      <AddItemForm addItem={(title: string) => {}}/>
      {
        todolists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
          }
          if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
          }

          return <TodoList 
          key={tl.id}
          id={tl.id}
          title={tl.title} 
          tasks={tasksForTodoList} 
          removeTask={removeTask} 
          changeFilter={changeFilter}
          addTask={addTask} 
          changeTaskStatus={changeStatus}
          filter={tl.filter}
          removeTodolist={removeTodolist}
          />
        })
      }
    </div>
  );
}

export default App;
