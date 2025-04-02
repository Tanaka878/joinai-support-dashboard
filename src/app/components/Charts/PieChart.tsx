'use client'
import { Chart as ChartJS, Tooltip, Legend, ArcElement
     } from 'chart.js'

import { Pie } from 'react-chartjs-2'


     ChartJS.register(
        Tooltip,Legend,ArcElement
     
      );

const  piechartData = {
    labels:["Facebook", "LinkedIn", "Twitter"],

    datasets:[{
        label:"Time Spent",
        data:[20, 40,10]
    }]
}

import React from 'react'

const PieChart = () => {
  return (
    <Pie data={piechartData}/>
    
  )
}

export default PieChart
