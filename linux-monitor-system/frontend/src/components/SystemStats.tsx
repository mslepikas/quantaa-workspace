export const SystemStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <h2 className="text-sm font-medium text-muted-foreground">Uptime</h2>
        <p className="text-2xl font-bold">42d 14h 23m</p>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <h2 className="text-sm font-medium text-muted-foreground">Load Average</h2>
        <p className="text-2xl font-bold">0.45</p>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <h2 className="text-sm font-medium text-muted-foreground">CPU Cores</h2>
        <p className="text-2xl font-bold">8</p>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <h2 className="text-sm font-medium text-muted-foreground">Memory</h2>
        <p className="text-2xl font-bold">16GB / 16GB</p>
      </div>
    </div>
  )
}
