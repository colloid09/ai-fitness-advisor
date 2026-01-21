import { useLocation, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import api from "../services/api";
import { useState } from "react";

export default function Result() {
  const { state } = useLocation();

  // ✅ Data coming directly from FitnessForm
  const fitnessPlan = state?.fitness_plan || "";
  const formData = state?.form_data || {};
  const createdAt = state?.created_at || new Date().toISOString();

  const [saving, setSaving] = useState(false);

  if (!fitnessPlan) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-gray-300">
        <h2 className="text-3xl font-bold mb-4 text-white">
          No Fitness Plan Found
        </h2>
        <Link
          to="/fitness"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          Generate a New Plan
        </Link>
      </div>
    );
  }

  const metadata = {
    sport: formData.sport || "Unknown Sport",
    goal: formData.goal || "Unknown Goal",
    created_at: createdAt,
  };

  // ==============================
  // SAVE PLAN (NEW - LOGIC ONLY)
  // ==============================
  async function savePlan() {
    try {
      setSaving(true);

      await api.post("/progress/save", {
        fitness_plan: fitnessPlan,
        sport: metadata.sport,
        goal: metadata.goal,
        created_at: metadata.created_at,
      });

      alert("Plan saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save plan");
    } finally {
      setSaving(false);
    }
  }

  // ==============================
  // PDF EXPORT (UNCHANGED)
  // ==============================
  async function exportPDF() {
    const element = document.getElementById("plan-card");
    if (!element) return;

    await new Promise((r) => setTimeout(r, 800));

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Fitness_Plan.pdf");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* PLAN CARD */}
      <div
        id="plan-card"
        className="bg-white rounded-2xl p-6 shadow-lg border"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          Your AI-Generated Fitness Plan
        </h2>

        <p className="text-gray-500 mb-4">
          Based on your body profile, sport, and goal
        </p>

        <p className="text-sm text-gray-500 mb-4">
          {new Date(metadata.created_at).toLocaleString()}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="text-sm text-gray-500">Sport</div>
            <div className="font-semibold">{metadata.sport}</div>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <div className="text-sm text-gray-500">Goal</div>
            <div className="font-semibold">{metadata.goal}</div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{fitnessPlan}</ReactMarkdown>
        </div>
      </div>

      {/* ACTION BUTTONS (UI UNCHANGED) */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={savePlan}
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
        >
          {saving ? "Saving..." : "Save Plan"}
        </button>

        {/* Optional PDF
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          Download PDF
        </button>
        */}

        <Link
          to="/dashboard"
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
