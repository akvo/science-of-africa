import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to
            <span className="block text-teal-600">Science for Africa</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Community of Practice for Research Managers
          </p>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Connect, collaborate, and share knowledge with research management professionals across Africa
          </p>

          {/* Main CTA */}
          <div className="mb-8">
            <Link
              href="/forum"
              className="inline-flex items-center bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              Enter Forum
            </Link>
          </div>

          {/* Admin Links */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-900 transition-colors text-sm"
            >
              Strapi Admin
            </a>
            <a
              href="http://localhost:5050"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Database Admin
            </a>
            <a
              href="http://localhost:8025"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
            >
              Mail Server
            </a>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link href="/forum" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-transparent hover:border-teal-200">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Discussion Forums</h3>
            <p className="text-gray-600 text-sm">Engage in structured discussions organized by topic</p>
          </Link>
          <div className="bg-white p-6 rounded-xl shadow-lg opacity-60 cursor-not-allowed">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Resource Library</h3>
            <p className="text-gray-600 text-sm">Access templates, guidelines, and best practices</p>
            <span className="text-xs text-gray-400 mt-2 block">Coming Soon</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg opacity-60 cursor-not-allowed">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Member Network</h3>
            <p className="text-gray-600 text-sm">Connect with research managers across Africa</p>
            <span className="text-xs text-gray-400 mt-2 block">Coming Soon</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg opacity-60 cursor-not-allowed">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Events & Training</h3>
            <p className="text-gray-600 text-sm">Webinars, workshops, and capacity building</p>
            <span className="text-xs text-gray-400 mt-2 block">Coming Soon</span>
          </div>
        </div>
      </div>
    </main>
  );
}
