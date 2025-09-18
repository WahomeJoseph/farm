export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://farm-orpin-mu.vercel.app/sitemap.xml',
  }
}
