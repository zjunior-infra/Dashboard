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

function LiveTable() {

  const { data, error, isLoading} = useSWR('/api/opportunities', fetcher,{revalidateOnFocus: false, revalidateOnReconnect: false,})

  const [liveJobs, setLiveJobs] = useState<CrawledOpportunity[]>([]);
  const [editModeRowId, setEditModeRowId] = useState<string[]>([]);
  const [selectedRows, setSelectedRows]= useState<GridRowId[]>([]);
  const [currPage, setCurrPage] = useState<{page:number, pageSize: number}>({page:0, pageSize: 30});

useEffect(()=>{
    if (!isLoading){
      setLiveJobs(data)
    }      
   
  },[data])

const processRowUpdate = (newRow: CrawledOpportunity) => {
      const updatedRow = { ...newRow};
      setLiveJobs(jobs => jobs.map((job) => (job.id === newRow.id ? updatedRow : job)));
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
    
};

const handleRowEditStop: GridEventListener<'rowEditStop'> = (params) => {    
  activeRow(params.row.id.toString())
};

const handelUpdate = async (job: any)=>{  
    const res = await fetch (`/api/opportunities/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
    })
    if (res.ok){
      console.log('success')
      toast.success('Job updated successfully')
    }
    else {
      console.log('fail')
      toast.error('Job update failed')
}};

const handleSave = async (row: {id: string; new?: boolean;})=> {
  handelUpdate(row)
  setEditModeRowId((ids) => ids.filter((i) => i !== row.id))
};

const handelDelete = async (row: { id: string; }) => {
    
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
        await fetch (`/api/opportunities/${row.id}`, {
          method: 'DELETE',
        })

        setLiveJobs(jobs => jobs.filter(job=> job.id !== row.id))
        toast.success('Job Deleted Successfully')
      }catch(err){
        toast.error('Job Deleted Failed')
      }
    }
  })
};

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
        width: 100,
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
          ]         
        },
      },
],[ editModeRowId])

  return (
    <>
    <Box sx={{ height: 550, width: '100%' }} className="z-0" >
    <TableButtons type='live' currPage={currPage} jobs={liveJobs} selectedRows={selectedRows} setJobs={setLiveJobs} setSelectedRows={setSelectedRows}/>

    <DataGrid
      initialState={{
        pagination:{paginationModel:{pageSize:30}}
      }}
      
      columns={columns} 
      rows={liveJobs}
      sx={{[`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? `grey[200]` : `grey.900`, height: 80,},pl: 0.7,}}
      pageSizeOptions={[30,50,100]}
      onPaginationModelChange={(params)=> setCurrPage(params)}
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

export default LiveTable;