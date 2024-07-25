import React, { useState, useEffect, useRef, useCallback } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';


export default function AddTask({onHandleAdd}) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null)

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter' && document.activeElement === inputRef.current) {
            onHandleAdd(inputValue)
            setInputValue('')
        }
    }, [inputValue, onHandleAdd])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleKeyPress]);

    return (
        <div className='containterAddTask'>
            <input 
                type="text" 
                className='inputAddTask'
                placeholder='Digite sua tarefa...' 
                value={inputValue}
                ref={inputRef} 
                onChange={(e) => setInputValue(e.target.value)} 
            />
            <IconButton 
                onClick={() => {
                    onHandleAdd(inputValue)
                    setInputValue('')
                }}
            ><AddCircleRoundedIcon sx={{ color: grey[300], fontSize: 32 }} />
            </IconButton>
        </div>
    )
}