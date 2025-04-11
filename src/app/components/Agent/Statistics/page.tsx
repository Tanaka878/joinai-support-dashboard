import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HourlyDataPoint {
  hour: string;
  percent: number;
}

interface WeeklyDataPoint {
  day: string;
  tickets: number;
}

export default function AgentsStats(): React.ReactElement {
  
  // Data for tickets created by hour
  const hourlyData: HourlyDataPoint[] = [
    { hour: '0', percent: 3 },
    { hour: '1', percent: 4 },
    { hour: '2', percent: 4 },
    { hour: '3', percent: 3.5 },
    { hour: '4', percent: 3.5 },
    { hour: '5', percent: 7 },
    { hour: '6', percent: 14 },
    { hour: '7', percent: 11 },
    { hour: '8', percent: 5.5 },
    { hour: '9', percent: 5 },
    { hour: '10', percent: 4.5 },
    { hour: '11', percent: 4.5 },
    { hour: '12', percent: 4.5 },
    { hour: '13', percent: 4 },
    { hour: '14', percent: 3 },
    { hour: '15', percent: 2.5 },
    { hour: '16', percent: 2 },
    { hour: '17', percent: 2 },
    { hour: '18', percent: 2 },
    { hour: '19', percent: 1.5 },
    { hour: '20', percent: 1.5 },
    { hour: '21', percent: 1.5 },
    { hour: '22', percent: 2.5 },
    { hour: '23', percent: 1 },
  ];

  // Data for average tickets by day of week
  const weeklyData: WeeklyDataPoint[] = [
    { day: 'Sun', tickets: 950 },
    { day: 'Mon', tickets: 3000 },
    { day: 'Tue', tickets: 4000 },
    { day: 'Wed', tickets: 3000 },
    { day: 'Thu', tickets: 2800 },
    { day: 'Fri', tickets: 2200 },
    { day: 'Sat', tickets: 800 },
  ];

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-amber-500 mb-4">JOINAI Support</h1>
      
     
      
    
      
    
      
      {/* Stat cards */}
      <div className="flex mb-6 space-x-2">
        <div className="bg-white p-4 rounded shadow flex-1">
          <div className="text-gray-600 mb-2">Created tickets</div>
          <div className="text-3xl font-bold">3 072</div>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1">
          <div className="text-gray-600 mb-2">Unsolved tickets</div>
          <div className="text-3xl font-bold">2 866</div>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1">
          <div className="text-gray-600 mb-2">Solved tickets</div>
          <div className="text-3xl font-bold">5 511</div>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1">
          <div className="text-gray-600 mb-2">One-touch tickets</div>
          <div className="text-3xl font-bold">3.0%</div>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1">
          <div className="text-gray-600 mb-2">Reopened tickets</div>
          <div className="text-3xl font-bold">5%</div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="flex space-x-4">
        {/* Tickets by hour chart */}
        <div className="bg-white p-4 rounded shadow flex-1">
          <h3 className="text-lg mb-4">Hourly Tickets</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" />
                <YAxis 
                  tickFormatter={(value: number) => `${value}%`}
                  domain={[0, 16]}
                  ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16]}
                />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
                <Bar dataKey="percent" fill="#8BC34A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Tickets by day chart */}
        <div className="bg-white p-4 rounded shadow flex-1">
          <h3 className="text-lg mb-4">Average tickets created by day of week</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis 
                  domain={[0, 6000]}
                  ticks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]}
                  tickFormatter={(value: number) => {
                    if (value === 0) return '0';
                    if (value === 500) return '500';
                    if (value === 1000) return '1K';
                    if (value === 1500) return '1.5K';
                    if (value === 2000) return '2K';
                    if (value === 2500) return '2.5K';
                    if (value === 3000) return '3K';
                    if (value === 3500) return '3.5K';
                    if (value === 4000) return '4K';
                    if (value === 4500) return '4.5K';
                    if (value === 5000) return '5K';
                    if (value === 5500) return '5.5K';
                    if (value === 6000) return '6K';
                    return value.toString();
                  }}
                />
                <Tooltip formatter={(value: number) => [value, 'Tickets']} />
                <Bar dataKey="tickets" fill="#00695C" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}