"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useProvider } from "@/contexts/ProviderContext";
import {
  Shield,
  User,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ProviderLoginPage() {
  const [providerCode, setProviderCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useProvider();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/validate-provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ providerCode }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.provider);
        router.push("/provider-login/dashboard");
      } else {
        setError(data.error || "Invalid provider code");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to validate provider code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTestAPI = async () => {
    if (!providerCode.trim()) {
      setError("Please enter a provider code first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/test-provider-patients?providerCode=${providerCode}`
      );
      const data = await response.json();

      if (data.success) {
        console.log("🔍 TEST RESULTS:", data);
        setError(
          `Test completed! Check console for details. Found ${data.providers.length} providers and ${data.testResults.length} test results.`
        );
      } else {
        setError(`Test failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Test error:", error);
      setError("Test failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 medspa-new-theme"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 medspa-primary-bg rounded-2xl">
              <Shield
                className="w-12 h-12"
                style={{
                  color: "white !important",
                  fill: "none !important",
                  stroke: "white !important",
                  strokeWidth: "2 !important",
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Provider Login
          </h1>
          <p className="text-gray-600">
            Enter your provider code to access your dashboard
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-8 bg-white border border-gray-200 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="providerCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Provider Code
                </label>
                <div className="relative">
                  <input
                    id="providerCode"
                    type={showPassword ? "text" : "password"}
                    value={providerCode}
                    onChange={(e) => setProviderCode(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your provider code"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer w-8 h-full bg-transparent border-0 outline-none p-0 m-0"
                    style={{
                      background: "transparent !important",
                      border: "none !important",
                      outline: "none !important",
                      boxShadow: "none !important",
                    }}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={loading || !providerCode.trim()}
                  className="w-full medspa-primary-bg medspa-primary-hover text-white border-0 py-3 text-lg font-medium"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Validating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Access Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleTestAPI}
                  disabled={loading || !providerCode.trim()}
                  variant="secondary"
                  className="w-full text-sm"
                >
                  🔍 Test API & Debug
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Don't have a provider code?
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push("/provider")}
                  className="text-xs"
                >
                  Access Demo Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Header with theme toggle */}
      </div>
    </div>
  );
}
