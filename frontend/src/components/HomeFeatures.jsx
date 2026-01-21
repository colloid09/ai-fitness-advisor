function FeatureCard({ title, desc }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}

export default function HomeFeatures() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-10 text-center">
        Everything an Athlete Needs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="AI Training Plans"
          desc="Personalized workouts based on your sport, body, and goals."
        />
        <FeatureCard
          title="Progress Analytics"
          desc="Track weekly training load, calories, and performance trends."
        />
        <FeatureCard
          title="Injury Prevention"
          desc="Smart recommendations to avoid overtraining and injuries."
        />
      </div>
    </section>
  );
}
