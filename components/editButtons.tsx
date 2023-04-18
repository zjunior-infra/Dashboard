import { useState } from 'react';
import { GridRowId } from '@mui/x-data-grid';
import { green } from '@mui/material/colors';
import { Delete, Check } from '@mui/icons-material';
import { Box, Fab, CircularProgress } from '@mui/material';

interface EditButtonsProps {
    selectedJobs:  GridRowId[];
    handleDelete: () => void;
    loading: boolean;
    success: boolean;
    setLoading: (loading: boolean) => void;
    setSuccess: (success: boolean) => void;
}


const EditButtons = ({selectedJobs, handleDelete, loading, success} : EditButtonsProps) => {
   
    
    return ( 
        <Box className='flex justify-center items-center gap-x-5'
                gap={2}
                sx = {{
                    
                    position: 'relative',
    
    
                }}
                >
                {success ? (
                    <Fab className='bg-green-500 hover:bg-green-700'
                    color="primary"
                    
                    sx={{
                        width: 50,
                        height: 50, 
                       
                    }}
                   
                    >
                    <Check />
                    </Fab>
                ) : (
                  <Fab className='bg-red-400 hover:bg-red-500' 
                  sx={{
                      width: 50,
                      height: 50,
                      
                  }}
                  disabled={selectedJobs.length > 0 ? false  : true || loading || success}
                  onClick={() => handleDelete()}
                  >
                  <Delete />
              </Fab>
          )}
                    {loading && (
                        <CircularProgress
                        size={62}
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
     );
}
 
export default EditButtons;