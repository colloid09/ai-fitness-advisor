import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyAreaChart({ data }) {
  const formattedData = data.map((value, index) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
    load: value,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="load"
            stroke="#2563eb"
            fill="#93c5fd"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
