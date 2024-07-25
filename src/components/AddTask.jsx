import React, { useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';


export default function AddTask({onHandleAdd}) {
    const [inputValue, setInputValue] = useState('');

    return (
        <div className='containterAddTask'>
            <input 
                type="text" 
                placeholder='Digite sua tarefa...' 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
            />
            <IconButton 
                onClick={() => {
                    onHandleAdd(inputValue)
                    setInputValue('')
                }}
            ><AddCircleRoundedIcon sx={{ color: grey[300], fontSize: 28 }} />
            </IconButton>
        </div>
    )
}