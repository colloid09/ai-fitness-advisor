import { Link } from "react-router-dom";

export default function HomeCTA() {
  return (
    <section className="bg-blue-600">
      <div className="max-w-6xl mx-auto px-6 py-16 text-center text-white">
        <h2 className="text-4xl font-semibold">
          Start your personalized training today
        </h2>

        <Link
          to="/fitness"
          className="inline-block mt-8 px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-medium hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
