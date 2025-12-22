// Mock data for forum UI development
// This will be replaced with Strapi API calls

export const mockUsers = [
  {
    id: '1',
    username: 'dr_amara',
    email: 'amara@university.edu',
    profile: {
      display_name: 'Dr. Amara Okonkwo',
      avatar: null,
      institution: 'University of Lagos',
      country: 'Nigeria',
      expertise_areas: ['Research Management', 'Grant Writing'],
      reputation_score: 245,
      trust_level: 'leader',
      bio: 'Research management professional with 15 years of experience in African research institutions.'
    }
  },
  {
    id: '2',
    username: 'kwame_asante',
    email: 'kwame@research.org',
    profile: {
      display_name: 'Kwame Asante',
      avatar: null,
      institution: 'CSIR Ghana',
      country: 'Ghana',
      expertise_areas: ['Data Management', 'Ethics'],
      reputation_score: 128,
      trust_level: 'regular',
      bio: 'Data management specialist focused on research data governance.'
    }
  },
  {
    id: '3',
    username: 'fatima_hassan',
    email: 'fatima@institute.org',
    profile: {
      display_name: 'Fatima Hassan',
      avatar: null,
      institution: 'Kenya Medical Research Institute',
      country: 'Kenya',
      expertise_areas: ['Clinical Trials', 'Regulatory Affairs'],
      reputation_score: 189,
      trust_level: 'regular',
      bio: 'Clinical research coordinator specializing in regulatory compliance.'
    }
  },
  {
    id: '4',
    username: 'jean_mukiza',
    email: 'jean@univ.rw',
    profile: {
      display_name: 'Jean-Pierre Mukiza',
      avatar: null,
      institution: 'University of Rwanda',
      country: 'Rwanda',
      expertise_areas: ['Capacity Building', 'Training'],
      reputation_score: 95,
      trust_level: 'member',
      bio: 'Research capacity development officer.'
    }
  }
];

export const mockCommunities = [
  {
    id: '1',
    name: 'REMACS Community of Practice',
    slug: 'remacs',
    description: 'The primary community for research management professionals participating in the REMACS programme.',
    type: 'programme',
    privacy_level: 'members_only',
    status: 'active',
    member_count: 342
  }
];

export const mockCategories = [
  {
    id: '1',
    name: 'General Discussions',
    slug: 'general',
    description: 'General topics related to research management in Africa',
    icon: 'chat',
    sort_order: 1,
    thread_count: 45,
    post_count: 234,
    last_activity: '2024-12-22T10:30:00Z',
    visibility: 'members_only',
    community: mockCommunities[0]
  },
  {
    id: '2',
    name: 'Grant Writing & Funding',
    slug: 'grants',
    description: 'Discussions about grant applications, funding opportunities, and proposal writing',
    icon: 'document',
    sort_order: 2,
    thread_count: 67,
    post_count: 412,
    last_activity: '2024-12-22T09:15:00Z',
    visibility: 'members_only',
    community: mockCommunities[0]
  },
  {
    id: '3',
    name: 'Ethics & Compliance',
    slug: 'ethics',
    description: 'Research ethics, IRB processes, and regulatory compliance discussions',
    icon: 'shield',
    sort_order: 3,
    thread_count: 38,
    post_count: 189,
    last_activity: '2024-12-21T16:45:00Z',
    visibility: 'members_only',
    community: mockCommunities[0]
  },
  {
    id: '4',
    name: 'Data Management',
    slug: 'data',
    description: 'Best practices for research data management, storage, and sharing',
    icon: 'database',
    sort_order: 4,
    thread_count: 29,
    post_count: 156,
    last_activity: '2024-12-20T14:20:00Z',
    visibility: 'members_only',
    community: mockCommunities[0]
  },
  {
    id: '5',
    name: 'Capacity Building',
    slug: 'capacity',
    description: 'Training, workshops, and professional development opportunities',
    icon: 'academic',
    sort_order: 5,
    thread_count: 52,
    post_count: 287,
    last_activity: '2024-12-22T08:00:00Z',
    visibility: 'members_only',
    community: mockCommunities[0]
  },
  {
    id: '6',
    name: 'Announcements',
    slug: 'announcements',
    description: 'Official announcements from the REMACS programme',
    icon: 'megaphone',
    sort_order: 0,
    thread_count: 12,
    post_count: 45,
    last_activity: '2024-12-19T11:00:00Z',
    visibility: 'public',
    community: mockCommunities[0]
  }
];

