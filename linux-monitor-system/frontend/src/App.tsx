import { useEffect, useMemo, useState } from 'react'

type SystemInfo = {
  hostname: string
  uptime_seconds: number
  load_1: number
}

type CpuInfo = {
  cpu: Array<{ cpu: number; percent: number }>
  total_percent: number
}

type MemoryInfo = {
  total: number
  used: number
  available: number
  percent: number
}

type DiskInfo = {
  disks: Array<{ mountpoint: string; used: number; total: number; percent: number }>
}

type NetworkInfo = {
  interfaces: Array<{ name: string; ipv4?: string | null; bytes_sent: number; bytes_recv: number; is_up?: boolean | null }>
}

type GpuInfo = {
  gpus?: Array<{ name: string; utilization?: number | null; temperature?: number | null }>
  count: number
  error?: string
}

type TemperatureInfo = {
  sensors?: Record<string, number>
}

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return `${h}h ${m}m`
}

function cToF(tempC: number) {
  return (tempC * 9) / 5 + 32
}

function Gauge({ label, value, accent, suffix = '%', displayValue }: { label: string; value: number; accent: string; suffix?: string; displayValue?: string }) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = 42
  const circumference = Math.PI * radius
  const dashOffset = circumference - (clamped / 100) * circumference

  return (
    <div className="rounded-2xl border border-orange-500/30 bg-zinc-950/90 p-3 shadow-[0_0_24px_rgba(0,0,0,0.35)]">
      <div className="mb-2 text-base font-semibold uppercase tracking-[0.14em] text-orange-300/90">{label}</div>
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 112 72" className="h-[104px] w-full">
          <path d="M 14 58 A 42 42 0 0 1 98 58" fill="none" stroke="#27272a" strokeWidth="10" strokeLinecap="round" />
          <path
            d="M 14 58 A 42 42 0 0 1 98 58"
            fill="none"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
          <text x="56" y="52" textAnchor="middle" className="fill-orange-50 text-[30px] font-bold">{displayValue ?? `${clamped.toFixed(0)}${suffix}`}</text>
        </svg>
      </div>
    </div>
  )
}

function Trend({ label, data, accent }: { label: string; data: number[]; accent: string }) {
  const width = 280
  const height = 68
  const points = useMemo(() => {
    const values = data.length ? data : [0]
    const max = Math.max(100, ...values)
    return values
      .map((v, i) => {
        const x = (i / Math.max(values.length - 1, 1)) * width
        const y = height - (v / max) * (height - 10) - 5
        return `${x},${y}`
      })
      .join(' ')
  }, [data])

  return (
    <div className="rounded-2xl border border-orange-500/30 bg-zinc-950/90 p-3">
      <div className="mb-2 text-base font-semibold uppercase tracking-[0.14em] text-orange-300/90">{label}</div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[72px] w-full rounded-xl bg-black/40">
        <polyline fill="none" stroke={accent} strokeWidth="3" points={points} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-orange-500/25 bg-black/40 px-3 py-2">
      <div className="text-base uppercase tracking-[0.14em] text-orange-300/90">{label}</div>
      <div className="mt-1 text-[30px] font-semibold leading-none text-orange-50">{value}</div>
    </div>
  )
}

