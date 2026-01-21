import axios from "axios";

const exerciseApi = axios.create({
  baseURL: "https://exercisedb.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_EXERCISE_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
});

export async function getExerciseByName(name) {
  try {
    const res = await exerciseApi.get(`/exercises/name/${name}`);
    console.log("Exercise API response:", res.data);
    return res.data?.[0];

  } catch (error) {
    console.error("Exercise API error:", error);
    return null;
  }
}
