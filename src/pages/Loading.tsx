import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Brain, Cpu, Database, Zap } from 'lucide-react'

const Loading = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const file = location.state?.file

  const [progress, setProgress] = useState(10)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: Brain, text: 'Initializing AI Model' },
    { icon: Cpu, text: 'Extracting Chat Text' },
    { icon: Database, text: 'Analyzing Conversation' },
    { icon: Zap, text: 'Generating Insights' }
  ]

  useEffect(() => {
    if (!file) {
      navigate('/upload')
      return
    }

    const analyzeImage = async () => {
      try {
        const formData = new FormData()
        formData.append('file', file)

        setProgress(25)

        const response = await fetch(
          'http://localhost:8000/analyze',
          {
            method: 'POST',
            body: formData
          }
        )

        setProgress(75)
      if (!response.ok) {
        const err = await response.text()
        console.error(err)
        throw new Error(err)
      }

const result = await response.json()
console.log("BACKEND RESULT:", result)
navigate('/results', {
  state: result
})
console.log("NAVIGATING TO RESULTS")
       

        setProgress(100)

        setTimeout(() => {
          navigate('/results', {
            state: result
          })
        }, 1000)

      } catch (error) {
        console.error(error)
        alert('Analysis Failed')
        navigate('/upload')
      }
    }

    analyzeImage()
  }, [file, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  const CurrentIcon = steps[currentStep].icon

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">

        <div className="relative w-32 h-32 mx-auto mb-8">

          <motion.div
            className="absolute inset-0 rounded-full border-4 border-cyan-500/30"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          <motion.div
            className="absolute inset-2 rounded-full border-4 border-cyan-500/60"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <CurrentIcon className="w-12 h-12 text-cyan-400" />
          </div>

        </div>

        <h2 className="text-3xl font-bold mb-4">
          {steps[currentStep].text}
        </h2>

        <p className="text-gray-400 mb-8">
          AI is analyzing your conversation...
        </p>

        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan-500"
            animate={{
              width: `${progress}%`
            }}
          />
        </div>

        <div className="mt-4 text-cyan-400 text-xl">
          {progress}%
        </div>

      </div>
    </div>
  )
}

export default Loading