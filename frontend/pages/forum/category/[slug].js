import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ThreadCard from '@/components/forum/ThreadCard';
import NewThreadForm from '@/components/forum/NewThreadForm';
import AuthModal from '@/components/forum/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { getCategoryBySlug, getThreads, getCategories } from '@/lib/strapi-forum';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { user } = useAuth();

  const [showNewThread, setShowNewThread] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [category, setCategory] = useState(null);
  const [threads, setThreads] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function loadData() {
      try {
        setLoading(true);
        const [categoryData, categoriesData] = await Promise.all([
          getCategoryBySlug(slug),
          getCategories()
        ]);

        if (categoryData) {
          setCategory(categoryData);
          // Fetch threads for this category
          const threadsData = await getThreads({
            categoryId: categoryData.documentId,
            pageSize: 50,
            sort: sortBy === 'recent' ? 'createdAt:desc' : sortBy === 'popular' ? 'view_count:desc' : 'createdAt:desc'
          });
          setThreads(threadsData.threads);
        }
        setAllCategories(categoriesData);
      } catch (err) {
        console.error('Error loading category:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug, sortBy]);

  const handleNewThread = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowNewThread(true);
    }
  };

  const handleThreadCreated = async () => {
    // Refresh threads
    if (category) {
      const threadsData = await getThreads({
        categoryId: category.documentId,
        pageSize: 50
      });
      setThreads(threadsData.threads);
    }
    setShowNewThread(false);
  };

  // Sort threads (pinned first, then by preference)
  const sortedThreads = [...threads].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return 0;
  });

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Loading category...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !category) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <p className="mt-2 text-gray-600">{error || "The category you're looking for doesn't exist."}</p>
          <Link href="/forum" className="mt-4 inline-block text-teal-600 hover:text-teal-700">
            Back to Forum
          </Link>
        </div>
      </MainLayout>
    );
  }

  const threadCount = threads.length;
  const postCount = threads.reduce((acc, t) => acc + (t.posts?.length || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/forum" className="hover:text-teal-600 transition-colors">
            Forum
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
                {category.visibility === 'public' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Public
                  </span>
                )}
              </div>
              <p className="mt-2 text-gray-600">{category.description}</p>
              <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                <span>{threadCount} threads</span>
                <span>{postCount} posts</span>
              </div>
            </div>
            <button
              onClick={handleNewThread}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Thread
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            {sortedThreads.length} discussion{sortedThreads.length !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Viewed</option>
              <option value="replies">Most Replies</option>
            </select>
          </div>
        </div>

        {/* Thread List */}
        {sortedThreads.length > 0 ? (
          <div className="space-y-4">
            {sortedThreads.map(thread => (
              <ThreadCard key={thread.documentId} thread={thread} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No discussions yet</h3>
            <p className="mt-2 text-gray-500">Be the first to start a discussion in this category!</p>
            <button
              onClick={handleNewThread}
              className="mt-4 inline-flex items-center px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              Start a Discussion
            </button>
          </div>
        )}
      </div>

      {/* New Thread Modal */}
      {showNewThread && (
        <NewThreadForm
          categories={allCategories}
          onClose={() => setShowNewThread(false)}
          onSuccess={handleThreadCreated}
          preselectedCategory={category}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </MainLayout>
  );
}
