import Image from 'next/image'
import { Inter } from 'next/font/google'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getJobs } from '@/Database';
import { Job } from '@prisma/client';

const inter = Inter({ subsets: ['latin'] })

//@ts-ignore
export default function Home({jobs}) {
  console.log(jobs)

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: `company`, headerName: 'Company', width: 200},
    { field: `title`, headerName: 'Title', width: 200},
    { field: `link`, headerName: 'Link', width: 350},
    {field: `deadline`, headerName: 'Deadline', width: 200 },
    {field: `logo`, headerName: 'Logo', width: 200 },
    {field: `skills`, headerName: 'Skills' , width: 200}
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
      skills
    }
  }
  )

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
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

        />
    </main>
  )
}

export async function getServerSideProps(){
  const jobs=await getJobs();
  return {
    props:{
      jobs
    }
  }

}