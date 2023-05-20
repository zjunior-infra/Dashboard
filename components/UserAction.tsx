'use client'

import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { green } from '@mui/material/colors';
import { Job } from '@/Database/interface';
import { Dispatch, SetStateAction } from 'react';
import { Check , Save} from '@mui/icons-material';
import { Box, Fab, CircularProgress } from '@mui/material';
import {GridRowId, GridRenderCellParams} from '@mui/x-data-grid'



interface UserActionProps {
    params : GridRenderCellParams
    rowId : String
    setRowId :Dispatch<SetStateAction<string>>
 
}

const UserAction = ({params , rowId, setRowId} : UserActionProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [adjustedJobs, setAdjustedJobs] = useState<Job[]>([])

    const handelUpdate = async ()=>{
        const res = await fetch ('/api/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({selectedJobs: adjustedJobs}),

        })
        if (res.ok){
          console.log('success')
          toast.success('Job updated successfully')
        }
        else {
          console.log('fail')
            toast.error('Job update failed')
        }
      }

    const handleButtonClick = async () => {
        setLoading(true)
        await handelUpdate()
        setLoading(false)
        setSuccess(true)
        setAdjustedJobs([]) 
        setTimeout(() => {
            setSuccess(false)
            setRowId('')
        }, 2000)
    };
    useEffect(() => {
        if (rowId) {
            setAdjustedJobs(jobs => [...jobs, params.row])
        }
    }, [rowId, params.row])
    
    return ( 
        <div className=" text-white">
            <Box className='flex justify-center items-center gap-x-5'
            gap={2}
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

                onClick={handleButtonClick}
                
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