  import UserAction from './UserAction';
  import { toast } from 'react-toastify';
  import EditButtons from './editButtons';
  import { useState, useMemo, useEffect } from 'react';
  import EditIcon from '@mui/icons-material/Edit';
  import CloseIcon from '@mui/icons-material/Close';
  import LoadingButton from '@mui/lab/LoadingButton';
  import DeleteIcon from '@mui/icons-material/Delete';
  import NavigationIcon from '@mui/icons-material/Navigation';
  import { Box, Typography, Avatar, Fab, ButtonGroup } from '@mui/material';
  import { DataGrid, GridRowId, GridRowSpacingParams, gridClasses, GridRenderCellParams, GridCellEditStopParams, MuiEvent,GridActionsCellItem } from '@mui/x-data-grid';
  import useSWR from 'swr'
  import {fetcher} from '@/lib/utils'
  import AddIcon from '@mui/icons-material/Add';
import { EditRoad } from '@mui/icons-material';
import TableButtons from './TableButtons';


import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


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
    const [crawlerjobs , setCrawlerjobs] = useState<CrawledOpportunity[]>([]);
    
    const columns = useMemo(()=>[
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
          getActions: () => {
            // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
            if (true) { /* isInEditMode */
              return [
                <GridActionsCellItem
                  icon={<SaveIcon/>}
                  label="Save"
                  sx={{
                    color: 'primary.main',
                  }}
              className='bg-sky-900 hover:bg-sky-500'
                />
              ,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="inherit"
              className='bg-red-700 hover:bg-red-500'
            />,
            ]
            }
    
            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                color="inherit"
              />,
            ];
          },
        },
],[])

const { data:crawlerJobs, error, isLoading } = useSWR('/api/jobs', fetcher)


let rows = crawlerJobs|| bulk?.map((crawlerjobs:CrawledOpportunity)=>{
          const {id,company,title,description,level,role,link,logo,skills}=crawlerjobs;
          return {
            id,
            company,
            title,
            link,
            level,
            role,
            description,
            logo,
            skills,
          }
        }
)

    return (
      <div className='flex flex-col'> 
      <Typography variant="h3" component="h3"  color={'white'}
      sx={{textAlign:'center', mt:3, mb:3}}>Manage Jobs</Typography>

      <Box sx={{ height: 550, width: '100%' }} className="z-0" >

      <TableButtons/>

      <DataGrid columns={columns} rows={rows ?? bulk} sx={{
        [`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? `grey[200]` : `grey.900`, height: 80,},pl: 0.7,}}
        pageSizeOptions={[5, 10]}

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