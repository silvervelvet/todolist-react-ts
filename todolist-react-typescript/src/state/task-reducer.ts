import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolist-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}


export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType 
                        | RemoveTodolistActionType | AddTodolistActionType

export const tasksReducer = (state: Array<TasksStateType>, action: ActionsType): Array<TasksStateType> => {
    switch(action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }

        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [{newTask}, ...tasks];
            stateCopy[action.todolistId] = newTasks
            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy;
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title
            }
            return stateCopy;
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }

        default:
            throw new Error('I dont understand thia action type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId}
    //return {type: 'REMOVE-TASK', todolistId: todolistId, taskId:taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const addTodolistAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}