export const mockTags = [
  { id: '1', name: 'Best Practices', slug: 'best-practices', color: '#10B981', usage_count: 45 },
  { id: '2', name: 'Question', slug: 'question', color: '#6366F1', usage_count: 89 },
  { id: '3', name: 'Discussion', slug: 'discussion', color: '#8B5CF6', usage_count: 67 },
  { id: '4', name: 'Resource', slug: 'resource', color: '#F59E0B', usage_count: 34 },
  { id: '5', name: 'Help Needed', slug: 'help-needed', color: '#EF4444', usage_count: 56 },
  { id: '6', name: 'Success Story', slug: 'success-story', color: '#22C55E', usage_count: 23 },
  { id: '7', name: 'Funding', slug: 'funding', color: '#0EA5E9', usage_count: 41 },
  { id: '8', name: 'Training', slug: 'training', color: '#EC4899', usage_count: 38 }
];

export const mockThreads = [
  {
    id: '1',
    title: 'Best practices for managing multi-site clinical trials across African countries',
    slug: 'best-practices-multi-site-clinical-trials',
    content: `<p>I'm currently coordinating a multi-site clinical trial across Kenya, Uganda, and Tanzania. We're facing challenges with:</p>
    <ul>
      <li>Harmonizing ethics approvals across different national IRBs</li>
      <li>Standardizing data collection procedures</li>
      <li>Managing communication between sites</li>
    </ul>
    <p>Would love to hear from others who have managed similar projects. What tools and processes have worked well for you?</p>`,
    status: 'open',
    is_pinned: true,
    is_locked: false,
    is_answered: true,
    view_count: 342,
    reply_count: 18,
    last_activity_at: '2024-12-22T10:30:00Z',
    createdAt: '2024-12-15T09:00:00Z',
    author: mockUsers[2],
    category: mockCategories[2],
    tags: [mockTags[0], mockTags[2]]
  },
  {
    id: '2',
    title: 'New NIH Fogarty funding opportunity for African research institutions',
    slug: 'nih-fogarty-funding-opportunity',
    content: `<p>Just wanted to share this exciting funding opportunity I came across:</p>
    <p>The NIH Fogarty International Center has announced a new D43 training grant specifically for strengthening research management capacity in Sub-Saharan Africa.</p>
    <p><strong>Key details:</strong></p>
    <ul>
      <li>Budget: Up to $250,000/year for 5 years</li>
      <li>Deadline: March 15, 2025</li>
      <li>Focus: Research administration training programs</li>
    </ul>
    <p>Happy to discuss if anyone is interested in applying or forming a consortium.</p>`,
    status: 'open',
    is_pinned: true,
    is_locked: false,
    is_answered: false,
    view_count: 567,
    reply_count: 24,
    last_activity_at: '2024-12-22T09:15:00Z',
    createdAt: '2024-12-18T14:30:00Z',
    author: mockUsers[0],
    category: mockCategories[1],
    tags: [mockTags[6], mockTags[3]]
  },
  {
    id: '3',
    title: 'How do you handle data sharing agreements with international collaborators?',
    slug: 'data-sharing-agreements-international',
    content: `<p>Our institution is increasingly involved in international collaborations, and we're struggling to establish consistent processes for data sharing agreements.</p>
    <p>Specific questions:</p>
    <ol>
      <li>What templates do you use for DSAs?</li>
      <li>How do you ensure GDPR compliance when sharing with European partners?</li>
      <li>What's your typical turnaround time for negotiating these agreements?</li>
    </ol>
    <p>Any resources or templates would be greatly appreciated!</p>`,
    status: 'open',
    is_pinned: false,
    is_locked: false,
    is_answered: false,
    view_count: 189,
    reply_count: 12,
    last_activity_at: '2024-12-21T16:45:00Z',
    createdAt: '2024-12-19T10:00:00Z',
    author: mockUsers[1],
    category: mockCategories[3],
    tags: [mockTags[1], mockTags[4]]
  },
  {
    id: '4',
    title: 'Success story: How we reduced grant application processing time by 60%',
    slug: 'success-story-grant-processing',
    content: `<p>I wanted to share a success story from our research office that might help others.</p>
    <p>Last year, our average grant application processing time was 45 days from submission to institutional approval. After implementing several changes, we've reduced this to just 18 days.</p>
    <p><strong>What we did:</strong></p>
    <ul>
      <li>Implemented an online pre-submission checklist</li>
      <li>Created standardized budget templates</li>
      <li>Established weekly review meetings with key stakeholders</li>
      <li>Developed a tracking dashboard for all applications</li>
    </ul>
    <p>Happy to share more details or our templates if anyone is interested!</p>`,
    status: 'open',
    is_pinned: false,
    is_locked: false,
    is_answered: false,
    view_count: 423,
    reply_count: 31,
    last_activity_at: '2024-12-22T08:00:00Z',
    createdAt: '2024-12-10T08:30:00Z',
    author: mockUsers[3],
    category: mockCategories[4],
    tags: [mockTags[5], mockTags[0]]
  },
  {
    id: '5',
    title: 'Question: IRB requirements for secondary analysis of existing datasets',
    slug: 'irb-secondary-analysis-datasets',
    content: `<p>We have a researcher who wants to conduct secondary analysis on an existing dataset that was collected under a different IRB protocol.</p>
    <p>The original consent form mentioned "future research" but wasn't specific about the types of analyses.</p>
    <p>How do others handle this situation? Do you require a new IRB submission or is an amendment to the original protocol sufficient?</p>`,
    status: 'open',
    is_pinned: false,
    is_locked: false,
    is_answered: true,
    view_count: 156,
    reply_count: 8,
    last_activity_at: '2024-12-20T14:20:00Z',
    createdAt: '2024-12-17T11:15:00Z',
    author: mockUsers[2],
    category: mockCategories[2],
    tags: [mockTags[1], mockTags[4]]
  }
];

