import { useState } from 'react';
import { green } from '@mui/material/colors';
import { Dispatch, SetStateAction } from 'react';
import { Check , Save} from '@mui/icons-material';
import { Box, Fab, CircularProgress } from '@mui/material';
import {GridRowId, GridRenderCellParams} from '@mui/x-data-grid'


interface UserActionProps {
    params : GridRenderCellParams
    rowId : String
    setRowId :Dispatch<SetStateAction<string>>
}

const UserAction = ({params , rowId, setRowId } : UserActionProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    return ( 
        <div className=" text-white">
            <Box
            sx = {{
                m: 1,
                position: 'relative',


            }}
            >
            {success ? (
                <Fab className='bg-green-500'
                color="primary"
                
                sx={{
                    width: 40,
                    height: 40, 
                    '&:hover': { bgcolor: green[700] },
                }}
                disabled={params.id !== rowId || loading}
                >
                <Check />
                </Fab>
            ) : (
                <Fab className='bg-blue-300'
                color="primary"
                sx={{
                    width: 40,
                    height: 40,
                    bgcolor: green[500],
                    borderColor: green[500],
                }}
                disabled={params.id !== rowId || loading}
                
                >
                <Save />
                </Fab>
      )}
                {loading && (
                    <CircularProgress
                    size={52}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1,
                    }}
                    />
                    )}
            </Box>
           
          
        </div>
     );
}
 
export default UserAction;