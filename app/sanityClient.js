import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'h501sv49', // Replace with your project ID
  dataset: 'production', // Replace with your dataset
  apiVersion: '2023-01-01', // Use a date string in YYYY-MM-DD format
  useCdn: false, // `false` if you want to ensure fresh data
  token: 'sk9fr9NWGwRuxWyD5H28ysBioY4dSQlYikmBJWXXxCnhBm1vVfYJo4yoBElDlyzoRTrGBCq8dDNYMWNDDDUcmYkAGWTlf084EtRemeETEIUdzenZR0GBXuVkg98e0UleVnwk1d9EQNCDlRhrZ0l0wbPzYuyllDPZZ8YhV52Jt2KtGHAGDe4k', // Remove if your project is public or add a token if required for private access
});

export default client;
