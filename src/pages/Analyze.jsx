import { useState } from "react"
import { motion } from "framer-motion"

const Analyze = ({ setPage }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [audience, setAudience] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyze = async () => {
    try {
      setLoading(true)

      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, audience })
      })

      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      alert("Error connecting to backend")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* PRODUCT NAME */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          STARTUP SAGE
        </h1>
      </div>

      {/* INPUT SECTION */}
      <div className="max-w-2xl mx-auto bg-slate-900/60 p-6 rounded-xl border border-slate-700">
        <input
          type="text"
          placeholder="Startup Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-slate-800"
        />

        <textarea
          placeholder="Describe your idea..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-slate-800"
        />

        <input
          type="text"
          placeholder="Target Audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-slate-800"
        />

        <button
          onClick={handleAnalyze}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-lg font-semibold"
        >
          {loading ? "Analyzing..." : "Analyze Now 🚀"}
        </button>
      </div>

      {/* DEVELOPED BY */}
      <div className="text-center mt-10 mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Developed by Nischay Upadhya P & Kaushik Raju S
        </h2>
      </div>

      {/* RESULTS */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* MARKET */}
          <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
            <h3 className="text-xl font-bold mb-4 mt-2">Market Potential</h3>

            <div className="text-5xl font-bold text-cyan-400 mb-4">
              {result.marketScore} / 100
            </div>

            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.marketScore}%` }}
                transition={{ duration: 1 }}
                className="h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              />
            </div>
          </div>

          {/* RISK */}
          <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-orange-500"></div>
            <h3 className="text-xl font-bold mb-4 mt-2">Risk Score</h3>

            <div className="text-5xl font-bold text-red-400 mb-4">
              {result.riskScore}
            </div>

            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.riskScore}%` }}
                transition={{ duration: 1 }}
                className="h-3 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"
              />
            </div>
          </div>

          {/* COMPETITION OVERVIEW */}
          <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">📊 Competition Overview</h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <p>
                <span className="font-semibold text-gray-400">
                  Competition Level:
                </span>{" "}
                <span className="text-cyan-400">
                  {result.competitionLevel}
                </span>
              </p>

              <p>
                <span className="font-semibold text-gray-400">
                  Total Ecosystem Strength:
                </span>{" "}
                {result.totalStars} GitHub Stars
              </p>
            </div>

            <p className="mt-4 text-gray-400">
              💡 {result.differentiationAdvice}
            </p>
          </div>

          {/* TOP COMPETITOR */}
          {result.topCompetitor && (
            <div className="md:col-span-2 bg-slate-900/60 p-6 rounded-xl border border-yellow-500">
              <h3 className="text-xl font-bold mb-4">🏆 Top Competitor</h3>

              <h4 className="text-lg font-semibold">
                {result.topCompetitor.name}
              </h4>

              <p className="text-yellow-400 mb-2">
                ⭐ {result.topCompetitor.stars} stars
              </p>

              <p className="text-gray-400 mb-3">
                {result.topCompetitor.description}
              </p>

              <a
                href={result.topCompetitor.website}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          )}

          {/* ADVANCED COMPETITOR CARDS */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-bold">
              🔎 Competitive Intelligence
            </h3>

            {result.competitors.map((comp, i) => (
              <div
                key={i}
                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-400 transition-all"
              >
                <div className="flex justify-between mb-3">
                  <h4 className="font-semibold text-lg">
                    {comp.name}
                  </h4>
                  <span className="text-yellow-400">
                    ⭐ {comp.stars}
                  </span>
                </div>

                <p className="text-gray-400 mb-4">
                  {comp.description}
                </p>

                <div className="grid md:grid-cols-3 gap-4 text-sm">

                  <div>
                    <span className="text-gray-500">
                      Market Position:
                    </span>{" "}
                    <span className="text-cyan-400">
                      {comp.marketPosition}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">
                      Threat Level:
                    </span>{" "}
                    <span
                      className={
                        comp.threatLevel === "High"
                          ? "text-red-400"
                          : comp.threatLevel === "Medium"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }
                    >
                      {comp.threatLevel}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">
                      Opportunity Gap:
                    </span>{" "}
                    <span className="text-purple-400">
                      {comp.gapOpportunity}
                    </span>
                  </div>

                </div>

                <a
                  href={comp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-cyan-400 hover:underline"
                >
                  View Repository →
                </a>
              </div>
            ))}
          </div>

        </motion.div>
      )}

    </div>
  )
}

export default Analyze