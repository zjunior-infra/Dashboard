import DataTable from '@/components/DataTable';
import HomeBox from '@/components/HomeBox';
import { fetcher } from '@/lib/utils';
import { Box, CircularProgress, Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR from 'swr';



export default function Home() {
  const { data, error, isLoading} = useSWR('/api/insights', fetcher,{revalidateOnFocus: false, revalidateOnReconnect: false,})
  const [keys, setKeys] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);

  useEffect(()=>{
    if(!isLoading && !error ){
      setKeys(Object.keys(data));
      setValues(Object.values(data));    
    }
  },[data])

  return (
    <>
    <Head>
      <title>zJunior | Home</title>
    </Head>

    
    
    <main className='px-24 flex min-h-screen flex-col w-full items-center gap-12 mt-24 text-white'>
   
    <Typography variant="h3" component="h3"  color={'white'}
     sx={{textAlign:'center', letterSpacing:3}}>Dashboard</Typography>

    {isLoading && <CircularProgress color="inherit" />}

    <div className='flex flex-wrap gap-20 justify-center'>    

      {keys.map((title: string, i:number) => {
          return <HomeBox key={title} title={title} value={values[i]}/>
      })}
   
    </div>

    </main>
   
    </>
  )
}



