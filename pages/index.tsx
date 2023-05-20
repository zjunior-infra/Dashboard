import Head from 'next/head';
import { getJobs } from '@/Database';
import { useRouter } from 'next/router';
import { CrawledJob } from '@prisma/client';
import DataTable from '@/components/DataGrid'
import type { Job } from '@/Database/interface';



export default function Home( {jobs}:{jobs:CrawledJob[]}) {

  return (
    <>
    <Head>
      <title>zJunior | Dashboard</title>
    </Head>

    
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      

      <DataTable jobs={jobs} />
     
    </main>
    </>
  )
}

export async function getServerSideProps(){
  const jobs = await getJobs();
  return {
    props:{
      jobs
    }
  }

}

