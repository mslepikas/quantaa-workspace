import { BarChart, Bar, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts'
import { Gauge } from 'lucide-react'

export const MemoryChart: React.FC = () => {
  const memoryData = {
    total: 16,
    used: 8.5,
    available: 6.5,
    percent: 53,
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Memory Usage</h2>
        <Gauge className="h-5 w-5 text-primary" />
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={[
          { name: 'Total', value: memoryData.total, fill: '#9ca3af' },
          { name: 'Used', value: memoryData.used, fill: '#ef4444' },
          { name: 'Available', value: memoryData.available, fill: '#22c55e' },
        ]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
