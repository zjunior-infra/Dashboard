import Head from 'next/head';
import { getJobs } from '@/Database';
import { useRouter } from 'next/router';
import { CrawledOpportunity } from '@prisma/client';
import DataTable from '@/components/DataGrid'



export default function Home( {jobs}:{jobs:CrawledOpportunity[]}) {

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

