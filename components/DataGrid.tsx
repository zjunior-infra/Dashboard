import { useState } from 'react';

import { CrawledJob, Job } from '@prisma/client';
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

      const handelUpdate = async ()=>{
        const res = await fetch ('/api/jobs/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify({selectedJobs:adjustedJobs}),

        })
        if (res.ok){
          console.log('success')
        }
        else {
          console.log('fail')
        }
      }

    




    return ( 
        <>
          <DataGrid
          columns={columns}
          rows={rows}
          />

        </>
     );
}



export default DataTable

