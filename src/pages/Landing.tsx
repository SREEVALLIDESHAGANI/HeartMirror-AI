import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Brain, Sparkles, Zap } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import NeonButton from '../components/NeonButton'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto text-center">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan font-medium">
              OCR + Gemini AI Powered Conversation Analysis
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-5 neon-text">
            HeartMirror
            <span className="text-neon-cyan"> AI</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Upload a chat screenshot and let OCR with Gemini AI analyze
            communication patterns, emotional tone, relationship dynamics,
            sentiment, and generate meaningful conversation insights.
          </p>

        </motion.div>

        {/* Feature Cards */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >

          <GlassCard className="text-left">

            <Brain className="w-8 h-8 text-neon-cyan mb-4" />

            <h3 className="text-xl font-semibold mb-3">
              Intelligent Analysis
            </h3>

            <p className="text-gray-400 text-sm leading-6">
              Extracts conversation text using OCR and performs
              AI-driven relationship analysis using Gemini.
            </p>

          </GlassCard>

          <GlassCard className="text-left">

            <Zap className="w-8 h-8 text-neon-cyan mb-4" />

            <h3 className="text-xl font-semibold mb-3">
              Instant Insights
            </h3>

            <p className="text-gray-400 text-sm leading-6">
              Generates relationship scores, sentiment,
              communication style, and conversation summaries
              within seconds.
            </p>

          </GlassCard>

          <GlassCard className="text-left">

            <Sparkles className="w-8 h-8 text-neon-cyan mb-4" />

            <h3 className="text-xl font-semibold mb-3">
              Behavioral Patterns
            </h3>

            <p className="text-gray-400 text-sm leading-6">
              Detects communication trends,
              relationship signals,
              red flags,
              and positive indicators.
            </p>

          </GlassCard>

        </motion.div>

        {/* Button */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >

          <NeonButton
            onClick={() => navigate('/upload')}
            className="text-lg px-12 py-6"
          >
            Analyze Screenshot
          </NeonButton>

        </motion.div>

        {/* Feature Chips */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >

          <div className="glass px-5 py-2 rounded-full text-sm">
            Relationship Score
          </div>

          <div className="glass px-5 py-2 rounded-full text-sm">
            Sentiment Analysis
          </div>

          <div className="glass px-5 py-2 rounded-full text-sm">
            Communication Style
          </div>

          <div className="glass px-5 py-2 rounded-full text-sm">
            AI Summary
          </div>

          <div className="glass px-5 py-2 rounded-full text-sm">
            Red & Green Flags
          </div>

        </motion.div>

        {/* Technology Stack */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >

          <div className="text-center">
            <div className="text-3xl font-bold text-neon-cyan mb-2">
              OCR
            </div>
            <div className="text-sm text-gray-500">
              Text Extraction
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-neon-cyan mb-2">
              Gemini
            </div>
            <div className="text-sm text-gray-500">
              AI Analysis
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-neon-cyan mb-2">
              JSON
            </div>
            <div className="text-sm text-gray-500">
              Structured Output
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-neon-cyan mb-2">
              FastAPI
            </div>
            <div className="text-sm text-gray-500">
              Backend Service
            </div>
          </div>

        </motion.div>

      </div>
      <motion.footer
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
  className="mt-20 pt-8 border-t border-white/10 text-center"
>
  <p className="text-gray-500 text-sm">
    HeartMirror AI © 2026
  </p>

  <p className="text-gray-600 text-xs mt-2">
    OCR-powered conversation analysis using Google Gemini AI.
  </p>
</motion.footer>
    </div>
  )
}

export default Landing