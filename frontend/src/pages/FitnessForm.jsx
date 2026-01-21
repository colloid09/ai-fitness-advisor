import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function FitnessForm() {
  const [data, setData] = useState({
    age: "",
    weight: "",
    height: "",
    sport: "",
    goal: "",
    gender: "",
    injury: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function validate() {
    if (data.age < 5) return "Age must be at least 5 years";
    if (!data.weight || data.weight <= 10) return "Weight must be greater than 10 kg";
    if (!data.height || data.height <= 50) return "Height must be greater than 50 cm";
    if (!data.goal.trim()) return "Goal is required";
    if (!data.sport.trim()) return "Sport is required";
    if (!data.gender) return "Please select gender";
    return "";
  }

  async function submit() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/fitness/recommend", data);

      navigate("/result", {
        state: {
          fitness_plan: res.data?.fitness_plan || "",
          form_data: data,
          created_at: new Date().toISOString(),
        },
      });
    } catch (err) {
      alert("Failed to generate plan");
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <LoadingScreen text="Generating your personalized fitness plan..." />
      )}

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-8 text-gray-300">
          Generate My Plan
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            className="p-3 rounded bg-gray-300"
          />

          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            onChange={handleChange}
            className="p-3 rounded bg-gray-300"
          />

          <input
            name="height"
            type="number"
            placeholder="Height (cm)"
            onChange={handleChange}
            className="p-3 rounded bg-gray-300"
          />

          <select
            name="gender"
            onChange={handleChange}
            className="p-3 rounded bg-gray-300"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            name="sport"
            placeholder="Sport"
            onChange={handleChange}
            className="p-3 rounded bg-gray-300"
          />

          <input
            name="goal"
            placeholder="Goal"
            onChange={handleChange}
            className="p-3 rounded bg-gray-300"
          />

          <input
            name="injury"
            placeholder="Injury (optional)"
            onChange={handleChange}
            className="p-3 rounded bg-gray-300 md:col-span-2"
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="mt-10 w-full px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-semibold"
        >
          Generate Plan
        </button>
      </div>
    </>
  );
}
