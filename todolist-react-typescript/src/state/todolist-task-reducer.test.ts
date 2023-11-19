import { TasksStateType, TodolistType } from "../App"
import { tasksReducer } from "./task-reducer";
import { addTodolistAC, todolistsReducer } from "./todolist-reducer";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistType> = [];

  const action = addTodolistAC('new todolist');

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFormTasks = keys[0];
  const idFormTododlists = endTodolistsState[0].id;

  expect(idFormTasks).toBe(action.todolistId);
  expect(idFormTododlists).toBe(action.todolistId)
})