const EXERCISES = [
  "push up",
  "squat",
  "lunge",
  "plank",
  "burpee",
  "pull up",
  "deadlift",
  "bench press",
  "shoulder press",
  "bicep curl",
  "tricep dip",
  "mountain climber",
  "jump squat",
];

export function extractExercises(text) {
  const lower = text.toLowerCase();
  return EXERCISES.filter((ex) => lower.includes(ex));
}
