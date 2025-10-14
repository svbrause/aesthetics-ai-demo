export default function ColorExperimentTestPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Color Experiment Test Page
      </h1>
      <p className="text-lg text-gray-600">
        This is a simple test page to verify that the color-experiments route is
        working.
      </p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Traditional Medspa Colors
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded" style={{ backgroundColor: "#8B7355" }}>
            <p className="text-white font-medium">Primary</p>
            <p className="text-white text-sm">#8B7355</p>
          </div>
          <div className="p-4 rounded" style={{ backgroundColor: "#A8D8B9" }}>
            <p className="text-gray-800 font-medium">Secondary</p>
            <p className="text-gray-800 text-sm">#A8D8B9</p>
          </div>
          <div className="p-4 rounded" style={{ backgroundColor: "#7FB069" }}>
            <p className="text-white font-medium">Accent</p>
            <p className="text-white text-sm">#7FB069</p>
          </div>
        </div>
      </div>
    </div>
  );
}






