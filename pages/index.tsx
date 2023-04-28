import { getJobs } from '@/Database';
import DataTable from '@/components/DataGrid'
import { CrawledJob } from '@prisma/client';


export default function Home( {jobs}:{jobs:CrawledJob[]}) {


  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">

      <DataTable jobs={jobs} />
     
    </main>
  )
}

export async function getServerSideProps(){
  try{
    const jobs = await getJobs();
  return {
    props:{
      jobs
    }
  }
  }
  catch(err){
    return err
  }

}

