import LiveTable from "@/components/LiveTable";
import { fetcher } from "@/lib/utils";
import { Input, TextField, Typography } from "@mui/material";
import { DateFieldProps, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR, {mutate} from "swr";
export default function Kpis(){
    const {data, error, isLoading} = useSWR<any>('/api/kpi/recentAddedJobs?span=100',fetcher)
    const [number , setNumber] = useState<any>()
    const [span,setSpan] = useState<number>(0)
    const [date,setDate] = useState('')

    useEffect(()=>{
        if(!isLoading)
            setNumber(data.number)
    },[data])

    const onClick = ()=>{
        
    }
    return (
        <>
    <Head>
      <title>zJunior | KPIs</title>
    </Head>

    
    <main className="flex justify-center gap-10 p-24">
        <DatePicker disableFuture onChange={(value)=> console.log(value)}/>
        <TextField type="number" placeholder="Back in time x days"/>
        <button onClick={onClick} className="p-2 px-10 border-2 border-slate-500 hover:bg-slate-500 duration-200 rounded-lg text-white">LookUp</button>
    </main>
    <section className="flex flex-col justify-center gap-10">
            <h1 className="text-4xl font-bold text-center text-white"> Number of Jobs Pushed to Live</h1>
            <h1 className="text-4xl font-bold text-center text-white">{number}</h1>    
    </section>
    
    <section>
    <Typography variant="h3" component="h3"  color={'white'}
        sx={{textAlign:'center', margin:4}}>Manage Live Jobs</Typography>

        <main className="flex h-full w-full flex-col items-center justify-between px-24 pb-24">
         <LiveTable />
        </main>
    </section>
    
    </>
    )
}