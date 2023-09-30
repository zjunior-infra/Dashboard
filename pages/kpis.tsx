import { fetcher } from "@/lib/utils";
import { Input, TextField } from "@mui/material";
import { DateFieldProps, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";
export default function Kpis(){
    const {data, error, isLoading} = useSWR<any>('/api/kpi/recentAddedJobs?span=7',fetcher)
    const [number , setNumber] = useState<any>()
    const [span,setSpan] = useState<number>(0)
    const [date,setDate] = useState<string|unknown>('')

    useEffect(()=>{
        if(!isLoading)
            setNumber(data.number)
    },[data])

    const onClick = async ()=>{
        if(date){
            //@ts-ignore
            const formatedDate = dayjs(date).format('DD-MM-YYYY')
            const res = await fetch(`/api/kpi/recentAddedJobs?date=${formatedDate}&span=${span ?? 7}`)
            const data = await res.json()
            setNumber(data.number)
        }
        else{
            alert('Fuck you, pick a date')
        }
    }
    return (
        <>
    <Head>
      <title>zJunior | KPIs</title>
    </Head>

    <main className="flex pt-48 min-h-screen w-full flex-col items-center gap-32">
        <section className="flex gap-10">
        <DatePicker disableFuture onChange={(value)=> setDate(value)}/>
        <TextField type="number" onChange={(value)=> setSpan(Number(value.target.value))} placeholder="Back in time x days"/>
        <button onClick={onClick} className="p-2 px-10 border-2 border-slate-500 hover:bg-slate-500 duration-200 rounded-lg text-white">LookUp</button>
        </section>
    <section className="flex flex-col justify-center gap-10">
            <h1 className="text-4xl font-bold text-center text-white"> Number of Jobs Pushed to Live</h1>
            <h1 className="text-4xl font-bold text-center text-white">{number}</h1>    
    </section>    
    </main>
    </>
    )
}