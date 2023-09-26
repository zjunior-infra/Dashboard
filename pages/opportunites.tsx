import LiveTable from "@/components/LiveTable";
import Head from "next/head";

export default function Opportunites(){


    return (
        <>
    <Head>
      <title>zJunior | Opportunites</title>
    </Head>
    
        <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
         <LiveTable />
        </main>   

    </>
    )
}