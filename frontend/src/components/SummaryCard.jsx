export default function SummaryCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-semibold mt-2 text-gray-800">{value}</h2>
      <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}
