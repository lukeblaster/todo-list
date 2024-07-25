import React, { useReducer, useContext } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import { EditingContext } from './IsEditing';
import { v4 as v4uuid } from 'uuid'

const tasks = JSON.parse(localStorage.getItem('tasks')) || []

console.log(tasks)

function taskReducer(lista, action) {
    let newList = []

    switch (action.type) {
        case 'ADD_TASK':
            newList = [
                ...lista,
                {
                    description: action.description,
                    id: action.id,
                    checkboxValue: false
                },
            ]

            localStorage.setItem('tasks', JSON.stringify(newList))

            return newList;

        case 'REMOVE_TASK':
            newList = lista.filter(l => l.id !== action.id)

            localStorage.setItem('tasks', JSON.stringify(newList))

            return newList;

        case 'SAVE_TASK':
            newList = lista.map(l => {
                if (l.id === action.id) {
                    return { ...l, description: action.description }

                } else {
                    return l
                }
            })

            localStorage.setItem('tasks', JSON.stringify(newList))

            return newList;

        case 'CHANGE_CHECKBOX':
            newList = lista.map(l => {
                if (l.id === action.id) {
                    return { ...l, checkboxValue: action.checkboxValue }

                } else {
                    return l
                }
            })

            localStorage.setItem('tasks', JSON.stringify(newList))

            return newList;

        default:
            break;
    }
}

export default function List() {
    const [lista, dispatch] = useReducer(taskReducer, tasks);
    const { isEditing, setIsEditing, setTaskHasBeenEdited } = useContext(EditingContext)

    function handleAddTask(inputValue) {
        if (inputValue === '') {
            return
        }

        let uuid = v4uuid()

        dispatch({ type: 'ADD_TASK', id: uuid, description: inputValue, checkboxValue: false })
    }

    function handleRemoveTask(idTask) {
        dispatch({ type: 'REMOVE_TASK', id: idTask })
    }

    function handleEditTask(taskId) {
        if (isEditing === true) {
            console.log("Uma task já está sendo editada.")

            return null;
        }

        setTaskHasBeenEdited(taskId)
        setIsEditing(!isEditing)
    }

    function handleSaveTask(taskId, taskDescription) {
        dispatch({ type: 'SAVE_TASK', id: taskId, description: taskDescription })

        setTaskHasBeenEdited(taskId)
        setIsEditing(!isEditing)
    }

    function handleCheckboxChange(taskId, checkboxValue) {
        dispatch({ type: 'CHANGE_CHECKBOX', id: taskId, checkboxValue: checkboxValue })
    }

    return (
        <div className='App-Content'>
            <div>
                <h3 className='todoTitle'>Lista de Tarefas</h3>
                <AddTask onHandleAdd={handleAddTask}></AddTask>
            </div>

            {lista?.map((item) =>
                <div>
                    <Task
                    className='taskItem'
                    key={item.id}
                    task={item}
                    handleRemoveTask={handleRemoveTask}
                    handleEditTask={handleEditTask}
                    handleSaveTask={handleSaveTask}
                    handleCheckboxChange={handleCheckboxChange}
                    ></Task>
                </div>
            )}
        </div>
    )
}