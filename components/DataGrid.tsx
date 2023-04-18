import UserAction from './UserAction';
import { toast } from 'react-toastify';
import EditButtons from './editButtons';
import { useState, useMemo, useEffect } from 'react';
import { CrawledJob, Job } from '@prisma/client';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Box, Typography, Avatar, Fab } from '@mui/material';
import { DataGrid, GridRowId, GridRowSpacingParams, gridClasses, GridRenderCellParams } from '@mui/x-data-grid';



const DataTable = ( {jobs}:{jobs:CrawledJob[]} ) => {

  const [rowId, setRowId] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [ key, setKey] = useState<number>(0)
  const [editTable , setEditTable] = useState<boolean>(false)
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
          <UserAction params={params} rowId={rowId} setRowId={setRowId} selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} setKey={setKey}/>
        ,  
      },

    ], [rowId])

      let rows = jobs.map((job:Job)=>{
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
          toast.success('Jobs deleted successfully')
          console.log('success')
          setLoading(false)
          setSuccess(true)
          setKey((prev) => prev + 1)
          setTimeout(() => {
            setSuccess(false)
            setSelectedJobs([])
          }, 2000)


        }
        else {
          toast.error('Error deleting jobs')
          setLoading(false)
          
        }
      }

      const handleConfirm = async () => {
        console.log('confirm')
        const res = await fetch ('/api/jobs/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({selectedJobs: selectedJobs}),
        })
        if (res.ok){
          console.log('success')
          setKey((prev) => prev + 1)
          setSelectedJobs([])
          toast.success('Jobs confirmed successfully')
        }
        else {
          console.log('error')
          toast.error('Error confirming jobs')
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
          {editTable ? (
          <Fab color="secondary" aria-label="edit" className='bg-rose-300 hover:bg-red-500'
          onClick={() => setEditTable(!editTable)}
          >
            <CloseIcon />
          </Fab>
          ) : (
            <Fab color="secondary" aria-label="edit" className='bg-gray-200 hover:bg-gray-400'
            onClick={() => setEditTable(!editTable)}
            >
              <EditIcon />
            </Fab>
          
          )}
         
        {editTable && (
          <>
                <Fab variant="extended" color="primary" aria-label="add" className=' bg-gray-200' 
                disabled={selectedJobs.length > 0 ? false  : true || loading || success}
                onClick={() => handleConfirm()}
                >
                  <NavigationIcon sx={{ mr: 1 }} 
                  />
                  Confirm jobs
                </Fab>  
                
                <EditButtons selectedJobs={selectedJobs} handleDelete={handleDelete} loading={loading} success={success} setLoading={setLoading} setSuccess={setSuccess}/>
          
           </>
           )}
          </div>
          

          <DataGrid
            columns={columns}
            rows={rows}
            key={key}
            getRowId={(row) => row.id}
            pageSizeOptions={[13, 50, 100]}  
            checkboxSelection={editTable}
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
                pl: 0.7,
            }}

            onCellEditStop={(params) => setRowId(params.id.toString())}


            onRowSelectionModelChange={(params) => {
              setSelectedJobs(params)
              console.log(params)
              
            }}
            
          />          

        </Box>
        
     

        </>
     );
}



export default DataTable

