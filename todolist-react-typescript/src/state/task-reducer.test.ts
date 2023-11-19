import { TasksStateType } from "../App";
import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, changeTaskTitleAC  } from "./task-reducer";
import { removeTodolistAC } from "./todolist-reducer";
import { addTodolistAC } from "./todolist-reducer";

test('correct task should be deleted from correct way', () => {
    const startState: TasksStateType = {
        'todolistId1': [
        {id: '1', title: 'CSS', isDone: true},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
        {id: '1', title: 'ReactJS', isDone: true},
        {id: '2', title: 'NextJS', isDone: true},
        {id: '3', title: 'Angular', isDone: false}
      ]
    };

    const action = removeTaskAC('2','todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
});

test('correct task should added to correct way', () => {
    const startState: TasksStateType = {
        'todolistId1': [
        {id: '1', title: 'CSS', isDone: true},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
        {id: '1', title: 'ReactJS', isDone: true},
        {id: '2', title: 'NextJS', isDone: true},
        {id: '3', title: 'Angular', isDone: false}
      ]
    };

    const action = addTaskAC('juice', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].lenght).toBe(3);
    expect(endState['todolistId2'].lenght).toBe(4);
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
        {id: '1', title: 'CSS', isDone: true},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
        {id: '1', title: 'ReactJS', isDone: true},
        {id: '2', title: 'NextJS', isDone: true},
        {id: '3', title: 'Angular', isDone: false}
      ]
    };

    const action = changeTaskStatusAC('2', false, 'todolistId2');

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].isDone).toBe(false);
    expect(endState['todolistId1'][1].isDone).toBe(true);
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
        {id: '1', title: 'CSS', isDone: true},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
        {id: '1', title: 'ReactJS', isDone: true},
        {id: '2', title: 'NextJS', isDone: true},
        {id: '3', title: 'Angular', isDone: false}
      ]
    };

    const action = changeTaskTitleAC('2', 'love', 'todolistId2');

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe('love');
    expect(endState['todolistId1'][1].title).toBe('JS');
})

test('new props with array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
        {id: '1', title: 'CSS', isDone: true},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
        {id: '1', title: 'ReactJS', isDone: true},
        {id: '2', title: 'NextJS', isDone: true},
        {id: '3', title: 'Angular', isDone: false}
      ]
    };

    const action = addTodolistAC('new todolist');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
        {id: '1', title: 'CSS', isDone: true},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
        {id: '1', title: 'ReactJS', isDone: true},
        {id: '2', title: 'NextJS', isDone: true},
        {id: '3', title: 'Angular', isDone: false}
      ]
    };

    const action = removeTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
})


