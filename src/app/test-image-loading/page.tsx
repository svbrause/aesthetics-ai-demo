"use client";

import { PatientImage } from "@/components/ui/PatientImage";

export default function TestImageLoadingPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Image Loading Test</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Sydney Adams Front</h2>
            <div className="w-full h-80 border rounded-lg overflow-hidden">
              <PatientImage
                src="/Sydney Adams Front.png"
                alt="Sydney Adams Front"
                className="w-full h-full"
                fallbackSrc="/Chelsea Perry Front.png"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Sydney Adams Side</h2>
            <div className="w-full h-80 border rounded-lg overflow-hidden">
              <PatientImage
                src="/Sydney Adams Side.png"
                alt="Sydney Adams Side"
                className="w-full h-full"
                fallbackSrc="/Chelsea Perry Side.png"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Chelsea Perry Front</h2>
            <div className="w-full h-80 border rounded-lg overflow-hidden">
              <PatientImage
                src="/Chelsea Perry Front.png"
                alt="Chelsea Perry Front"
                className="w-full h-full"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Chelsea Perry Side</h2>
            <div className="w-full h-80 border rounded-lg overflow-hidden">
              <PatientImage
                src="/Chelsea Perry Side.png"
                alt="Chelsea Perry Side"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Direct Image Test</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Sydney Adams Front (direct img tag)
              </p>
              <img
                src="/Sydney Adams Front.png"
                alt="Sydney Adams Front"
                className="w-full h-40 object-contain border rounded"
                onLoad={() => console.log("Sydney Front loaded successfully")}
                onError={(e) => console.log("Sydney Front failed to load:", e)}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Sydney Adams Side (direct img tag)
              </p>
              <img
                src="/Sydney Adams Side.png"
                alt="Sydney Adams Side"
                className="w-full h-40 object-contain border rounded"
                onLoad={() => console.log("Sydney Side loaded successfully")}
                onError={(e) => console.log("Sydney Side failed to load:", e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

