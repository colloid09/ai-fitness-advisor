import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative">
      <img
        src="https://source.unsplash.com/featured/?fitness,workout"
        className="w-full h-[70vh] object-cover brightness-50"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl text-gray-300 font-bold mb-4">
          Unlock Your Athletic Potential
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Personalized training plans tailored for your sport and performance goals.
        </p>
        <Link
          to="/fitness"
          className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-semibold transition"
        >
          Generate Your Plan
        </Link>
      </div>
    </div>
  );
}
