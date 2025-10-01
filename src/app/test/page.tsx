export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
        Tailwind CSS Test
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-500 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Red Box</h2>
          <p>This should be a red background with white text</p>
        </div>
        
        <div className="bg-blue-500 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Blue Box</h2>
          <p>This should be a blue background with white text</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Gradient Box</h2>
          <p>This should be a gradient background</p>
        </div>
        
        <div className="bg-gray-800 border border-gray-600 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Gray Box</h2>
          <p>This should be a dark gray background with border</p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Test Button
        </button>
      </div>
    </div>
  )
}
