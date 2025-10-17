"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FacePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the demo form
    router.push("/face/demo-form");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to demo form...</p>
      </div>
    </div>
  );
}
