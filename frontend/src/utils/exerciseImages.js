import pushup from "../assets/exercises/push-up.png";
import squat from "../assets/exercises/squat.png";
import plank from "../assets/exercises/plank.png";
import burpee from "../assets/exercises/burpee.png";
import lunge from "../assets/exercises/lunge.png";

export function getExerciseImage(name) {
  if (!name) return pushup;

  const n = name.toLowerCase();

  if (n.includes("push")) return pushup;
  if (n.includes("squat")) return squat;
  if (n.includes("plank")) return plank;
  if (n.includes("burpee")) return burpee;
  if (n.includes("lunge")) return lunge;

  return pushup;
}
