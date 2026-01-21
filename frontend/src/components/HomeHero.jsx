import { Link } from "react-router-dom";
import heroImage from "../assets/fitness.jpg";

export default function HomeHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50">

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Text */}
        <div>
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
             Train smarter.<br />
            <span className="text-blue-600">Perform better.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            AI-powered fitness guidance designed for athletes to improve
            performance, prevent injuries, and track progress.
          </p>

          <Link
            to="/fitness"
            className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform"

          >
            Generate Your Plan
          </Link>
        </div>

        {/* Image */}
        <div>
          <img
            src={heroImage}
            alt="Athlete"
            className="rounded-3xl shadow-xl ring-1 ring-gray-200"
          />
        </div>

      </div>
    </section>
  );
}
