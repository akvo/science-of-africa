import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createPost } from '@/lib/strapi-forum';

function formatTimeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function ReplyForm({ onSubmit, onCancel, isSubmitting }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const success = await onSubmit(content);
    if (success) {
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 ml-12">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply..."
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-sm"
      />
      <div className="mt-2 flex items-center space-x-2">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-4 py-1.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Posting...' : 'Reply'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-1.5 text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function PostThread({ post, depth = 0, maxDepth = 4, threadId, threadAuthorId, onReplySuccess }) {
  const { user, token } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const authorInitial = post.author?.username?.charAt(0)?.toUpperCase() || '?';
  const authorName = post.author?.username || 'Anonymous';
  const isThreadAuthor = post.author?.id === threadAuthorId;

  const handleReply = async (content) => {
    if (!user) {
      alert('Please sign in to reply');
      return false;
    }

    setIsSubmitting(true);
    try {
      await createPost({
        content: content.trim(),
        thread: threadId,
        parent_post: post.documentId,
        upvote_count: 0,
        is_accepted_answer: false
      }, token);

      setShowReplyForm(false);
      if (onReplySuccess) {
        await onReplySuccess();
      }
      return true;
    } catch (err) {
      console.error('Error posting reply:', err);
      alert('Failed to post reply: ' + err.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted);
  };

  // Determine nesting style
  const nestingMargin = Math.min(depth, maxDepth) * 24;
  const showBorder = depth > 0;

  return (
    <div
      className={`${showBorder ? 'border-l-2 border-gray-200 pl-4' : ''}`}
      style={{ marginLeft: depth > 0 ? `${nestingMargin}px` : 0 }}
    >
      <div className="py-4">
        {/* Post Header */}
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
              post.is_accepted_answer
                ? 'bg-green-100 ring-2 ring-green-500'
                : 'bg-gradient-to-br from-teal-100 to-blue-100'
            }`}>
              <span className={`font-medium text-sm ${
                post.is_accepted_answer ? 'text-green-700' : 'text-teal-700'
              }`}>
                {authorInitial}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Author Info */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-medium text-gray-900">{authorName}</span>
              {isThreadAuthor && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                  OP
                </span>
              )}
              {post.is_accepted_answer && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                  <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Accepted Answer
                </span>
              )}
              <span className="text-sm text-gray-400">
                {formatTimeAgo(post.createdAt)}
              </span>
              {post.edited_at && (
                <span className="text-xs text-gray-400">(edited)</span>
              )}
            </div>

            {/* Post Content */}
            <div
              className="mt-2 prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Actions */}
            <div className="mt-3 flex items-center space-x-4">
              {/* Upvote */}
              <button
                onClick={handleUpvote}
                className={`flex items-center space-x-1 text-sm transition-colors ${
                  isUpvoted
                    ? 'text-teal-600'
                    : 'text-gray-500 hover:text-teal-600'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill={isUpvoted ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <span>{post.upvote_count + (isUpvoted ? 1 : 0)}</span>
              </button>

              {/* Reply Button */}
              {depth < maxDepth && (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-teal-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  <span>Reply</span>
                </button>
              )}

              {/* Report */}
              <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </button>
            </div>

            {/* Reply Form */}
            {showReplyForm && (
              <ReplyForm
                onSubmit={handleReply}
                onCancel={() => setShowReplyForm(false)}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {post.child_posts && post.child_posts.length > 0 && (
        <div className="space-y-0">
          {post.child_posts.map((childPost) => (
            <PostThread
              key={childPost.documentId || childPost.id}
              post={childPost}
              depth={depth + 1}
              maxDepth={maxDepth}
              threadId={threadId}
              threadAuthorId={threadAuthorId}
              onReplySuccess={onReplySuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
