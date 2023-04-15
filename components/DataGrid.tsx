import { useState } from 'react';
import { Job } from '@prisma/client';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';

//@ts-ignore
const DataTable = ( {jobs} ) => {

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

      const handleSelectionModelChange = (newSelectionModel: GridRowId[]) => {
        setSelectionModel(newSelectionModel);
        console.log(newSelectionModel)
      };
    
      const getUpdatedJob = (job : Job)=>{
        console.log(job.id)
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


        </>
     );
}



export default DataTable


