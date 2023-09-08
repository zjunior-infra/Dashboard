import { toast } from 'react-toastify';
import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { DataGrid,GridEventListener, gridClasses, GridRenderCellParams, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import useSWR from 'swr'
import {fetcher} from '@/lib/utils'
import TableButtons from './TableButtons';
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import NavigationIcon from '@mui/icons-material/Navigation';

function NewDataTable() {

  const { data, error, isLoading} = useSWR('/api/jobs', fetcher,{revalidateOnFocus: false, revalidateOnReconnect: false,})

  const [crawlerJobs, setCrawlerJobs] = useState<CrawledOpportunity[]>([]);
  const [editModeRowId, setEditModeRowId] = useState<string[]>([]);
  const [confirmRowId, setConfirmRowId] = useState<string[]>([]);
  const [selectedRows, setSelectedRows]= useState<GridRowId[]>([]);

useEffect(()=>{
    if (!isLoading){
      setCrawlerJobs(data)
    }      
   
  },[data])

const processRowUpdate = (newRow: CrawledOpportunity) => {
      const updatedRow = { ...newRow, isNew: false };
      setCrawlerJobs(crawlerJobs.map((job) => (job.id === newRow.id ? updatedRow : job)));
      return updatedRow;
    
};

const activeRow = (id:string)=>{
    setEditModeRowId(ids =>{
      if (ids.includes(id)){
        return [...ids]
      }else{
        return [...ids, id]
      }
    });
    setConfirmRowId(ids =>{
      if (ids.includes(id)){
        return [...ids]
      }else{
        return [...ids, id]
      }
    });
};

const handleRowEditStop: GridEventListener<'rowEditStop'> = (params) => {    
  activeRow(params.row.id.toString())
  // setRowModesModel({
  //   [params.row.id]: {mode:GridRowModes.View}
  // })
};

const handelUpdate = async (jobs: any)=>{
  const res = await fetch ('/api/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({selectedJobs: [jobs]}),
})
if (res.ok){
  console.log('success')
  toast.success('Job updated successfully')
}
else {
  console.log('fail')
  toast.error('Job update failed')
}
};

const handleCreate = async (jobs: any)=>{
  const newJob = jobs
  const res = await fetch ('/api/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newJob)
})
if (res.ok){
  console.log('success')
  toast.success('Job Created successfully')
}
else {
  console.log('fail')
  toast.error('Job creation failed')
}
}

const handleSave = async (row: { id: string; new?: boolean; })=> {
  if(row.new){
    delete row.new;
    handleCreate(row);  
  }
  else{
    handelUpdate(row)
  }
  setEditModeRowId((ids) => ids.filter((i) => i !== row.id))
};

const handelDelete = (row: { id: string; }) => {

Swal.fire({
      title: `Are you sure you want to delete ${row.id} opportunity?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          await fetch ('/api/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({selectedJobs: [row.id]}),
          })

          setCrawlerJobs(jobs => jobs.filter(job=> job.id !== row.id))
          toast.success('Job Deleted Successfully')
        }catch(err){
          toast.error('Job Deleted Failed')
        }
      }
    })
};

const handleConfirm = async (row: {id:string})=>{
  console.log("Confirm");
  try{
   await fetch ('/api/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({selectedJobs: [row]}),
    })
    setConfirmRowId((ids) => ids.filter((i) => i !== row.id))
    toast.success("Job Confirmed Successfully")
  }catch(err){
    toast.error("Job Confirmation failed")
    console.log(err);
  } 

}

  const columns = useMemo(()=>
  [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        editable: false,
        renderCell: (params: GridRenderCellParams) => {
          const value = params.value;
          const copyToClipboard = (text: string) => {
            navigator.clipboard.writeText(value);
            toast.success(`Copied ${value}`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          };
          return (
            <div>
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard(value);
                }}
              >
                {params.row.id}
              </span>
            </div>
          );
        },
      },
      { field: `company`, headerName: 'Company', width: 140 , editable: true },
      { field: `title`, headerName: 'Title', width: 280 , editable: true },
      { field: `link`, headerName: 'Link', width: 250, editable: true,
        renderCell: (params: GridRenderCellParams) => (
          <a 
            href={params.row.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none' }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.textDecoration = 'none';
            }}
          >
            {params.row.link}
          </a>
        ),
      },

      {field: 'level', headerName:'Level', width:140 , editable: true ,type: 'singleSelect',
      valueOptions: ['Internship', 'Entrylevel']},
      {field: 'role', headerName:'Role', width:160 , editable: true},
      {field: `logo`, headerName: 'Logo', width: 70,
        renderCell: (params:GridRenderCellParams) => <Avatar alt="Company Logo" src={params.row.logo} /> },
      // {field: `skills`, headerName: 'Skills' , width: 160, editable: true },
      // {field: `description`, headerName: 'Description' , width: 160, editable: true },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 120,
        cellClassName: 'actions',
        getActions:(params: {row: { id: string }}) => {
            return [
              <GridActionsCellItem
                icon={<SaveIcon/>}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                disabled={!editModeRowId.includes(params.row.id)}
                onClick={()=> handleSave(params.row)}
              />  
            ,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={()=>handelDelete(params.row)}
          />,
          <GridActionsCellItem
            icon={<NavigationIcon/>}
            label="confirm"
            color="inherit"
            className='text-green-500'
            disabled={!confirmRowId.includes(params.row.id)}
            onClick={()=>handleConfirm(params.row)}
          />,
          ]         
        },
      },
],[ editModeRowId, confirmRowId])

  return (
    <>
    <Typography variant="h3" component="h3"  color={'white'}
    sx={{textAlign:'center'}}>Manage Jobs</Typography>

    <Box sx={{ height: 550, width: '100%' }} className="z-0" >

    <TableButtons crawlerJobs={crawlerJobs} selectedRows={selectedRows} setCrawlerJobs={setCrawlerJobs} setSelectedRows={setSelectedRows}/>

    <DataGrid
      initialState={{
        pagination:{paginationModel:{pageSize:30}}
      }}
      
      columns={columns} 
      rows={crawlerJobs}
      sx={{[`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? `grey[200]` : `grey.900`, height: 80,},pl: 0.7,}}
      pageSizeOptions={[30,50,100]}
      editMode='row'
      checkboxSelection 
      disableRowSelectionOnClick
      onRowSelectionModelChange = {(params)=>setSelectedRows(params)}
      rowSelectionModel={selectedRows}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
  />
      </Box>
      </>
  )
}

export default NewDataTable