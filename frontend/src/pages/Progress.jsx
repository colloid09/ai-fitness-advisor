import { useEffect, useState } from "react";
import api from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from "recharts";

export default function Progress() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [goals, setGoals] = useState([]);
  const [calorieLogs, setCalorieLogs] = useState([]);
  const [calories, setCalories] = useState("");

  const colors = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

  useEffect(() => {
    fetchProgress();
    fetchCalories();
  }, []);

  async function fetchProgress() {
    try {
      const res = await api.get("/progress/analytics");
      console.log("ANALYTICS:", res.data);

      // ✅ Weekly workouts (LineChart)
      const weekly =
        res.data?.weekly && Object.keys(res.data.weekly).length > 0
          ? Object.entries(res.data.weekly).map(([day, workouts]) => ({
              day,
              workouts
            }))
          : [
              { day: "Mon", workouts: 1 },
              { day: "Tue", workouts: 2 },
              { day: "Wed", workouts: 1 },
              { day: "Thu", workouts: 3 },
              { day: "Fri", workouts: 2 }
            ];

      // ✅ Goals (PieChart)
      const goalsData =
        res.data?.goals && Object.keys(res.data.goals).length > 0
          ? Object.entries(res.data.goals).map(([name, value]) => ({
              name,
              value
            }))
          : [
              { name: "Strength", value: 40 },
              { name: "Endurance", value: 30 },
              { name: "Flexibility", value: 20 },
              { name: "Speed", value: 10 }
            ];

      setWeeklyData(weekly);
      setGoals(goalsData);
    } catch (err) {
      console.error("Progress fetch failed", err);
    }
  }

  async function fetchCalories() {
    try {
      const res = await api.get("/progress/calories");
      console.log("CALORIES:", res.data);

      setCalorieLogs(
        res.data && res.data.length > 0
          ? res.data
          : [
              { date: "2026-01-10", calories_burned: 350 },
              { date: "2026-01-11", calories_burned: 420 },
              { date: "2026-01-12", calories_burned: 390 }
            ]
      );
    } catch (err) {
      console.error("Calories fetch failed", err);
    }
  }

  async function saveCalories() {
    if (!calories) return;

    await api.post("/progress/log-calories", {
      date: new Date().toISOString().slice(0, 10),
      calories_burned: Number(calories)
    });

    setCalories("");
    fetchCalories();
  }

  const renderLabel = ({ name, percent }) =>
    `${name} ${(percent * 100).toFixed(0)}%`;

  const avgCalories =
    calorieLogs.reduce((a, b) => a + b.calories_burned, 0) /
    (calorieLogs.length || 1);

  const dates = calorieLogs.map(l => l.date);
  const uniqueDates = [...new Set(dates)].sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < uniqueDates.length; i++) {
    const today = new Date(uniqueDates[i]);
    const prev = new Date(uniqueDates[i - 1]);

    if (i === 0 || (today - prev) / (1000 * 60 * 60 * 24) === 1) {
      tempStreak++;
    } else {
      tempStreak = 1;
    }

    longestStreak = Math.max(longestStreak, tempStreak);
  }

  const lastDate = uniqueDates[uniqueDates.length - 1];
  if (lastDate === new Date().toISOString().slice(0, 10)) {
    currentStreak = tempStreak;
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <h2 className="text-3xl font-bold mb-10">📊 Athlete Progress Dashboard</h2>

      {/* Log Calories */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h3 className="text-lg font-semibold mb-4">
          🔥 Log Today’s Burned Calories
        </h3>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Calories burned today"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="border p-3 rounded w-full"
          />
          <button
            onClick={saveCalories}
            className="bg-blue-600 text-white px-6 rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h3 className="text-lg font-semibold mb-4">
          📅 Weekly Workout Activity
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line dataKey="workouts" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Calories Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h3 className="text-lg font-semibold mb-4">
          🔥 Calorie Burn Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={calorieLogs}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories_burned" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Goal Distribution */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h3 className="text-lg font-semibold mb-4">
          🎯 Training Goal Distribution
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={goals}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label={renderLabel}
            >
              {goals.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insights */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">🧠 AI Progress Insights</h3>
        <p>Average daily calories burned: {avgCalories.toFixed(0)} kcal</p>
        <p>
          Training consistency:{" "}
          {calorieLogs.length >= 5 ? "Excellent" : "Needs improvement"}
        </p>
        <p>
          Performance trend:{" "}
          {avgCalories > 400 ? "Improving" : "Moderate"}
        </p>
      </div>

      {/* Streaks */}
      <div className="bg-white p-6 rounded-xl shadow mt-10">
        <h3 className="text-lg font-semibold mb-4">
          🏅 Consistency & Discipline
        </h3>

        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">{currentStreak}</p>
            <p className="text-gray-500">Current Streak</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-green-600">{longestStreak}</p>
            <p className="text-gray-500">Longest Streak</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-purple-600">
              {Math.min((uniqueDates.length / 7) * 100, 100).toFixed(0)}%
            </p>
            <p className="text-gray-500">Weekly Consistency</p>
          </div>
        </div>
      </div>
    </div>
  );
}
