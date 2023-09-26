import { Fab } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import NavigationIcon from '@mui/icons-material/Navigation';
import AddIcon from '@mui/icons-material/Add';
import { GridRowId, GridRowModesModel,GridRowModes } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuid } from 'uuid';

interface TableButtons {
  type: "crawler" | "live"
  selectedRows :GridRowId[]
  setJobs :Dispatch<SetStateAction<CrawledOpportunity[]>>
  setSelectedRows: Dispatch<SetStateAction<GridRowId[]>>
  jobs:CrawledOpportunity[]
  currPage: {page: number, pageSize: number};
}
function TableButtons({selectedRows, setJobs, setSelectedRows, jobs, currPage, type}: TableButtons){

  const api_url = type === 'live'? '/api/opportunities' : '/api/crawledopportunities'

  const handleCreate= async()=>{
    const {page, pageSize} = currPage;
    console.log("Created");
    const id = uuid();
    const job= { id, new:true, title: '', company: '', description: "", link:"", level:"Internship", role: "", logo:"", skills:"" };
   
    const updatedCrawlerJobs = [
      ...jobs.slice(0, page * pageSize),
      job,
      ...jobs.slice(page * pageSize),
    ];
   
    setJobs(updatedCrawlerJobs);
  }

  const handelDelete = async ()=>{  
    const selectedJobs: CrawledOpportunity[] = jobs.filter(j => selectedRows.includes(j.id));
    
    Swal.fire({
          title: `Are you sure you want to delete Selected opportunities?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete them!'
        }).then(async (result) => {
          if (result.isConfirmed) {
              try{              
                await fetch (api_url, {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(selectedJobs),
                })
              setJobs((jobs) => jobs.filter(job=> !selectedRows.includes(job.id)))
              setSelectedRows([])
              toast.success('Jobs Deleted Successfully')
            }catch(err){
              toast.error('Jobs Deleted Failed');
              console.log(err);
            }
          }
        })
  }

  const handleConfirm = async()=>{
    console.log('confirm');
    const selectedJobs = jobs.filter(j => selectedRows.includes(j.id));
    try{
      await fetch ('/api/confirm', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(selectedJobs),
       })
       const updatedCrawlerJobs = jobs.filter(j => !selectedRows.includes(j.id));
       setJobs(updatedCrawlerJobs);
       setSelectedRows([]);
       toast.success("Jobs Confirmed Successfully");
   }catch(err){
     toast.error("Jobs Confirmation failed");
   } 
  }

  return (
    <div className="icon w-full flex items-center justify-start gap-x-4 mb-2 mr-5">
    
    <Fab color="primary" variant="extended" aria-label="delete" className='bg-red-500' disabled={selectedRows.length === 0}
    onClick={handelDelete}
    >
      <DeleteIcon />
    </Fab> 

    <Fab color="primary" variant="extended" aria-label="add" className={`bg-gray-200 ${type ==='live' && 'invisible'}`} onClick={handleCreate}>
      <AddIcon />
    </Fab> 
   
  <Fab variant="extended" color="primary" aria-label="confirm" className={`bg-gray-200 ${type ==='live' && 'invisible'}`} onClick={handleConfirm} disabled={selectedRows.length === 0}>
      <NavigationIcon sx={{ mr: 1 }} />
      Confirm jobs
  </Fab>   
      
      </div>
  )
}

export default TableButtons