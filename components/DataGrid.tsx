import UserAction from './UserAction';
import { toast } from 'react-toastify';
import EditButtons from './editButtons';
import { useState, useMemo, useEffect } from 'react';
import { CrawledJob, Job } from '@prisma/client';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Box, Typography, Avatar, Fab } from '@mui/material';
import { DataGrid, GridRowId, GridRowSpacingParams, gridClasses, GridRenderCellParams } from '@mui/x-data-grid';

interface DataTableProps {
  jobs: CrawledJob[];
  refershData: () => void;
}


const DataTable = ( {jobs, refershData}:DataTableProps ) => {

  const [rowId, setRowId] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [crawlerLoading, setCrawlerLoading] = useState<boolean>(false)
  const [crawlerSuccess, setCrawlerSuccess] = useState<boolean>(false)
  const [ key, setKey] = useState<number>(0)
  const [editTable , setEditTable] = useState<boolean>(false)
  const [selectedJobs, setSelectedJobs] = useState<GridRowId[]>([])
  const [crawlerjobs , setJobs] = useState<CrawledJob[]>(jobs)

    
    const columns = useMemo(() => [
      { field: 'id', headerName: 'ID', width: 100, editable: true },
      { field: `company`, headerName: 'Company', width: 140 , editable: true },
      { field: `title`, headerName: 'Title', width: 160 , editable: true },
     
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
      

      {field: `deadline`, headerName: 'Deadline', width: 140, editable: true  },
      {field: 'type', headerName:'Type', width:140 , editable: true},
      {field: `logo`, headerName: 'Logo', width: 70, editable: true ,
        renderCell: (params:GridRenderCellParams) => <Avatar alt="Remy Sharp" src={params.row.logo} /> },

      {field: `skills`, headerName: 'Skills' , width: 160, editable: true },

      { field: 'actions', headerName: 'Actions', type: 'actions',
        renderCell: (params:GridRenderCellParams) =>
          <UserAction params={params} rowId={rowId} setRowId={setRowId} />
        ,  
      },

    ], [rowId])
    // this should be called after the set render, avoiding the limit
      let rows = crawlerjobs.map((crawlerjobs:Job)=>{
        const {id,company,title,type,link,deadline,logo,skills}=crawlerjobs;
        return {
          id,
          company,
          title,
          link,
          type,
          deadline,
          logo,
          skills,
        }
      }
      )

      const handleDelete = async () => {
        setLoading(true)
        const res = await fetch ('/api/delete', {
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
        const res = await fetch ('/api/confirm', {
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

      const handleCrawler = async () => {
        setCrawlerLoading(true)

        const res = await fetch ('/api/crawler', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
        if (res.ok){
          setCrawlerLoading(false)
          setCrawlerSuccess(true)
          toast.success(`Crawler finished successfully`)
        }
        else {
          setCrawlerLoading(false)
          setCrawlerSuccess(false)
          toast.error(`Error running the crawler`)
        }


      }

      const handeelRefershData = async () => {
        refershData()
        setCrawlerSuccess(false)
        setKey((prev) => prev + 1)
      }

     
    return ( 
        <>
        <Box sx={{ height: 550, width: '100%' }} className="z-0" >

          <Typography variant="h3" component="h3"  color={'white'}
            sx={{textAlign:'center', mt:3, mb:3}}
          >
            Manage Jobs

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

            <LoadingButton
            onClick={handleCrawler}
            loading={crawlerLoading}
            variant="outlined"
            className='p-2 mb-1'
          >
               <span className=' text-base font-roboto font-medium'>charge JuniorJobs</span>
          </LoadingButton>


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
              
            }}
            
          />          

        </Box>

        {
          crawlerSuccess && (
            <div className=' flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark_bg rounded-2xl z-10
            shadow-slate-300 shadow-2xl  w-160 h-96'>
              <div className=' flex items-end justify-end pr-3 pt-3 cursor-pointer'
              onClick={() => setCrawlerSuccess(false)}
              >
                <CloseIcon style={{color : 'white'}} />

              </div>
              <div className="w-160 h-96 grid grid-cols-1 text-center py-10 px-3 font-nunito font-extrabold ">
                <div className="text-4xl text-white self-start">Crawler finished successfully</div>
                <div  className='self-center flex items-center justify-center '>
                <button className="button  text-white bg-blue-400 py-3 px-5 rounded-2xl  "
                onClick={handeelRefershData}
                >Refresh table</button>
                </div>
                <p className='self-end text-xs text-white '>if you have unfinished business you can close the popup and refresh it manually later</p>

              </div>


            </div>
            )
        }
        
     

        </>
     );
}



export default DataTable