export const mockPosts = [
  // Posts for Thread 1 (Multi-site clinical trials)
  {
    id: '1',
    content: `<p>Great question, Fatima! We faced similar challenges in our TB treatment trial across 5 countries.</p>
    <p>For ethics harmonization, we found it helpful to:</p>
    <ul>
      <li>Start with the most stringent IRB requirements and use that as the baseline</li>
      <li>Create a comparison matrix of requirements across all countries</li>
      <li>Engage with ethics boards early - they appreciate proactive communication</li>
    </ul>
    <p>For data standardization, REDCap has been invaluable with its multi-site capabilities.</p>`,
    is_accepted_answer: true,
    is_hidden: false,
    upvote_count: 24,
    downvote_count: 0,
    createdAt: '2024-12-15T11:30:00Z',
    edited_at: null,
    author: mockUsers[0],
    thread: { id: '1' },
    parent_post: null,
    child_posts: [
      {
        id: '2',
        content: `<p>Thanks @dr_amara! The comparison matrix idea is excellent. Did you create a template for this that you could share?</p>`,
        is_accepted_answer: false,
        is_hidden: false,
        upvote_count: 5,
        downvote_count: 0,
        createdAt: '2024-12-15T14:00:00Z',
        author: mockUsers[2],
        parent_post: { id: '1' },
        child_posts: [
          {
            id: '3',
            content: `<p>Yes! I'll upload it to the Resource Repository and share the link here. Give me a day to clean it up.</p>`,
            is_accepted_answer: false,
            is_hidden: false,
            upvote_count: 8,
            downvote_count: 0,
            createdAt: '2024-12-15T15:30:00Z',
            author: mockUsers[0],
            parent_post: { id: '2' },
            child_posts: []
          }
        ]
      }
    ]
  },
  {
    id: '4',
    content: `<p>Adding to what @dr_amara mentioned, for communication between sites we've had success with:</p>
    <ol>
      <li>Weekly virtual stand-ups (kept to 30 minutes max)</li>
      <li>Shared Slack workspace with channels per work stream</li>
      <li>Monthly detailed progress reports using a standardized template</li>
    </ol>
    <p>The key is finding the right balance - too much communication can be as problematic as too little.</p>`,
    is_accepted_answer: false,
    is_hidden: false,
    upvote_count: 18,
    downvote_count: 1,
    createdAt: '2024-12-16T09:00:00Z',
    author: mockUsers[1],
    thread: { id: '1' },
    parent_post: null,
    child_posts: []
  },
  {
    id: '5',
    content: `<p>One thing I'd add about the regulatory landscape - it's worth checking if your countries have any mutual recognition agreements for ethics approval.</p>
    <p>For example, EAC countries have been working on harmonizing clinical trial regulations. It's not perfect yet, but it can help expedite the process.</p>`,
    is_accepted_answer: false,
    is_hidden: false,
    upvote_count: 12,
    downvote_count: 0,
    createdAt: '2024-12-17T10:15:00Z',
    author: mockUsers[3],
    thread: { id: '1' },
    parent_post: null,
    child_posts: []
  }
];

// Helper function to get threads by category
export function getThreadsByCategory(categorySlug) {
  const category = mockCategories.find(c => c.slug === categorySlug);
  if (!category) return [];
  return mockThreads.filter(t => t.category.id === category.id);
}

// Helper function to get thread with posts
export function getThreadWithPosts(threadSlug) {
  const thread = mockThreads.find(t => t.slug === threadSlug);
  if (!thread) return null;
  const posts = mockPosts.filter(p => p.thread.id === thread.id && !p.parent_post);
  return { ...thread, posts };
}

// Helper function to get all threads (for main forum page)
export function getAllThreads() {
  return mockThreads.sort((a, b) => {
    // Pinned first, then by last activity
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return new Date(b.last_activity_at) - new Date(a.last_activity_at);
  });
}
