import React, { useContext, useEffect, useState } from 'react';
import { EditingContext } from './IsEditing';
import { grey } from '@mui/material/colors';

// Components
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Input, IconButton, Divider, Checkbox } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

export default function Task({ ...props }) {
    const { isEditing, taskHasBeenEdited } = useContext(EditingContext)
    const [inputValue, setInputValue] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const task = props.task
    const handleRemoveTask = props.handleRemoveTask
    const handleEditTask = props.handleEditTask
    const handleSaveTask = props.handleSaveTask
    const handleCheckboxChange = props.handleCheckboxChange

    useEffect(() => {
        setIsChecked(task.checkboxValue)

        return () => setIsChecked(false)
    }, [task.checkboxValue])

    useEffect(() => {
        setInputValue(task.description)

        return () => setInputValue('')
    }, [task.description])

    return (
        <>
            <div className='containerTask'>

                <div className='firstDiv'>

                    <Checkbox
                        checked={isChecked ? true : false}
                        icon={<CheckCircleOutlineRoundedIcon />}
                        checkedIcon={<CheckCircleRoundedIcon />}
                        onChange={(e) => {
                            setIsChecked(e.target.checked)
                            handleCheckboxChange(task.id, e.target.checked)
                        }}
                        sx={{ color: grey[300], '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                    {isEditing && taskHasBeenEdited === task.id ?
                        <input className='inputEditTask' type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} /> :
                        <span className={isChecked ? 'checked' : ''}> {task.description}</span>
                    }

                </div>

                <div className='containerActions'>

                    {isEditing && taskHasBeenEdited === task.id ?
                        <IconButton onClick={() => handleSaveTask(task.id, inputValue)}>
                            <SaveRoundedIcon sx={{ color: grey[300], fontSize: 28 }} />
                        </IconButton >
                        :
                        <>
                            <IconButton onClick={() => handleEditTask(task.id)}>
                                <EditRoundedIcon sx={{ color: grey[300], fontSize: 28 }} />
                            </IconButton >
                            <IconButton onClick={() => handleRemoveTask(task.id)}>
                                <DeleteRoundedIcon sx={{ color: grey[300], fontSize: 28 }} />
                            </IconButton>
                        </>
                    }

                </div>
            </div>
            <Divider variant='middle' />
        </>
    )
}

function ShowTask({ ...props }) {
    const [isChecked, setIsChecked] = useState(false)
    const task = props.task
    const handleRemoveTask = props.handleRemoveTask
    const handleEditTask = props.handleEditTask
    const handleCheckboxChange = props.handleCheckboxChange

    useEffect(() => {
        setIsChecked(task.checkboxValue)
    }, [task.checkboxValue])

    return (
        <div className='containerTask'>

            <div className={isChecked ? 'active firstDiv' : 'inactive firstDiv'}>
                <Checkbox
                    className='notOpacity'
                    checked={isChecked ? true : false}
                    icon={<CheckCircleOutlineRoundedIcon />}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    onChange={(e) => {
                        setIsChecked(e.target.checked)
                        handleCheckboxChange(task.id, e.target.checked)
                    }}
                    sx={{ color: grey[300], '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
                <span className='textDescription'> {task.description}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <IconButton
                    onClick={() => handleEditTask(task.id)}
                ><EditRoundedIcon sx={{ color: grey[300], fontSize: 28 }} />
                </IconButton >
                <IconButton
                    onClick={() => handleRemoveTask(task.id)}
                ><DeleteRoundedIcon sx={{ color: grey[300], fontSize: 28 }} />
                </IconButton>
            </div>
        </div>
    )
}

function EditTask({ ...props }) {
    const [isChecked, setIsChecked] = useState(false)
    const task = props.task
    const handleSaveTask = props.handleSaveTask
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        setInputValue(task.description)
    }, [task.description])

    return (
        <div className='containerTask'>
            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => handleSaveTask(task.id, inputValue)}>Salvar</button>
        </div>
    )
}