import { useState, useMemo } from 'react';
import UserAction from './UserAction';
import { CrawledJob, Job } from '@prisma/client';
import { Box, Typography, Avatar, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRowId, GridRowSpacingParams, gridClasses, GridRenderCellParams } from '@mui/x-data-grid';


const DataTable = ( {jobs}:{jobs:CrawledJob[]} ) => {

  const [rowId, setRowId] = useState('')
    
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
          <UserAction params={params} rowId={rowId} setRowId={setRowId} />
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

    return ( 
        <>
        <Box sx={{ height: 600, width: '100%' }}>

          <Typography variant="h3" component="h3"  color={'white'}
            sx={{textAlign:'center', mt:3, mb:3}}
          >
            Mange Jobs

          </Typography>

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
            
          />          

        </Box>

        </>
     );
}



export default DataTable

