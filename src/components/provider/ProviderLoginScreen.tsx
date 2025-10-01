"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
  Brain,
  Sparkles,
} from "lucide-react";

interface ProviderLoginScreenProps {
  onLogin: () => void;
}

export function ProviderLoginScreen({ onLogin }: ProviderLoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const floatingElements = [
    { icon: <Stethoscope className="w-6 h-6" />, delay: 0, duration: 3 },
    { icon: <Brain className="w-5 h-5" />, delay: 1, duration: 4 },
    { icon: <Sparkles className="w-6 h-6" />, delay: 2, duration: 3.5 },
    { icon: <Shield className="w-4 h-4" />, delay: 0.5, duration: 2.5 },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

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

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:via-gray-200 dark:to-gray-400 mb-2">
              Provider Portal
            </h1>
            <p className="text-gray-400 text-sm">
              Access your AI-powered aesthetic analysis tools
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Professional Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@clinic.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Authenticating...
                    </div>
                  ) : (
                    "Access Provider Portal"
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs">
                  <p className="text-gray-300">
                    <span className="text-gray-400">Email:</span>{" "}
                    demo@ponceai.com
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Password:</span> demo123
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-gray-500">
              Secure access to Ponce AI Provider Tools
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
