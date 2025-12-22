export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to
            <span className="block text-blue-600">science of africa</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional full-stack application with Strapi CMS and Next.js
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="http://localhost:1337/admin" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Strapi Admin
            </a>
            <a 
              href="http://localhost:5050" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Database Admin
            </a>
            <a 
              href="http://localhost:8025" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Mail Server
            </a>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">🎨 Strapi CMS</h3>
            <p className="text-gray-600">Headless CMS for content management</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">⚡ Next.js</h3>
            <p className="text-gray-600">React framework for production</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibent mb-3 text-gray-900">🐘 PostgreSQL</h3>
            <p className="text-gray-600">Reliable database with PgAdmin</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibent mb-3 text-gray-900">📧 Mailpit</h3>
            <p className="text-gray-600">Email testing and development</p>
          </div>
        </div>
      </div>
    </main>
  );
}
