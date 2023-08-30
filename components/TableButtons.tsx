import { Fab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

import CloseIcon from '@mui/icons-material/Close';

import DeleteIcon from '@mui/icons-material/Delete';

import NavigationIcon from '@mui/icons-material/Navigation';

import React, { useState } from 'react'

function TableButtons(){
  const [editable,setEditable] = useState<boolean>(false)

  return (
    <div className="icon w-full flex items-end justify-end gap-x-4 mb-2 mr-5">
    {editable &&(
        <>
        <Fab color="secondary" aria-label="edit" className='bg-rose-300 hover:bg-red-500' onClick={() => setEditable(prev => !prev)}>
        <CloseIcon/>
      </Fab>

      <Fab className='bg-gray-200 hover:bg-gray-400' onClick={() => setEditable(prev => !prev)}>
      <DeleteIcon/>
      </Fab>
        </>
          )
      }
        {!editable &&(
          <Fab aria-label="edit" className='bg-gray-200 hover:bg-gray-400'  onClick={() => setEditable(prev => !prev)}>
          <EditIcon/>
          </Fab>
          )}
         
        {editable &&(
            <Fab variant="extended" color="primary" aria-label="add" className=' bg-gray-200'  onClick={() => setEditable(prev => !prev)} >
              <NavigationIcon sx={{ mr: 1 }}  />
              Confirm jobs
            </Fab>  
        )
        }
      </div>
  )
}

export default TableButtons