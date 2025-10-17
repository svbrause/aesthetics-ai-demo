"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Brain, Target, User } from "lucide-react";

interface WelcomeScreenProps {
  onBegin: () => void;
}

export function WelcomeScreen({ onBegin }: WelcomeScreenProps) {
  const floatingElements = [
    { icon: <Brain className="w-6 h-6" />, delay: 0, duration: 3 },
    { icon: <Target className="w-5 h-5" />, delay: 1, duration: 4 },
    { icon: <Sparkles className="w-6 h-6" />, delay: 2, duration: 3.5 },
    { icon: <Brain className="w-4 h-4" />, delay: 0.5, duration: 2.5 },
    { icon: <Target className="w-5 h-5" />, delay: 1.5, duration: 3.8 },
    { icon: <Sparkles className="w-6 h-6" />, delay: 2.5, duration: 4.2 },
  ];

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden flex flex-col"
      style={{
        height: "calc(var(--actual-vh, 100vh))",
        minHeight: "calc(var(--actual-vh, 100vh))",
        maxHeight: "calc(var(--actual-vh, 100vh))",
      }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="relative z-10 flex-1 flex flex-col justify-between p-4 pb-6">
        {/* Top Section - Branding and Silhouette */}
        <div className="flex-1 flex flex-col justify-center items-center">
          {/* Ponce AI Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Ponce AI
            </h2>
          </motion.div>

          {/* Animated Silhouette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 relative"
          >
            <div className="relative w-32 h-40 mx-auto">
              {/* Face Silhouette */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 40px rgba(147, 51, 234, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Analysis Lines */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <svg viewBox="0 0 128 160" className="w-full h-full">
                  {/* Scanning lines */}
                  <motion.line
                    x1="20"
                    y1="40"
                    x2="108"
                    y2="40"
                    stroke="url(#gradient1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  />
                  <motion.line
                    x1="20"
                    y1="80"
                    x2="108"
                    y2="80"
                    stroke="url(#gradient2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <motion.line
                    x1="20"
                    y1="120"
                    x2="108"
                    y2="120"
                    stroke="url(#gradient3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }}
                  />

                  {/* Analysis points */}
                  {[30, 50, 70, 90, 110].map((y, index) => (
                    <motion.circle
                      key={y}
                      cx="64"
                      cy={y}
                      r="2"
                      fill="url(#gradient1)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  ))}

                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient
                      id="gradient3"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Text - Smaller for Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mb-4"
          >
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              <motion.span
                className="block bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:via-gray-200 dark:to-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Intelligence
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:via-gray-200 dark:to-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                Reimagined
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                for Aesthetics
              </motion.span>
            </h1>
          </motion.div>
        </div>

        {/* Bottom Section - CTA Only */}
        <div className="space-y-4">
          {/* CTA Button - Clean and focused */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex justify-center"
          >
            <Button
              onClick={onBegin}
              size="lg"
              className="group bg-white text-black hover:bg-gray-100 text-base px-8 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full max-w-xs"
            >
              <span className="flex items-center justify-center gap-2">
                Begin Your Concierge Demo
                <motion.div className="group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>

          {/* Provider Access Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex justify-center gap-4"
          >
            <a
              href="/provider-login"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 underline underline-offset-4"
            >
              Provider Login
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="/provider"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 underline underline-offset-4"
            >
              Demo Portal
            </a>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
