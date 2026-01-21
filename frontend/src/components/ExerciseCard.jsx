import { getExerciseImage } from "../utils/exerciseImages";

export default function ExerciseCard({ exercise }) {
  if (!exercise) return null;

  const image = getExerciseImage(exercise.name);

  return (
    <div className="bg-white rounded-2xl p-4 shadow border hover:shadow-lg transition">
      <img
        src={image}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        alt={exercise.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200?text=Exercise";
        }}
        className="w-full h-48 object-contain rounded-lg bg-gray-50"
      />

      <h3 className="mt-3 font-semibold capitalize">
        {exercise.name}
      </h3>

      <p className="text-sm text-gray-500">
        Target: {exercise.target}
      </p>

      <p className="text-sm text-gray-500">
        Equipment: {exercise.equipment}
      </p>
    </div>
  );
}
