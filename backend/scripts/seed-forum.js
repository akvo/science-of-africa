'use strict';

/**
 * Seed script for forum data
 * Run with: npm run seed-forum
 */

const { createStrapi } = require('@strapi/strapi');

const tags = [
  { name: 'Best Practices', slug: 'best-practices', color: '#10B981' },
  { name: 'Question', slug: 'question', color: '#6366F1' },
  { name: 'Discussion', slug: 'discussion', color: '#8B5CF6' },
  { name: 'Resource', slug: 'resource', color: '#F59E0B' },
  { name: 'Help Needed', slug: 'help-needed', color: '#EF4444' },
  { name: 'Success Story', slug: 'success-story', color: '#22C55E' },
  { name: 'Funding', slug: 'funding', color: '#0EA5E9' },
  { name: 'Training', slug: 'training', color: '#EC4899' }
];

const categories = [
  {
    name: 'Announcements',
    slug: 'announcements',
    description: 'Official announcements from the REMACS programme',
    icon: 'megaphone',
    sort_order: 0,
    visibility: 'public'
  },
  {
    name: 'General Discussions',
    slug: 'general',
    description: 'General topics related to research management in Africa',
    icon: 'chat',
    sort_order: 1,
    visibility: 'members_only'
  },
  {
    name: 'Grant Writing & Funding',
    slug: 'grants',
    description: 'Discussions about grant applications, funding opportunities, and proposal writing',
    icon: 'document',
    sort_order: 2,
    visibility: 'members_only'
  },
  {
    name: 'Ethics & Compliance',
    slug: 'ethics',
    description: 'Research ethics, IRB processes, and regulatory compliance discussions',
    icon: 'shield',
    sort_order: 3,
    visibility: 'members_only'
  },
  {
    name: 'Data Management',
    slug: 'data',
    description: 'Best practices for research data management, storage, and sharing',
    icon: 'database',
    sort_order: 4,
    visibility: 'members_only'
  },
  {
    name: 'Capacity Building',
    slug: 'capacity',
    description: 'Training, workshops, and professional development opportunities',
    icon: 'academic',
    sort_order: 5,
    visibility: 'members_only'
  }
];

const threads = [
  {
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
    view_count: 342,
    categorySlug: 'ethics',
    tagSlugs: ['best-practices', 'discussion']
  },
  {
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
    view_count: 567,
    categorySlug: 'grants',
    tagSlugs: ['funding', 'resource']
  },
  {
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
    view_count: 189,
    categorySlug: 'data',
    tagSlugs: ['question', 'help-needed']
  },
  {
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
    view_count: 423,
    categorySlug: 'capacity',
    tagSlugs: ['success-story', 'best-practices']
  }
];

async function seed() {
  let strapi;
  try {
    strapi = await createStrapi({ distDir: './dist' }).load();

    console.log('Seeding forum data...');

    // Create tags
    console.log('Creating tags...');
    const createdTags = {};
    for (const tag of tags) {
      const existing = await strapi.documents('api::tag.tag').findFirst({
        filters: { slug: tag.slug }
      });

      if (!existing) {
        const created = await strapi.documents('api::tag.tag').create({
          data: tag
        });
        createdTags[tag.slug] = created;
        console.log(`  Created tag: ${tag.name}`);
      } else {
        createdTags[tag.slug] = existing;
        console.log(`  Tag exists: ${tag.name}`);
      }
    }

    // Create categories
    console.log('Creating categories...');
    const createdCategories = {};
    for (const category of categories) {
      const existing = await strapi.documents('api::forum-category.forum-category').findFirst({
        filters: { slug: category.slug }
      });

      if (!existing) {
        const created = await strapi.documents('api::forum-category.forum-category').create({
          data: category
        });
        // Publish the category
        await strapi.documents('api::forum-category.forum-category').publish({
          documentId: created.documentId
        });
        createdCategories[category.slug] = created;
        console.log(`  Created category: ${category.name}`);
      } else {
        // Publish if not published
        if (!existing.publishedAt) {
          await strapi.documents('api::forum-category.forum-category').publish({
            documentId: existing.documentId
          });
          console.log(`  Published category: ${category.name}`);
        }
        createdCategories[category.slug] = existing;
        console.log(`  Category exists: ${category.name}`);
      }
    }

    // Create threads
    console.log('Creating threads...');
    for (const thread of threads) {
      const existing = await strapi.documents('api::thread.thread').findFirst({
        filters: { slug: thread.slug }
      });

      if (!existing) {
        const category = createdCategories[thread.categorySlug];
        const threadTags = thread.tagSlugs.map(slug => createdTags[slug]).filter(Boolean);

        const created = await strapi.documents('api::thread.thread').create({
          data: {
            title: thread.title,
            slug: thread.slug,
            content: thread.content,
            status: thread.status,
            is_pinned: thread.is_pinned,
            view_count: thread.view_count,
            category: category?.documentId,
            tags: threadTags.map(t => t.documentId)
          }
        });
        // Publish the thread
        await strapi.documents('api::thread.thread').publish({
          documentId: created.documentId
        });
        console.log(`  Created thread: ${thread.title.substring(0, 50)}...`);
      } else {
        // Publish if not published
        if (!existing.publishedAt) {
          await strapi.documents('api::thread.thread').publish({
            documentId: existing.documentId
          });
          console.log(`  Published thread: ${thread.title.substring(0, 50)}...`);
        }
        console.log(`  Thread exists: ${thread.title.substring(0, 50)}...`);
      }
    }

    console.log('Forum seed completed successfully!');
  } catch (error) {
    console.error('Error seeding forum:', error);
    throw error;
  } finally {
    if (strapi) {
      await strapi.destroy();
    }
    process.exit(0);
  }
}

seed();
