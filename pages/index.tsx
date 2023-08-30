import Head from 'next/head';
import DataTable from '@/components/DataGrid'
import NewDataTable from '@/components/NewDataTable';



export default function Home() {

  return (
    <>
    <Head>
      <title>zJunior | Dashboard</title>
    </Head>

    
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      

      {/* <DataTable /> */}
      <NewDataTable/>
    </main>
    </>
  )
}



