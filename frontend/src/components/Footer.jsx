export default function Footer() {
  return (
    <footer className="bg-gray-900/60 border-t border-gray-700 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} AI Fitness Advisor
      </div>
    </footer>
  );
}
