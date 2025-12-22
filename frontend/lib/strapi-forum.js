/**
 * Strapi Forum API client
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337';
const API_URL = `${BACKEND_URL}/api`;

// Helper to build query string from params
function buildQuery(params) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        // Handle nested objects like populate
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'object') {
            Object.entries(subValue).forEach(([deepKey, deepValue]) => {
              query.append(`${key}[${subKey}][${deepKey}]`, deepValue);
            });
          } else {
            query.append(`${key}[${subKey}]`, subValue);
          }
        });
      } else {
        query.append(key, value);
      }
    }
  });

  return query.toString();
}

// Generic fetch helper
async function fetchAPI(endpoint, options = {}) {
  const { token, ...fetchOptions } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
    throw new Error(error.error?.message || `HTTP error ${response.status}`);
  }

  return response.json();
}

// ============ Categories ============

export async function getCategories() {
  const query = buildQuery({
    'populate[threads]': 'true',
    'sort': 'sort_order:asc',
    'publicationState': 'live'
  });

  const response = await fetchAPI(`/forum-categories?${query}`);
  return response.data || [];
}

export async function getCategoryBySlug(slug) {
  const query = buildQuery({
    'filters[slug][$eq]': slug,
    'populate[threads][populate][author]': 'true',
    'populate[threads][populate][tags]': 'true',
    'populate[threads][populate][posts]': 'true',
    'publicationState': 'live'
  });

  const response = await fetchAPI(`/forum-categories?${query}`);
  return response.data?.[0] || null;
}

// ============ Threads ============

export async function getThreads(options = {}) {
  const { categoryId, page = 1, pageSize = 20, sort = 'createdAt:desc' } = options;

  const params = {
    'populate[author]': 'true',
    'populate[category]': 'true',
    'populate[tags]': 'true',
    'populate[posts]': 'true',
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'sort': sort,
    'publicationState': 'live'
  };

  if (categoryId) {
    params['filters[category][documentId][$eq]'] = categoryId;
  }

  const query = buildQuery(params);
  const response = await fetchAPI(`/threads?${query}`);

  return {
    threads: response.data || [],
    pagination: response.meta?.pagination || { page: 1, pageSize: 20, total: 0 }
  };
}

export async function getThreadBySlug(slug) {
  const query = buildQuery({
    'filters[slug][$eq]': slug,
    'populate[author]': 'true',
    'populate[category]': 'true',
    'populate[tags]': 'true',
    'populate[posts][populate][author]': 'true',
    'populate[posts][populate][child_posts][populate][author]': 'true',
    'populate[posts][populate][child_posts][populate][child_posts][populate][author]': 'true',
    'publicationState': 'live'
  });

  const response = await fetchAPI(`/threads?${query}`);
  return response.data?.[0] || null;
}

export async function createThread(data, token) {
  const response = await fetchAPI('/threads', {
    method: 'POST',
    body: JSON.stringify({ data }),
    token
  });

  return response.data;
}

export async function updateThread(documentId, data, token) {
  const response = await fetchAPI(`/threads/${documentId}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
    token
  });

  return response.data;
}

// ============ Posts ============

export async function getPostsByThread(threadId) {
  const query = buildQuery({
    'filters[thread][documentId][$eq]': threadId,
    'filters[parent_post][$null]': true,
    'populate[author]': 'true',
    'populate[child_posts][populate][author]': 'true',
    'populate[child_posts][populate][child_posts][populate][author]': 'true',
    'populate[child_posts][populate][child_posts][populate][child_posts][populate][author]': 'true',
    'sort': 'createdAt:asc'
  });

  const response = await fetchAPI(`/posts?${query}`);
  return response.data || [];
}

export async function createPost(data, token) {
  const response = await fetchAPI('/posts', {
    method: 'POST',
    body: JSON.stringify({ data }),
    token
  });

  return response.data;
}

export async function updatePost(documentId, data, token) {
  const response = await fetchAPI(`/posts/${documentId}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
    token
  });

  return response.data;
}

// ============ Tags ============

export async function getTags() {
  const response = await fetchAPI('/tags?sort=name:asc');
  return response.data || [];
}

// ============ Auth helpers ============

export async function login(identifier, password) {
  const response = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Login failed');
  }

  return response.json();
}

export async function register(username, email, password) {
  const response = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Registration failed');
  }

  return response.json();
}

export async function getMe(token) {
  const response = await fetchAPI('/users/me', { token });
  return response;
}
