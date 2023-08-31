import { Box, Button, Fab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

import CloseIcon from '@mui/icons-material/Close';

import DeleteIcon from '@mui/icons-material/Delete';

import NavigationIcon from '@mui/icons-material/Navigation';

import { useState } from 'react'
interface EditButtonsProps {
  handelConfirm: () => void;

}

function TableButtons({handelConfirm}: EditButtonsProps){
  const [editable,setEditable] = useState<boolean>(false)

  return (
    <div className="icon w-full flex items-center justify-end gap-x-4 mb-2 mr-5">


<Fab variant="extended" color="primary" aria-label="add" className=' bg-gray-200' onClick={handelConfirm}>
                  <NavigationIcon sx={{ mr: 1 }} 
                  />
                  Confirm jobs
                </Fab>  
       
        <Box className="border border-sky-300 rounded-lg">
        <Button className='text-base font-roboto font-medium' >charge Zjunior Jobs</Button>
        </Box>
        
      </div>
  )
}

export default TableButtons