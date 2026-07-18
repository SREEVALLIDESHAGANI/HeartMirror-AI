import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

import GlassCard from '../components/GlassCard'
import NeonButton from '../components/NeonButton'

const Results = () => {
  const navigate = useNavigate()

  const saved = localStorage.getItem("analysis_result")
  const data = saved ? JSON.parse(saved) : null

  console.log("RESULT DATA:", data)

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard>
          <h2 className="text-2xl font-bold mb-4">
            No Analysis Found
          </h2>

          <NeonButton onClick={() => navigate("/upload")}>
            Upload Screenshot
          </NeonButton>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="relative z-10 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">

        <NeonButton
          variant="secondary"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Home
        </NeonButton>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-bold neon-text mb-10"
        >
          HeartMirror Analysis
        </motion.h1>

        {/* SCORE CARDS */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <GlassCard>
            <h3 className="text-xl mb-3">
              Relationship Score
            </h3>

            <div className="text-5xl font-bold text-neon-cyan">
              {data.relationship_score}%
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl mb-3">
              Interest Level
            </h3>

            <div className="text-5xl font-bold text-pink-400">
              {data.interest_level}%
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl mb-3">
              Sentiment
            </h3>

            <div className="text-4xl font-bold">
              {data.sentiment}
            </div>
          </GlassCard>

        </div>

        {/* COMMUNICATION */}

        <GlassCard className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Communication Style
          </h2>

          <p className="text-gray-300 text-lg">
            {data.communication_style}
          </p>
        </GlassCard>

        {/* SUMMARY */}

        <GlassCard className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            AI Summary
          </h2>

          <p className="text-gray-300 text-lg">
            {data.summary}
          </p>
        </GlassCard>

        {/* RED FLAGS */}

        <GlassCard className="mb-8 border border-red-500/30">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-500" />
            <h2 className="text-2xl font-bold">
              Red Flags
            </h2>
          </div>

          {data.red_flags?.length > 0 ? (
            <ul className="space-y-3">
              {data.red_flags.map((flag: string, index: number) => (
                <li key={index}>
                  • {flag}
                </li>
              ))}
            </ul>
          ) : (
            <p>No major red flags detected.</p>
          )}
        </GlassCard>

        {/* GREEN FLAGS */}

        <GlassCard className="mb-8 border border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="text-green-500" />
            <h2 className="text-2xl font-bold">
              Green Flags
            </h2>
          </div>

          {data.green_flags?.length > 0 ? (
            <ul className="space-y-3">
              {data.green_flags.map((flag: string, index: number) => (
                <li key={index}>
                  • {flag}
                </li>
              ))}
            </ul>
          ) : (
            <p>No green flags detected.</p>
          )}
        </GlassCard>

        {/* BUTTON */}

        <div className="text-center mb-8">
          <NeonButton
            onClick={() => navigate("/upload")}
          >
            Analyze Another Chat
          </NeonButton>
        </div>

        {/* DISCLAIMER */}

        <GlassCard className="border border-yellow-400/30 bg-yellow-400/5">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">
            Disclaimer
          </h3>

          <p className="text-gray-300 leading-7">
            HeartMirror AI provides AI-generated insights for informational
            and educational purposes only. The analysis is based solely on
            the uploaded conversation and may not accurately reflect real
            emotions, intentions, or relationship dynamics. Please use the
            results as supportive insights rather than definitive conclusions.
          </p>
        </GlassCard>

      </div>
    </div>
  )
}

export default Results