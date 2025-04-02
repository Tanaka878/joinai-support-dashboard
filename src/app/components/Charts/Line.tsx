'use client'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS ,
   CategoryScale,
    LinearScale, 
    PointElement 
    , LineElement,
     Title, 
     Tooltip,Legend} from 'chart.js'


     ChartJS.register(CategoryScale,
      LinearScale, 
      PointElement 
      , LineElement,
       Title, 
       Tooltip,Legend
      );
const LineChart = () => {



    const ChartData= {
      labels:[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursady",
        "Friday",
        "Saturday",
        "Sunday"
      ]
      ,
      datasets:[
        {
          label:"Steps",
          data:[1,2,3,4,20,6,7],
          
        }
      ]
    }

  return (
      <Line data={ChartData} className='h-1/2 w-full'/>


      
  )
}

export default LineChart
