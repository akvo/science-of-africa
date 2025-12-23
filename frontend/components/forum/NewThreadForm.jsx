import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { createThread, getTags } from '@/lib/strapi-forum';

export default function NewThreadForm({ categories = [], onClose, onSuccess, preselectedCategory = null }) {
  const router = useRouter();
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(preselectedCategory?.documentId || '');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTags() {
      try {
        const tagsData = await getTags();
        setTags(tagsData);
      } catch (err) {
        console.error('Error loading tags:', err);
      }
    }
    loadTags();
  }, []);

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : prev.length < 3
          ? [...prev, tagId]
          : prev
    );
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const threadData = {
        title: title.trim(),
        slug: generateSlug(title) + '-' + Date.now(),
        content: content.trim(),
        category: categoryId,
        tags: selectedTags,
        is_pinned: false,
        is_locked: false,
        is_answered: false,
        view_count: 0
      };

      const newThread = await createThread(threadData, token);

      if (onSuccess) {
        onSuccess(newThread);
      } else {
        router.push(`/forum/thread/${newThread.slug}`);
      }
      onClose();
    } catch (err) {
      console.error('Error creating thread:', err);
      setError(err.message || 'Failed to create thread');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Start a New Discussion</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-white"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.documentId} value={cat.documentId}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to discuss?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-white"
              maxLength={200}
              required
            />
            <p className="mt-1 text-xs text-gray-400">{title.length}/200 characters</p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide more details about your topic..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-gray-900 bg-white"
              required
            />
            <p className="mt-1 text-xs text-gray-400">
              Tip: Be specific and provide context to get better responses
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags <span className="text-gray-400 font-normal">(select up to 3)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag.documentId}
                  type="button"
                  onClick={() => handleTagToggle(tag.documentId)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag.documentId)
                      ? 'ring-2 ring-offset-1'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: `${tag.color || '#6366f1'}20`,
                    color: tag.color || '#6366f1',
                    ...(selectedTags.includes(tag.documentId) && { ringColor: tag.color || '#6366f1' })
                  }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Community Guidelines</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>- Be respectful and constructive in your discussions</li>
              <li>- Search for existing threads before posting</li>
              <li>- Use appropriate tags to help others find your thread</li>
              <li>- Mark answers as accepted to help future readers</li>
            </ul>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}
            className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Creating...' : 'Create Thread'}
          </button>
        </div>
      </div>
    </div>
  );
}
