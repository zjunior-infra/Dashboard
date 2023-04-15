import Image from 'next/image'
import { getJobs } from '@/Database';
import { Inter } from 'next/font/google'
import DataTable from '@/components/DataGrid'





const inter = Inter({ subsets: ['latin'] })

//@ts-ignore
export default function Home( {jobs}) {


  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">

      <DataTable jobs={jobs} />
     
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


