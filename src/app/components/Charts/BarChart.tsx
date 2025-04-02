'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS ,
   CategoryScale,
    LinearScale, 
     BarElement,
     Title, 
     Tooltip,Legend} from 'chart.js'


     ChartJS.register(CategoryScale,
      LinearScale, 
       BarElement,
       Title, 
       Tooltip,Legend
      );
      


      const BarChart = () => {

        const barchartData = {
            labels:["Grocery","Utilities", "Utilities"],

            datasets:[{
                label:"Expenses",
                data:[200, 300,100]
            }]
        }
        return (
      
            <Bar data={barchartData}/>
        )
      }
      
      export default BarChart
      