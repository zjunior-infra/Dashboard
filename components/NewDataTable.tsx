  import { toast } from 'react-toastify';
  import { useState, useMemo, useEffect } from 'react';
  import { Box, Typography, Avatar } from '@mui/material';
  import { DataGrid,GridEventListener, gridClasses, GridRenderCellParams, GridActionsCellItem } from '@mui/x-data-grid';
  import useSWR from 'swr'
  import {fetcher} from '@/lib/utils'
  import TableButtons from './TableButtons';
  import Swal from 'sweetalert2'
  import DeleteIcon from '@mui/icons-material/Delete';
  import SaveIcon from '@mui/icons-material/Save';
  import EditIcon from '@mui/icons-material/Edit';
  import CloseIcon from '@mui/icons-material/Close';

  const bulk:CrawledOpportunity[] = [{
    id:'123123',
    company: 'bulk',
    title: 'bulk',
    link: 'bulk',
    level: 'Internship',
    role:'bulk',
    description: 'bulk',
    logo: 'bulk',
    skills: 'bulk'
  },
  {
    id:'987654',
    company: 'bulk 2',
    title: 'bulk 2',
    link: 'bulk 2',
    level: 'Internship',
    role:'bulk 2',
    description: 'bulk 2',
    logo: 'bulk 2',
    skills: 'bulk 2'
  },
  {
    id:'456789',
    company: 'bulk 3',
    title: 'bulk 3',
    link: 'bulk 3',
    level: 'Internship',
    role:'bulk 3',
    description: 'bulk 3',
    logo: 'bulk 3',
    skills: 'bulk 3'
  },
  {
    id:'246802',
    company: 'bulk 4',
    title: 'bulk 4',
    link: 'bulk 4',
    level: 'Internship',
    role:'bulk 4',
    description: 'bulk 4',
    logo: 'bulk 4',
    skills: 'bulk 4'
  },
]

  function NewDataTable() {
    const { data, error, isLoading, mutate } = useSWR('/api/jobs', fetcher)
    const [crawlerJobs, setCrawlerJobs] = useState<CrawledOpportunity[]>([]);
    const [adjustedJobs, setAdjustedJobs] = useState<(CrawledOpportunity)[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false)
    const [editModeRowId, setEditModeRowId] = useState<string[]>([]);

    const [readyToDeploayjobs, setReadyToDeploayJobs] =useState<any[]>([])

  useEffect(()=>{
      if (!isLoading){
        setCrawlerJobs(data)
      }      
      // console.log(adjustedJobs);
      console.log(readyToDeploayjobs);

    },[data,adjustedJobs])

  const processRowUpdate = (newRow: CrawledOpportunity) => {
      console.log(newRow);
      const updatedRow = {...newRow};
      setAdjustedJobs((jobs) => jobs.filter((j) =>j.id.toString() !== newRow.id.toString()));
      setAdjustedJobs((jobs) => [...jobs, updatedRow]);
    
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
    setEditMode(true)
  };

    const handelUpdate = async ()=>{
        const res = await fetch ('/api/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({selectedJobs: readyToDeploayjobs}),
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

  const handleClose = (id:string)=> {
    setEditModeRowId((ids) => ids.filter((i) => i !== id))
  }

  const handleSave = async (id:string)=> {
    console.log('Save Done');
    setEditMode(false);
    setEditModeRowId((ids) => ids.filter((i) => i !== id));
    setAdjustedJobs(jobs=> jobs.filter(j => j.id.toString() !== id));
    
    setReadyToDeploayJobs(jobs =>[...jobs, adjustedJobs.find(j => j.id === id)]);

    mutate();
  };

  const handelCharge =async ()=>{
    await handelUpdate()
    setReadyToDeploayJobs([])
    setEditModeRowId([])
  }

  const handelDelete = (row: { id: string; }) =>     {
  console.log(row);
  
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
            const res = await fetch ('/api/delete', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({selectedJobs: row.id}),
            })
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
              toast.success(`Copied`, {
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
        {field: 'role', headerName:'Role', width:140 , editable: true},
        {field: `logo`, headerName: 'Logo', width: 70, editable: true ,
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
            if (editModeRowId.includes(params.row.id)) {
              return [
                <GridActionsCellItem
                  icon={<SaveIcon/>}
                  label="Save"
                  sx={{
                    color: 'primary.main',
                  }}
                  onClick={()=> handleSave(params.row.id)}
                />  
              ,
            <GridActionsCellItem
              icon={<CloseIcon />}
              label="Delete"
              color="inherit"
              onClick={()=> handleClose(params.row.id.toString())}
            />,
            ]
          }
            else{
              return [
                <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                color="inherit"
                onClick={()=> activeRow(params.row.id.toString())}
                />,
                <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                color="inherit"
                onClick={()=> handelDelete(params.row)}
                />,
              ];
            }
          },
        },
],[adjustedJobs, editModeRowId])

    return (
      <div className='flex flex-col'> 
      <Typography variant="h3" component="h3"  color={'white'}
      sx={{textAlign:'center', mt:3, mb:3}}>Manage Jobs</Typography>

      <Box sx={{ height: 550, width: '100%' }} className="z-0" >

      <TableButtons handelCharge={handelCharge}/>

      <DataGrid
        columns={columns ?? bulk} 
        rows={crawlerJobs}
        sx={{[`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? `grey[200]` : `grey.900`, height: 80,},pl: 0.7,}}
        pageSizeOptions={[5, 10]}
        editMode='row'
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
    />
        </Box>
    </div>
    )
  }

  export default NewDataTable

///////////////////////////////////////////////////////
    {/* <LoadingButton variant="outlined" className='p-2 mb-1'>
                <span className=' text-base font-roboto font-medium'>charge JuniorJobs</span>
            </LoadingButton> */}
            {/* <Fab  variant="extended" color="primary">
              <AddIcon />
            </Fab> */}     