import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import RecentPlans from "../components/RecentPlans";
import SportPieChart from "../components/SportPieChart";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_plans: 0,
    weekly_activity: [],
    sports: {}
  });

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await api.get("/progress/analytics");
        const data = res.data;

        // ✅ FIX weekly activity → always 7 days
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const weekly_activity = days.map(
          (day) => data.weekly_activity?.[day] || 0
        );

        // ✅ FIX recent plans keys
        const recentPlans = (data.recent || []).map((plan) => ({
          id: plan._id,
          sport: plan.sport || plan.sport_type || "Unknown sport",
          goal: plan.goal || plan.fitness_goal || "Unknown goal",
          created_at: plan.created_at
        }));

        setStats({
          total_plans: data.total_plans || 0,
          weekly_activity,
          sports: data.sports || {}
        });

        setPlans(recentPlans);
      } catch (err) {
        console.log("Analytics error:", err);
      }
    }

    loadAnalytics();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-semibold mb-6 text-gray-600">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Plans Generated"
          value={stats.total_plans}
          subtitle="All time"
        />

        <SummaryCard
          title="Active Days"
          value={stats.weekly_activity.filter((x) => x > 0).length}
          subtitle="Last 7 days"
        />

        <SummaryCard
          title="Sports Used"
          value={Object.keys(stats.sports).length}
          subtitle="Different sports"
        />
      </div>

      {/* Charts + Recent Plans */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* Sport Distribution */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="text-lg font-medium mb-3 text-gray-700">
            Sports Distribution
          </h3>
          <SportPieChart sports={stats.sports} />
        </div>

        {/* Recent Plans */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="text-lg font-medium mb-3 text-gray-700">
            Recent Plans
          </h3>
          <RecentPlans plans={plans} />
        </div>

      </div>
    </div>
  );
}
