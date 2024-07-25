import React, { createContext, useState } from 'react';

export const EditingContext = createContext(null)

export default function IsEditing({children}) {
    const [isEditing, setIsEditing] = useState(false)
    const [taskHasBeenEdited, setTaskHasBeenEdited] = useState(0)

    return (
        <EditingContext.Provider value={{isEditing, setIsEditing, taskHasBeenEdited, setTaskHasBeenEdited}}>
            {children}
        </EditingContext.Provider>
    )
}