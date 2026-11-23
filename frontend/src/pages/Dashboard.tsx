
import {
  ScanSearch,
  CheckCircle,
  AlertTriangle,
  Percent,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import StatCard from "../components/StatCard";

const inspectionData = [
  { day: "Mon", inspections: 45 },
  { day: "Tue", inspections: 62 },
  { day: "Wed", inspections: 55 },
  { day: "Thu", inspections: 78 },
  { day: "Fri", inspections: 90 },
  { day: "Sat", inspections: 65 },
  { day: "Sun", inspections: 40 },
];

const recentInspections = [
  {
    id: "INS-1001",
    product: "Metal Sheet A",
    defects: 2,
    status: "Failed",
    date: "19 Nov 2026",
  },
  {
    id: "INS-1002",
    product: "Metal Sheet B",
    defects: 0,
    status: "Passed",
    date: "19 Nov 2026",
  },
  {
    id: "INS-1003",
    product: "Metal Sheet C",
    defects: 1,
    status: "Review",
    date: "18 Nov 2026",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Page heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Monitor your product quality inspections.
          </p>
        </div>

        <span className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
          AI Inspection System
        </span>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Inspections"
          value="1,250"
          description="All recorded inspections"
          icon={ScanSearch}
        />

        <StatCard
          title="Passed Products"
          value="1,040"
          description="83.2% of inspected products"
          icon={CheckCircle}
        />

        <StatCard
          title="Defective Products"
          value="210"
          description="Require quality review"
          icon={AlertTriangle}
        />

        <StatCard
          title="Defect Rate"
          value="16.8%"
          description="Across inspected products"
          icon={Percent}
        />

      </div>

      {/* Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">

        <h2 className="text-lg font-semibold text-slate-900">
          Inspection Overview
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Number of inspections per day
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={inspectionData}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="day" />
              <YAxis />

              <Tooltip />

              <Bar
                dataKey="inspections"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Recent inspections */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Recent Inspections
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            <thead className="text-slate-500 border-b">
              <tr>
                <th className="py-3">Inspection ID</th>
                <th>Product</th>
                <th>Defects</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {recentInspections.map((item) => (
                <tr key={item.id} className="border-b last:border-0">

                  <td className="py-4 font-medium">
                    {item.id}
                  </td>

                  <td>{item.product}</td>

                  <td>{item.defects}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Passed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.date}</td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}
