import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CategoryCard from '@/components/forum/CategoryCard';
import ThreadCard from '@/components/forum/ThreadCard';
import NewThreadForm from '@/components/forum/NewThreadForm';
import AuthModal from '@/components/forum/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { getCategories, getThreads } from '@/lib/strapi-forum';

export default function ForumIndex() {
  const { user } = useAuth();
  const [showNewThread, setShowNewThread] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [categoriesData, threadsData] = await Promise.all([
          getCategories(),
          getThreads({ pageSize: 10, sort: 'createdAt:desc' })
        ]);
        setCategories(categoriesData);
        setThreads(threadsData.threads);
      } catch (err) {
        console.error('Error loading forum data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleNewThread = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowNewThread(true);
    }
  };

  const handleThreadCreated = async () => {
    // Refresh threads
    const threadsData = await getThreads({ pageSize: 10, sort: 'createdAt:desc' });
    setThreads(threadsData.threads);
    setShowNewThread(false);
  };

  // Calculate stats from categories
  const totalThreads = categories.reduce((acc, cat) => acc + (cat.threads?.length || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">REMACS Community of Practice</h1>
              <p className="mt-2 text-teal-100 max-w-2xl">
                The primary community for research management professionals participating in the REMACS programme.
              </p>
              <div className="mt-4 flex items-center space-x-6 text-sm text-teal-100">
                <span className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>{categories.length} categories</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <span>{totalThreads} threads</span>
                </span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleNewThread}
                className="inline-flex items-center px-5 py-2.5 bg-white text-teal-700 font-semibold rounded-lg hover:bg-teal-50 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Discussion
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            Error loading forum: {error}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'categories'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'recent'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recent Discussions
            </button>
          </nav>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading forum...</p>
          </div>
        ) : (
          <>
            {/* Content */}
            {activeTab === 'categories' ? (
              <div className="grid gap-4">
                {categories.length > 0 ? (
                  categories
                    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                    .map(category => (
                      <CategoryCard key={category.documentId} category={category} />
                    ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    No categories yet. Check back later!
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {threads.length > 0 ? (
                  threads.map(thread => (
                    <ThreadCard key={thread.documentId} thread={thread} showCategory />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    No discussions yet. Start the first one!
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* New Thread Modal */}
      {showNewThread && (
        <NewThreadForm
          categories={categories}
          onClose={() => setShowNewThread(false)}
          onSuccess={handleThreadCreated}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </MainLayout>
  );
}
