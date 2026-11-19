import { AlertTriangle, CheckCircle2, ClipboardCheck, Plus, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Link } from 'react-router-dom'
import { StatCard } from '../components/StatCard'

const volume = [
  { name: 'Mon', value: 118 }, { name: 'Tue', value: 132 }, { name: 'Wed', value: 126 },
  { name: 'Thu', value: 168 }, { name: 'Fri', value: 151 }, { name: 'Sat', value: 188 }, { name: 'Sun', value: 177 },
]
const defects = [
  { name: 'Scratch', value: 38, color: '#4f46e5' }, { name: 'Pitting', value: 27, color: '#8b5cf6' },
  { name: 'Corrosion', value: 21, color: '#fb923c' }, { name: 'Crack', value: 14, color: '#ef4444' },
]
const inspections = [
  { id: '#INSP-2847', product: 'Bearing Housing', line: 'Line A', status: 'Passed', defects: 0, time: '10:42 AM' },
  { id: '#INSP-2846', product: 'Valve Body', line: 'Line C', status: 'Failed', defects: 3, time: '10:28 AM' },
  { id: '#INSP-2845', product: 'Drive Shaft', line: 'Line B', status: 'Review', defects: 2, time: '10:15 AM' },
  { id: '#INSP-2844', product: 'Pump Cover', line: 'Line A', status: 'Passed', defects: 0, time: '09:58 AM' },
]

export default function Dashboard() {
  return (
    <>
      <div className="page-heading">
        <div><p className="eyebrow">OVERVIEW</p><h1>Dashboard</h1></div>
        <Link className="primary-button" to="/new-inspection"><Plus size={18} /> New Inspection</Link>
      </div>
      <div className="stats-grid">
        <StatCard title="Total Inspections" value="1,284" change="+12.5% vs last week" icon={ClipboardCheck} tone="blue" />
        <StatCard title="Pass Rate" value="94.8%" change="+2.1% vs last week" icon={CheckCircle2} tone="green" />
        <StatCard title="Defects Found" value="67" change="-8.3% vs last week" icon={AlertTriangle} tone="orange" />
        <StatCard title="Avg. Confidence" value="98.2%" change="+1.4% vs last week" icon={TrendingUp} tone="violet" />
      </div>
      <div className="charts-grid">
        <section className="panel volume-panel">
          <div className="panel-heading"><div><h2>Inspection Volume</h2><p>Last 7 days</p></div><button>7 days⌄</button></div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volume} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <defs><linearGradient id="volumeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.18}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8b93a7', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b93a7', fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fill="url(#volumeFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="panel defect-panel">
          <div className="panel-heading"><div><h2>Defect Distribution</h2><p>This week</p></div></div>
          <div className="donut-layout">
            <div className="donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={defects} dataKey="value" innerRadius={55} outerRadius={78} paddingAngle={3} stroke="none">{defects.map((d) => <Cell key={d.name} fill={d.color}/>)}</Pie></PieChart></ResponsiveContainer><div className="donut-center"><strong>67</strong><span>defects</span></div></div>
            <div className="legend">{defects.map(d => <div key={d.name}><span><i style={{background:d.color}} />{d.name}</span><strong>{d.value}%</strong></div>)}</div>
          </div>
        </section>
      </div>
      <section className="panel recent-panel">
        <div className="panel-heading"><div><h2>Recent Inspections</h2><p>Latest activity across all production lines</p></div><Link to="/inspections">View all <span>→</span></Link></div>
        <div className="table-wrap"><table><thead><tr><th>Inspection ID</th><th>Product</th><th>Line</th><th>Defects</th><th>Status</th><th>Time</th></tr></thead><tbody>{inspections.map(row => <tr key={row.id}><td><strong>{row.id}</strong></td><td>{row.product}</td><td>{row.line}</td><td>{row.defects}</td><td><span className={`status ${row.status.toLowerCase()}`}><i />{row.status}</span></td><td>{row.time}</td></tr>)}</tbody></table></div>
      </section>
    </>
  )
}
