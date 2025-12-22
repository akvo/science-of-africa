'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set up public permissions for forum API
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    const authenticatedRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'authenticated' } });

    if (publicRole) {
      // Public can read forum content
      const publicActions = [
        'api::forum-category.forum-category.find',
        'api::forum-category.forum-category.findOne',
        'api::thread.thread.find',
        'api::thread.thread.findOne',
        'api::post.post.find',
        'api::post.post.findOne',
        'api::tag.tag.find',
        'api::tag.tag.findOne',
      ];

      for (const action of publicActions) {
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action, role: publicRole.id } });

        if (!existingPermission) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: { action, role: publicRole.id },
          });
          console.log(`Created public permission: ${action}`);
        }
      }
    }

    if (authenticatedRole) {
      // Authenticated users can read and create content
      const authenticatedActions = [
        // Read actions
        'api::forum-category.forum-category.find',
        'api::forum-category.forum-category.findOne',
        'api::thread.thread.find',
        'api::thread.thread.findOne',
        'api::post.post.find',
        'api::post.post.findOne',
        'api::tag.tag.find',
        'api::tag.tag.findOne',
        // Create actions
        'api::thread.thread.create',
        'api::post.post.create',
        // Update own content
        'api::thread.thread.update',
        'api::post.post.update',
      ];

      for (const action of authenticatedActions) {
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action, role: authenticatedRole.id } });

        if (!existingPermission) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: { action, role: authenticatedRole.id },
          });
          console.log(`Created authenticated permission: ${action}`);
        }
      }
    }
  },
};
