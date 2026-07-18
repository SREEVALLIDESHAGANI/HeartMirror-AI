import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useCallback } from 'react'
import {
  Upload as UploadIcon,
  ArrowLeft,
  Image as ImageIcon,
} from 'lucide-react'

import GlassCard from '../components/GlassCard'
import NeonButton from '../components/NeonButton'

const Upload = () => {
  const navigate = useNavigate()

  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]

    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file)
    }
  }, [])

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (file) {
      setUploadedFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) return

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const response = await fetch(
        "https://heartmirror-ai.onrender.com/analyze",
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      localStorage.setItem(
        'analysis_result',
        JSON.stringify(data)
      )

      navigate('/results')
    } catch (error) {
      console.error(error)
      alert('Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear"
          }}
          className="w-24 h-24 mx-auto mb-10 rounded-full border-4 border-cyan-500/20 border-t-cyan-400"
        />

        <h1 className="text-5xl font-bold neon-text mb-3">
          HeartMirror AI
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          Analyzing your conversation...
        </p>

        <div className="space-y-4 text-left">

          <div className="glass rounded-xl p-4 border border-white/10">
            <p className="font-medium text-white">
              ✓ Upload received
            </p>
          </div>

          <div className="glass rounded-xl p-4 border border-white/10">
            <p className="font-medium text-white">
              ✓ Extracting conversation text
            </p>
          </div>

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              repeat: Infinity,
              duration: 1.2
            }}
            className="glass rounded-xl p-4 border border-cyan-500/30"
          >
            <p className="font-medium text-cyan-400">
              Processing conversation with Gemini AI...
            </p>
          </motion.div>

          <div className="glass rounded-xl p-4 opacity-60 border border-white/10">
            <p>Generating relationship insights</p>
          </div>

          <div className="glass rounded-xl p-4 opacity-40 border border-white/10">
            <p>Preparing final report</p>
          </div>

        </div>

        <div className="mt-10 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: "95%" }}
            transition={{
              duration: 5,
              ease: "easeInOut"
            }}
          />
        </div>

        <p className="text-gray-500 mt-5 text-sm">
          This usually takes a few seconds depending on the conversation length.
        </p>

      </div>
    </div>
  )
}

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto w-full">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <NeonButton
            variant="secondary"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeonButton>
        </motion.div>

        <GlassCard className="max-w-2xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <h2 className="text-4xl font-bold mb-2 neon-text">
              Upload Screenshot
            </h2>

            <p className="text-gray-400 mb-8">
              Upload your conversation screenshot for AI analysis
            </p>

            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-neon-cyan bg-neon-cyan/10'
                  : 'border-white/20 hover:border-neon-cyan/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <ImageIcon className="w-16 h-16 text-neon-cyan mx-auto" />

                  <div className="text-lg font-medium">
                    {uploadedFile.name}
                  </div>

                  <div className="text-sm text-gray-400">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">

                  <UploadIcon className="w-16 h-16 text-neon-cyan mx-auto" />

                  <div className="text-lg font-medium">
                    Drag & Drop your screenshot here
                  </div>

                  <div className="text-gray-400">
                    or
                  </div>

                  <label className="cursor-pointer">
                    <span className="text-neon-cyan hover:text-neon-cyan/80">
                      Browse Files
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>

                </div>
              )}
            </div>

            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8"
              >
                <NeonButton
                  onClick={handleAnalyze}
                  className="w-full"
                  disabled={loading}
                >
                  {loading
                    ? '🤖 Analyzing...'
                    : 'Analyze Screenshot'}
                </NeonButton>
              </motion.div>
            )}

          </motion.div>

        </GlassCard>

      </div>
    </div>
  )
}

export default Upload