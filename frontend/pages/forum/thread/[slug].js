import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import PostThread from '@/components/forum/PostThread';
import AuthModal from '@/components/forum/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { getThreadBySlug, createPost, getPostsByThread } from '@/lib/strapi-forum';

function TagBadge({ tag }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: `${tag.color || '#6366f1'}20`,
        color: tag.color || '#6366f1'
      }}
    >
      {tag.name}
    </span>
  );
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function ThreadPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { user, token } = useAuth();

  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function loadThread() {
      try {
        setLoading(true);
        const threadData = await getThreadBySlug(slug);
        if (threadData) {
          setThread(threadData);
          // Get root-level posts
          const rootPosts = threadData.posts?.filter(p => !p.parent_post) || [];
          setPosts(rootPosts);
        }
      } catch (err) {
        console.error('Error loading thread:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadThread();
  }, [slug]);

  const refreshPosts = async () => {
    if (!thread) return;
    try {
      const postsData = await getPostsByThread(thread.documentId);
      setPosts(postsData);
    } catch (err) {
      console.error('Error refreshing posts:', err);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Loading thread...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !thread) {
    return (
      <MainLayout>
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Thread not found</h1>
          <p className="mt-2 text-gray-600">{error || "The thread you're looking for doesn't exist."}</p>
          <Link href="/forum" className="mt-4 inline-block text-teal-600 hover:text-teal-700">
            Back to Forum
          </Link>
        </div>
      </MainLayout>
    );
  }

  const authorInitial = thread.author?.username?.charAt(0)?.toUpperCase() || '?';
  const authorName = thread.author?.username || 'Anonymous';
  const replyCount = thread.posts?.length || 0;

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost({
        content: replyContent.trim(),
        thread: thread.documentId,
        upvote_count: 0,
        is_accepted_answer: false
      }, token);

      setReplyContent('');
      await refreshPosts();
    } catch (err) {
      console.error('Error posting reply:', err);
      alert('Failed to post reply: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/forum" className="hover:text-teal-600 transition-colors">
            Forum
          </Link>
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link
            href={`/forum/category/${thread.category.slug}`}
            className="hover:text-teal-600 transition-colors"
          >
            {thread.category.name}
          </Link>
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium truncate">{thread.title}</span>
        </nav>

        {/* Thread Header */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="p-6">
            {/* Status Badges */}
            <div className="flex items-center flex-wrap gap-2 mb-3">
              {thread.is_pinned && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                  <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v2H5V5zm0 4h10v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" />
                  </svg>
                  Pinned
                </span>
              )}
              {thread.is_answered && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                  <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Answered
                </span>
              )}
              {thread.is_locked && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Locked
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {thread.title}
            </h1>

            {/* Tags */}
            {thread.tags && thread.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {thread.tags.map(tag => (
                  <TagBadge key={tag.documentId || tag.id} tag={tag} />
                ))}
              </div>
            )}

            {/* Author & Meta */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-700 font-medium">{authorInitial}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{authorName}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Posted {formatDate(thread.createdAt)}
              </div>
            </div>
          </div>

          {/* Thread Content */}
          <div className="px-6 pb-6">
            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: thread.content }}
            />
          </div>

          {/* Thread Stats */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{thread.view_count || 0} views</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <span>{replyCount} replies</span>
            </span>
          </div>
        </div>

        {/* Replies Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              {posts.length} {posts.length === 1 ? 'Reply' : 'Replies'}
            </h2>
          </div>

          {/* Posts List */}
          {posts.length > 0 ? (
            <div className="divide-y divide-gray-100 px-6">
              {posts.map(post => (
                <PostThread
                  key={post.documentId || post.id}
                  post={post}
                  threadId={thread.documentId}
                  threadAuthorId={thread.author?.id}
                  onReplySuccess={refreshPosts}
                />
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>No replies yet. Be the first to respond!</p>
            </div>
          )}

          {/* Reply Form */}
          {!thread.is_locked && (
            <div className="px-6 py-6 bg-gray-50 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Add your reply</h3>
              <form onSubmit={handleReplySubmit}>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Share your thoughts or answer..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Use @username to mention someone
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting || !replyContent.trim()}
                    className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Reply'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {thread.is_locked && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center text-gray-500">
              <svg className="w-5 h-5 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              This thread is locked and no longer accepting new replies.
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </MainLayout>
  );
}
