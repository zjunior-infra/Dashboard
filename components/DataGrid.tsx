import { useState } from 'react';
import Fab from '@mui/material/Fab';
import { CrawledJob, Job } from '@prisma/client'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';


const DataTable = ( {jobs}:{jobs:CrawledJob[]} ) => {
    

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 200, editable: true },
        { field: `company`, headerName: 'Company', width: 200 , editable: true },
        { field: `title`, headerName: 'Title', width: 200 , editable: true },
        { field: `link`, headerName: 'Link', width: 350 , editable: true },
        {field: `deadline`, headerName: 'Deadline', width: 200, editable: true  },
        {field: `logo`, headerName: 'Logo', width: 200, editable: true  },
        {field: `skills`, headerName: 'Skills' , width: 200, editable: true }
      ];  

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

      const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
      const [isDisabled, setIsDisabled] = useState<boolean>(true);
      const [adjustedJobs, setAdjustedJobs] = useState<Job[]>([]);

      const handleSelectionModelChange = (newSelectionModel: GridRowId[]) => {
        setIsDisabled(false);
        if (newSelectionModel.length === 0) {
            setIsDisabled(true);
        }
        setSelectionModel(newSelectionModel);
        console.log(newSelectionModel)
      };
    
      const getUpdatedJob = (job : Job)=>{
        //@ts-ignore
       setAdjustedJobs(...adjustedJobs, job)
      } 

      const handleUpdate = async ()=>{
        // console.log(adjustedJobs)   
        // const updatedJobs = selectionModel.map((id)=>{
        //     const job = jobs.find((job)=>job.id===id);
        //     return job;
        // })
        // await updateJobs(updatedJobs);

        updateJobs(adjustedJobs);
        
        }   




    return ( 
        <>
         <DataGrid 
        rows={rows}
        columns={columns}
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 13,
            },
          },
        }}
        pageSizeOptions={[13]}
       
        checkboxSelection
        disableRowSelectionOnClick
       
        onRowSelectionModelChange = {handleSelectionModelChange}
        isCellEditable={(params)=>{return true}}
        editMode='cell'
       onCellEditStop={(params)=>{
        getUpdatedJob(params.row as Job)
       }}
        />
        <div className="grid grid-cols-1 w-full justify-end pt-8 mr-32">
            <Stack direction="row" spacing={4} className=' justify-self-end'  >
                <Button variant="outlined" startIcon={<AddIcon />} color="primary" >
                Add
                </Button>
            
                <Button variant="outlined" startIcon={<DeleteIcon />} color="error" disabled={isDisabled} >
                Delete
                </Button>
                <Button variant='outlined' color="secondary" disabled={isDisabled}  startIcon={<EditIcon />}
                    onClick={handleUpdate}
                >
                    Update
                </Button>
                <Button variant="outlined" endIcon={<SendIcon />} color="success" disabled={isDisabled}>
                Send
                </Button>
            </Stack>
        </div>


        </>
     );
}



export default DataTable

