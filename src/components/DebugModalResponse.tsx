"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Copy, CheckCircle, XCircle } from "lucide-react";

interface DebugModalResponseProps {
  response: any;
  error?: string;
  onClose: () => void;
}

export function DebugModalResponse({
  response,
  error,
  onClose,
}: DebugModalResponseProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">
              Modal API Debug Response
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <XCircle className="w-5 h-5" />
            </Button>
          </div>

          {error ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-red-400">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">API Error:</span>
              </div>
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                <pre className="text-red-300 text-sm whitespace-pre-wrap">
                  {error}
                </pre>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">API Response Received</span>
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="secondary"
                  size="sm"
                  className="text-gray-300 border-gray-600 hover:border-gray-500"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy JSON
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4 max-h-96 overflow-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>

              {response && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">
                    Response Summary:
                  </h3>

                  {response.model_path && (
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">Model:</span>{" "}
                      {response.model_path}
                    </div>
                  )}

                  {response.threshold && (
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">Threshold:</span>{" "}
                      {response.threshold}
                    </div>
                  )}

                  {response.labels_on && Array.isArray(response.labels_on) && (
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">
                        Detected Issues ({response.labels_on.length}):
                      </span>
                      <ul className="mt-2 space-y-1">
                        {response.labels_on.map(
                          (
                            [label, confidence]: [string, number],
                            index: number
                          ) => (
                            <li key={index} className="ml-4">
                              • {label}: {(confidence * 100).toFixed(1)}%
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {response.all_scores && (
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">All Scores:</span>{" "}
                      {Object.keys(response.all_scores).length} total labels
                      analyzed
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose} className="px-6">
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
