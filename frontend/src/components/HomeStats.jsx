export default function HomeStats() {
  return (
    <section className="bg-white border-y">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">95%</h2>
          <p className="text-gray-500 mt-1">Training Accuracy</p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-gray-900">7 Days</h2>
          <p className="text-gray-500 mt-1">Weekly Progress Tracking</p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-gray-900">AI-Driven</h2>
          <p className="text-gray-500 mt-1">Personalized Plans</p>
        </div>

      </div>
    </section>
  );
}
