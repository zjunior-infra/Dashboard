import DataTable from '@/components/DataTable';
import Head from 'next/head';



export default function Home() {

  return (
    <>
    <Head>
      <title>zJunior | Crawler</title>
    </Head>

    
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <DataTable />
    </main>
    </>
  )
}