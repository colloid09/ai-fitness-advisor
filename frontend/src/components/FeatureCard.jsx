export default function FeatureCard({ title, desc, img }) {
  return (
    <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:translate-y-[-4px] transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