export default function App() {
  const [system, setSystem] = useState<SystemInfo | null>(null)
  const [cpu, setCpu] = useState<CpuInfo | null>(null)
  const [memory, setMemory] = useState<MemoryInfo | null>(null)
  const [disk, setDisk] = useState<DiskInfo | null>(null)
  const [network, setNetwork] = useState<NetworkInfo | null>(null)
  const [gpu, setGpu] = useState<GpuInfo | null>(null)
  const [temp, setTemp] = useState<TemperatureInfo | null>(null)
  const [cpuHistory, setCpuHistory] = useState<number[]>([])
  const [memHistory, setMemHistory] = useState<number[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        const [s, c, m, d, n, g, t] = await Promise.all([
          fetch('/api/system').then(r => r.json()),
          fetch('/api/cpu').then(r => r.json()),
          fetch('/api/memory').then(r => r.json()),
          fetch('/api/disk').then(r => r.json()),
          fetch('/api/network').then(r => r.json()),
          fetch('/api/gpu').then(r => r.json()),
          fetch('/api/temperature').then(r => r.json()),
        ])
        if (!mounted) return
        setSystem(s)
        setCpu(c)
        setMemory(m)
        setDisk(d)
        setNetwork(n)
        setGpu(g)
        setTemp(t)
        setCpuHistory(prev => [...prev.slice(-39), c.total_percent ?? 0])
        setMemHistory(prev => [...prev.slice(-39), m.percent ?? 0])
        setError('')
      } catch {
        if (mounted) setError('Live metrics unavailable')
      }
    }

    load()
    const timer = setInterval(load, 2000)
    return () => {
      mounted = false
      clearInterval(timer)
    }
  }, [])

  const primaryDisk = disk?.disks.find(d => d.mountpoint === '/') ?? disk?.disks[0]
  const primaryNet = network?.interfaces.find(i => i.name !== 'lo' && i.is_up) ?? network?.interfaces.find(i => i.name !== 'lo')
  const primaryGpu = gpu?.gpus?.[0]
  const maxTemp = temp?.sensors ? Math.max(...Object.values(temp.sensors)) : 0
  const boardTempF = maxTemp ? cToF(maxTemp) : primaryGpu?.temperature != null ? cToF(primaryGpu.temperature) : 0

  return (
    <div className="min-h-screen overflow-hidden bg-black text-orange-50">
      <div className="mx-auto flex h-screen max-w-[1280px] flex-col gap-3 px-4 py-3">
        <div className="grid grid-cols-[1.4fr_1fr] gap-3">
          <div className="rounded-2xl border border-orange-500/30 bg-[linear-gradient(135deg,rgba(20,20,20,0.96),rgba(10,10,10,0.94))] px-4 py-3 shadow-[0_0_40px_rgba(249,115,22,0.09)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-base font-semibold uppercase tracking-[0.14em] text-orange-400">Linux Monitor</div>
                <div className="mt-1 text-[30px] font-bold leading-none text-orange-50">{system ? system.hostname : 'Connecting...'}</div>
              </div>
              <div className="text-right text-base text-orange-200/85">
                <div>1280 × 400 rack view</div>
                <div className="mt-1 text-base text-orange-300/70">{error || 'Live metrics OK'}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Stat label="Uptime" value={system ? formatUptime(system.uptime_seconds) : '...'} />
            <Stat label="Load" value={system ? system.load_1.toFixed(2) : '...'} />
            <Stat label="Disk" value={primaryDisk ? `${primaryDisk.percent.toFixed(0)}%` : '...'} />
          </div>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_1fr_1fr_1fr_1.55fr] gap-3 overflow-hidden">
          <Gauge label="CPU" value={cpu?.total_percent ?? 0} accent="#f97316" />
          <Gauge label="RAM" value={memory?.percent ?? 0} accent="#fb923c" />
          <Gauge label="GPU TEMP" value={Math.min(Math.max((((primaryGpu?.temperature != null ? cToF(primaryGpu.temperature) : 0) - 70) / 110) * 100, 0), 100)} accent="#fdba74" displayValue={primaryGpu?.temperature != null ? `${cToF(primaryGpu.temperature).toFixed(0)}°F` : '--'} />
          <Gauge label="GB10 TEMP" value={Math.min(Math.max(((boardTempF - 70) / 110) * 100, 0), 100)} accent="#f59e0b" displayValue={boardTempF ? `${boardTempF.toFixed(0)}°F` : '--'} />

          <div className="grid grid-rows-[1fr_1fr] gap-3 overflow-hidden">
            <Trend label="CPU Trend" data={cpuHistory} accent="#f97316" />
            <Trend label="Memory Trend" data={memHistory} accent="#fb923c" />
          </div>
        </div>

        <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-3">
          <div className="rounded-2xl border border-orange-500/30 bg-zinc-950/90 px-4 py-3">
            <div className="text-base font-semibold uppercase tracking-[0.14em] text-orange-300/90">Network</div>
            <div className="mt-2 text-[30px] font-semibold leading-none text-orange-50">{primaryNet?.name || 'No link'}</div>
            <div className="mt-1 text-base text-orange-200/75">{primaryNet?.ipv4 || 'No IPv4 address'}</div>
            <div className="mt-2 text-base text-orange-100/80">TX {primaryNet ? primaryNet.bytes_sent.toFixed(0) : '...'} MB, RX {primaryNet ? primaryNet.bytes_recv.toFixed(0) : '...'} MB</div>
          </div>

          <Stat label="RAM Used" value={memory ? `${memory.used.toFixed(1)}G` : '...'} />
          <Stat label="GPU Load" value={primaryGpu?.utilization != null ? `${primaryGpu.utilization.toFixed(0)}%` : '--'} />
          <Stat label="GPU Name" value={primaryGpu?.name ? primaryGpu.name.slice(0, 12) : 'No GPU'} />
        </div>
      </div>
    </div>
  )
}
