import React, { useContext, useEffect, useState } from 'react';
import { EditingContext } from './IsEditing';
import { grey } from '@mui/material/colors';

// Components
import { IconButton, Divider, Checkbox } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

export default function Task({ ...props }) {
    const { isEditing, taskHasBeenEdited } = useContext(EditingContext)
    const [inputValue, setInputValue] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const task = props.task

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

                <div className='taskContent'>

                    <div className='firstDiv'>

                        <Checkbox
                            checked={isChecked ? true : false}
                            icon={<CheckCircleOutlineRoundedIcon />}
                            checkedIcon={<CheckCircleRoundedIcon />}
                            onChange={(e) => {
                                setIsChecked(e.target.checked)
                                props.handleCheckboxChange(task.id, e.target.checked)
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

                            <IconButton onClick={() => props.handleSaveTask(task.id, inputValue)}>
                                <SaveRoundedIcon sx={{ color: grey[300], fontSize: 28 }} />
                            </IconButton >

                            :

                            <>
                                <IconButton onClick={() => props.handleEditTask(task.id)}>
                                    <EditRoundedIcon sx={{ color: grey[300], fontSize: 28 }} />
                                </IconButton >
                                <IconButton onClick={() => props.handleRemoveTask(task.id)}>
                                    <DeleteRoundedIcon sx={{ color: grey[300], fontSize: 28 }} />
                                </IconButton>
                            </>

                        }

                    </div>

                </div>

            </div>

            <Divider variant='middle' />

        </>
    )
}