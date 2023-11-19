import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType} from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import { Button, IconButton } from '@mui/material';
import { AppBar, Toolbar, Container, Grid, Paper} from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { Menu } from '@mui/icons-material';



export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: 'what to learn', filter: 'active'},
    {id: todolistId2, title: 'what to buy', filter: 'completed'}
  ])

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

  function changeStatus (id: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === id) 
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj})
    }
  }

  function changeTaskTitle (id: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === id) 
    if (task) {
      task.title = newTitle;
      setTasks({...tasksObj})
    }
  }


  let [tasksObj, setTasks] = useState<TasksStateType>({
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

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl =>tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);

    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  }

  function addTodolist (title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists])
    setTasks({...tasksObj, [todolist.id]: []})
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' arial-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6'>News</Typography>
          <Button color='inherit'> login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={8}>
        {
        todolists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
          }
          if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
          }

          return <Grid item>
            <Paper style={{padding: '10px'}}>
              <TodoList 
                key={tl.id}
                id={tl.id}
                title={tl.title} 
                tasks={tasksForTodoList} 
                removeTask={removeTask} 
                changeFilter={changeFilter}
                addTask={addTask} 
                changeTaskStatus={changeStatus}
                changeTaskTitle={changeTaskTitle}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeTodolistTitle}
                />
            </Paper>
          </Grid>
        })
      }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
