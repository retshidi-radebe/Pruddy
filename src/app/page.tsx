'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Heart, Sparkles, Star } from 'lucide-react'

export default function ValentinesProposal() {
  const [accepted, setAccepted] = useState(false)
  const [yesButtonScale, setYesButtonScale] = useState(1)
  const [showLetter, setShowLetter] = useState(false)
  const [noAttempts, setNoAttempts] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; duration: number; delay: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      const newHearts = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 3,
      }))
      setHearts(newHearts)
    }
  }, [mounted])

  const funnyMessages = [
    "Are you sure?",
    "Really sure?",
    "Think about it...",
    "Please? 🥺",
    "Give it a try!",
    "Don't be shy!",
    "It'll be special!",
    "I promise it'll be beautiful!",
    "Just one click!",
    "You know you want to! 💕",
  ]

  const handleNoClick = () => {
    setYesButtonScale(prev => Math.min(prev + 0.5, 5))
    setNoAttempts(prev => prev + 1)
  }

  const handleYesClick = () => {
    setAccepted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-pink-950/20 dark:via-rose-950/20 dark:to-red-950/20 flex flex-col">
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center px-4 py-12 gap-8"
            ref={containerRef}
          >
            {/* Floating hearts animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {mounted && hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="absolute text-pink-300 dark:text-pink-600/30"
                  initial={{
                    left: `${heart.x}%`,
                    bottom: -50,
                    opacity: 0,
                  }}
                  animate={{
                    bottom: '100%',
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: heart.duration,
                    repeat: Infinity,
                    delay: heart.delay,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-6 h-6" />
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center space-y-6 relative z-10"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center gap-3"
              >
                <motion.span
                  className="text-6xl sm:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 40px rgba(244, 63, 94, 0.3)',
                  }}
                >
                  Pruddy
                </motion.span>
                <motion.div className="flex gap-1">
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-5xl sm:text-7xl lg:text-8xl"
                  >
                    💕
                  </motion.span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-4"
              >
                <motion.p
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-rose-600 dark:text-rose-400"
                >
                  Will you be my Valentine?
                </motion.p>
                <motion.div
                  className="flex items-center justify-center gap-2 text-pink-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5" />
                  <Star className="w-4 h-4" />
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 relative z-10"
            >
              <motion.div
                style={{ scale: yesButtonScale }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Button
                  onClick={handleYesClick}
                  size={yesButtonScale > 1.5 ? "lg" : "default"}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold px-8 py-6 text-lg sm:text-xl shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300"
                >
                  Yes! 💕
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleNoClick}
                  variant="outline"
                  size={yesButtonScale > 1.5 ? "lg" : "default"}
                  className="border-2 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/20 font-semibold px-8 py-6 text-lg sm:text-xl"
                >
                  {noAttempts < funnyMessages.length ? funnyMessages[noAttempts] : "Yes? 💕"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col"
          >
            {/* Celebration Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center py-12 px-4 space-y-4"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl"
              >
                💖
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                She Said Yes!
              </h1>
              <p className="text-xl sm:text-2xl text-rose-600 dark:text-rose-400 font-medium">
                My beautiful Valentine ❤️
              </p>
            </motion.div>

            {/* Sections */}
            <div className="flex-1 px-4 pb-12 max-w-4xl mx-auto w-full">
              <div className="space-y-6">
                {[
                  {
                    icon: <Heart className="w-6 h-6" />,
                    title: "When I First Saw You",
                    description: "In that moment, time stood still and I knew my life would never be the same. Your smile lit up my world and I knew I had found something truly special.",
                    color: "from-rose-400 to-pink-400",
                    image: "/ponk5.jpeg",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: "Every Moment Together",
                    description: "Each day with you has been a blessing. From our laughter together to the quiet moments, every second has been filled with joy and love beyond measure.",
                    color: "from-pink-400 to-rose-400",
                    images: ["/ponk3.jpeg", "/ponk2.jpeg"],
                  },
                  {
                    icon: <Star className="w-6 h-6" />,
                    title: "Today",
                    description: "This Valentine's Day, I want you to know that you are my everything. You make my heart skip a beat and bring so much happiness into my life.",
                    color: "from-rose-500 to-pink-500",
                  },
                  {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Always & Forever",
                    description: "I promise to love you, cherish you, and be there for you always. With you, I've found my forever person. Together, we'll create countless beautiful memories.",
                    color: "from-pink-500 to-rose-500",
                    images: ["/ponk4.jpeg", "/ponk1.jpeg"],
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: "One More Thing...",
                    description: "There's something else I need to tell you. Something that comes from the deepest part of my heart...",
                    color: "from-rose-600 to-pink-600",
                  },
                ].map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100 dark:border-rose-900/30"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          className={`p-3 rounded-xl bg-gradient-to-br ${section.color} text-white shrink-0`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {section.icon}
                        </motion.div>
                        <div className="flex-1 space-y-3">
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            {section.title}
                          </h2>
                        </div>
                      </div>
                      {section.image && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 0.85, scale: 1 }}
                          transition={{ delay: index * 0.15 + 0.1, duration: 0.6 }}
                          className="my-4"
                        >
                          <div className="relative rounded-xl overflow-hidden border-2 border-rose-200 dark:border-rose-800">
                            <img
                              src={section.image}
                              alt={section.title}
                              className="w-full h-auto"
                            />
                          </div>
                        </motion.div>
                      )}
                      {section.images && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 0.85, scale: 1 }}
                          transition={{ delay: index * 0.15 + 0.1, duration: 0.6 }}
                          className="my-4 flex gap-4"
                        >
                          {section.images.map((img, imgIndex) => (
                            <div key={imgIndex} className="flex-1 min-w-0 relative aspect-video rounded-xl overflow-hidden border-2 border-rose-200 dark:border-rose-800">
                              <img
                                src={img}
                                alt={`${section.title} ${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </motion.div>
                      )}
                      <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                        {section.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Read Letter Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-center mt-12 space-y-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Button
                    onClick={() => setShowLetter(true)}
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold px-10 py-8 text-xl sm:text-2xl shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300"
                  >
                    Read Your Letter 💝
                  </Button>
                </motion.div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A special message just for you
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter Modal */}
      <Dialog open={showLetter} onOpenChange={setShowLetter}>
        <DialogContent className="max-w-2xl sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-rose-200 dark:border-rose-800">
          <DialogHeader className="space-y-4 pb-4">
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              </motion.div>
              <DialogTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent text-center">
                My Dearest Pruddy
              </DialogTitle>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              >
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              </motion.div>
            </div>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 px-4 pb-4"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="text-lg sm:text-xl font-medium text-rose-700 dark:text-rose-300 mb-6 italic">
                From the moment you walked into my life, everything changed for the better...
              </p>

              <p className="text-base sm:text-lg">
                Pruddy, my love, you are the most beautiful person I've ever known, inside and out. Your smile brightens my darkest days, your laugh is my favorite melody, and your love is the greatest gift I've ever received.
              </p>

              <p className="text-base sm:text-lg">
                Every moment with you feels like a dream I never want to wake up from. You've shown me what true love means — it's patient, kind, and endlessly wonderful. With you, I've found my best friend, my confidante, and my soulmate all in one.
              </p>

              <p className="text-base sm:text-lg">
                Today and every day, I want you to know that you are cherished beyond words. You make my heart skip a beat and fill my life with colors I never knew existed. I promise to love you with all my heart, to be there for you in every moment, and to cherish our beautiful journey together.
              </p>

              <p className="text-lg sm:text-xl font-medium text-rose-700 dark:text-rose-300 mb-6 italic">
                Thank you for being my Valentine, my love, my everything. I love you more than words could ever express.
              </p>
            </div>

            <div className="text-center pt-6 space-y-3">
              <div className="flex justify-center gap-2 text-4xl sm:text-5xl">
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    💕
                  </motion.span>
                ))}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400">
                Forever Yours
              </p>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl sm:text-2xl text-rose-500 font-semibold"
              >
                With All My Love ❤️
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-auto">
        Made with love for Pruddy 💕
      </footer>
    </div>
  )
}
