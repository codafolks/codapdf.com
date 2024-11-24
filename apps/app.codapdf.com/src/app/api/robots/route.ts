export const GET = ()=>{

  return new Response(`User-agent: *
Disallow: /dashboard
Disallow: /settings
Disallow: /settings/account
Disallow: /settings/billing
Disallow: /templates
Disallow: /templates/sample/*
Disallow: /templates/create
Disallow: /templates/edit/*
Disallow: /api-keys
Disallow: /login
Disallow: /signup
Disallow: /forgot-password
Disallow: /api/auth/github
Disallow: /api/auth/google
Disallow: /redirecting
Allow: /docs
# Allow search engines to crawl the main parts of the site
Allow: /
# Sitemap location
Sitemap: https://codapdf.com/sitemap.xml
`, {status: 200, headers: {'Content-Type': 'text/plain'}});
}