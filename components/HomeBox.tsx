import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'

interface HomeBoxProps {
    title: string,
    value: string
}

function HomeBox(props: HomeBoxProps) {
  return (
    <Box
 sx={{
   width: 300,
   height: 200,
   border: '1px grey' ,
   boxShadow: 10,
   borderRadius: 2 
 }}
 className="flex flex-col items-center justify-center gap-6"
> 
   <Typography variant='h4' component='h4' >{props.title}</Typography>
   <Typography variant='h3' component='h3' className='font-bold'>{props.value}</Typography>

 </Box> 
  )
}

export default HomeBox