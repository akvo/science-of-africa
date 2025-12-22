import Link from 'next/link';

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

function TagBadge({ tag }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={{
        backgroundColor: `${tag.color || '#6366f1'}20`,
        color: tag.color || '#6366f1'
      }}
    >
      {tag.name}
    </span>
  );
}

export default function ThreadCard({ thread, showCategory = false }) {
  const authorName = thread.author?.username || 'Anonymous';
  const authorInitial = authorName.charAt(0).toUpperCase();
  const replyCount = thread.posts?.length || 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="p-4 sm:p-5">
        <div className="flex items-start space-x-4">
          {/* Author Avatar */}
          <div className="flex-shrink-0 hidden sm:block">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
              <span className="text-teal-700 font-medium">
                {authorInitial}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title Row */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  {thread.is_pinned && (
                    <span className="inline-flex items-center text-amber-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v2H5V5zm0 4h10v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" />
                      </svg>
                    </span>
                  )}
                  {thread.is_answered && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                      <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Answered
                    </span>
                  )}
                  {thread.is_locked && (
                    <span className="inline-flex items-center text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                <Link
                  href={`/forum/thread/${thread.slug}`}
                  className="text-lg font-semibold text-gray-900 hover:text-teal-600 transition-colors line-clamp-2"
                >
                  {thread.title}
                </Link>
              </div>
            </div>

            {/* Tags */}
            {thread.tags && thread.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {thread.tags.map(tag => (
                  <TagBadge key={tag.documentId || tag.id} tag={tag} />
                ))}
              </div>
            )}

            {/* Meta Row */}
            <div className="mt-3 flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <span className="sm:hidden w-5 h-5 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center text-xs text-teal-700 font-medium">
                  {authorInitial}
                </span>
                <span>{authorName}</span>
              </span>

              {showCategory && thread.category && (
                <Link
                  href={`/forum/category/${thread.category.slug}`}
                  className="text-teal-600 hover:text-teal-700"
                >
                  {thread.category.name}
                </Link>
              )}

              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{thread.view_count || 0}</span>
              </span>

              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span>{replyCount} replies</span>
              </span>

              <span className="text-gray-400">
                {formatTimeAgo(thread.updatedAt || thread.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
