'use client'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Updated interface to match the actual response format
interface StatsByAgent {
  solved_DAILY: number
  solved_WEEKLY: number
  solved_MONTHLY: number
  daily_TICKETS: number
  weekly_TICKETS: number
  monthly_TICKETS: number
}

const BarChart: React.FC = () => {
  const [stats, setStats] = useState<StatsByAgent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const storedToken = localStorage.getItem('email')
        if (!storedToken) {
          throw new Error('No token found')
        }
        const response = await fetch('http://localhost:8082/ticket/getMyStats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: storedToken,
          }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: StatsByAgent = await response.json()
        setStats(data)
      } catch (err) {
        console.error('Error fetching stats:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }
    fetchStats()
  }, [])

  if (error) {
    return <p>Error: {error}</p>
  }
  
  if (!stats) {
    return <p>Loading chart...</p>
  }
  
  console.log(stats)
  
  const data: ChartData<'bar'> = {
    labels: ['Daily', 'Weekly', 'Monthly'],
    datasets: [
      {
        label: 'Solved Tickets',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        // Updated to match the actual property names
        data: [stats.solved_DAILY, stats.solved_WEEKLY, stats.solved_MONTHLY],
      },
      {
        label: 'Total Tickets',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        // Updated to match the actual property names
        data: [stats.daily_TICKETS, stats.weekly_TICKETS, stats.monthly_TICKETS],
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Agent Support Ticket Stats',
      },
      legend: {
        position: 'top' as const,
      },
    },
  }

  // Add a container with explicit height
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart