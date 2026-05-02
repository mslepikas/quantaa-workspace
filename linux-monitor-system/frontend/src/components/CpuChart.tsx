import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { Activity } from 'lucide-react'

export const CpuChart: React.FC = () => {
  const cpuData = [
    { cpu: 0, percent: 45 },
    { cpu: 1, percent: 32 },
    { cpu: 2, percent: 67 },
    { cpu: 3, percent: 54 },
  ]

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">CPU Usage</h2>
        <Activity className="h-5 w-5 text-primary" />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={cpuData}>
          <XAxis dataKey="cpu" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="percent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
