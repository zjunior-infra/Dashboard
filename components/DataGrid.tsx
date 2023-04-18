import UserAction from './UserAction';
import { useState, useMemo } from 'react';
import { green } from '@mui/material/colors';
import { Delete, Check } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { CrawledJob, Job } from '@prisma/client';
import { Box, Typography, Avatar, Fab, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridRowId, GridRowSpacingParams, gridClasses, GridRenderCellParams } from '@mui/x-data-grid';


const DataTable = ( {jobs}:{jobs:CrawledJob[]} ) => {

  const [rowId, setRowId] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [selectedJobs, setSelectedJobs] = useState<GridRowId[]>([])
    
    const columns = useMemo(() => [
      { field: 'id', headerName: 'ID', width: 200, editable: true },
      { field: `company`, headerName: 'Company', width: 140 , editable: true },
      { field: `title`, headerName: 'Title', width: 160 , editable: true },
      { field: `link`, headerName: 'Link', width: 450 , editable: true },
      {field: `deadline`, headerName: 'Deadline', width: 140, editable: true  },
      {field: `logo`, headerName: 'Logo', width: 70, editable: true ,
        renderCell: (params:GridRenderCellParams) => <Avatar alt="Remy Sharp" src={params.row.logo} /> },

      {field: `skills`, headerName: 'Skills' , width: 160, editable: true },

      { field: 'actions', headerName: 'Actions', type: 'actions',
        renderCell: (params:GridRenderCellParams) =>
          <UserAction params={params} rowId={rowId} setRowId={setRowId} selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs}/>
        ,  
      },

    ], [rowId])

      const rows = jobs.map((job:Job)=>{
        const {id,company,title,link,deadline,logo,skills}=job;
        return {
          id,
          company,
          title,
          link,
          deadline,
          logo,
          skills,
        }
      }
      )

      const handleDelete = async () => {
        setLoading(true)
        const res = await fetch ('/api/jobs/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({selectedJobs: selectedJobs}),

        })
        if (res.ok){
          console.log('success')
          setLoading(false)
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
            setSelectedJobs([])
          }, 2000)
        }
        else {
          console.log('fail')
          console.log(res)
          setLoading(false)
          
        }
      }

    return ( 
        <>
        <Box sx={{ height: 600, width: '100%' }}>

          <Typography variant="h3" component="h3"  color={'white'}
            sx={{textAlign:'center', mt:3, mb:3}}
          >
            Mange Jobs

          </Typography>
          <div className="icon w-full flex items-end justify-end gap-x-4 mb-2 mr-5">
          <Fab color="error" aria-label="add" className=' bg-blue-400 hover:bg-blue-500'
            sx={{
              width: 40,
              height: 40,
              
          }}
          
          >
            <AddIcon />
          </Fab>

          {selectedJobs.length > 0 ? (
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
                        width: 40,
                        height: 40, 
                       
                    }}
                   
                    >
                    <Check />
                    </Fab>
                ) : (
                  <Fab className='bg-red-400 hover:bg-red-500' 
                  sx={{
                      width: 40,
                      height: 40,
                      
                  }}
                  onClick={() => handleDelete()}
                  >
                  <Delete />
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
           ): (
            <></>
          )}
           
          </div>

          <DataGrid
            columns={columns}
            rows={rows}
            getRowId={(row) => row.id}
            pageSizeOptions={[13, 50, 100]}  
            checkboxSelection
            getRowSpacing={(params : GridRowSpacingParams) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  theme.palette.mode === 'light' ? `grey[200]` : `grey.900`,
                
                height: 80,
                },
            }}

            onCellEditStop={(params) => setRowId(params.id.toString())}


            onRowSelectionModelChange={(params) => {
              setSelectedJobs(params)
              console.log(params)
              
            }}
            keepNonExistentRowsSelected
            
          />          

        </Box>

        </>
     );
}



export default DataTable

