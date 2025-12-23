module.exports = ({ env }) => ({
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024,
    },
  },
  // Email provider - uncomment and add @strapi/provider-email-nodemailer when needed
  // email: {
  //   config: {
  //     provider: 'nodemailer',
  //     providerOptions: {
  //       host: env('SMTP_HOST', 'localhost'),
  //       port: env.int('SMTP_PORT', 1025),
  //       auth: {
  //         user: env('SMTP_USERNAME'),
  //         pass: env('SMTP_PASSWORD'),
  //       },
  //     },
  //     settings: {
  //       defaultFrom: env('SMTP_FROM', 'noreply@example.com'),
  //       defaultReplyTo: env('SMTP_FROM', 'noreply@example.com'),
  //     },
  //   },
  // },
});
