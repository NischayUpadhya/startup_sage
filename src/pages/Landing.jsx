import { motion } from "framer-motion"

const Landing = ({ setPage }) => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-30 animate-pulse"></div>

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6 relative z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Startup Sage 🚀
        </h1>

        <button 
          onClick={() => setPage("analyze")}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 
          hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/40"
        >
          Get Started
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6 relative z-10">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Validate Before You Build
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 max-w-2xl mb-10 text-lg"
        >
          Startup Sage is an AI-powered startup intelligence engine that
          analyzes market demand, competition strength, risk factors,
          and growth potential in seconds.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => setPage("analyze")}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-4 rounded-xl text-lg font-semibold 
          transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40"
        >
          Analyze My Startup Idea 🚀
        </motion.button>

      </div>

    </div>
  )
}

export default Landing