import { Link } from "react-router-dom";

export default function RecentPlans({ plans = [] }) {
  if (plans.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        No saved plans yet. Generate one to see it here.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {plans.map((plan, index) => {
        // ✅ Derive a safe title
        const title =
          plan.title ||
          `${plan.sport || "Fitness"} • ${plan.goal || "Plan"}`;

        return (
          <div
            key={index}
            className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
          >
            <div>
              <p className="font-medium text-gray-800">
                {title}
              </p>
              <p className="text-sm text-gray-400">
                {plan.sport || "General"} • {plan.goal || "Training"}
              </p>
            </div>

<Link
  to="/result"
  state={{ planId: plan.id }}
  className="text-sm text-blue-600 hover:underline"
>
  View
</Link>


          </div>
        );
      })}
    </div>
  );
}
