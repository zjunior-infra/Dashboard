import Head from 'next/head';
import DataTable from '@/src/components/DataGrid'



export default function Home() {

  return (
    <>
    <Head>
      <title>zJunior | Dashboard</title>
    </Head>

    
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      

      <DataTable />
     
    </main>
    </>
  )
}



