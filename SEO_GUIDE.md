# How to Get Your Portfolio on Google (Free)

Your site is already set up with **on-page SEO** (title, description, keywords, structured data, sitemap, robots.txt). To show up when people search **"Muhammad Fahad"** or **"Muhammad Fahad QA"**, do these **free** steps.

---

## 1. Google Search Console (most important)

1. Go to **[Google Search Console](https://search.google.com/search-console)** and sign in with your Google account.
2. Click **“Add property”**.
3. Choose **“URL prefix”** and enter: `https://muhammadfahad.netlify.app`
4. Verify ownership using one of the options:
   - **HTML file upload:** Download the file Google gives you, put it in your project’s `public/` folder, redeploy on Netlify, then click “Verify”.
   - **HTML tag:** Add the meta tag they give you inside `<head>` in `index.html`, redeploy, then verify.
   - **Google Analytics:** If you use GA and the same Google account, you can verify that way.
5. After verification, go to **“Sitemaps”** in the left menu.
6. Under “Add a new sitemap”, enter: `sitemap.xml` and submit.
7. Wait a few days. You can use **“URL inspection”** to ask Google to index your homepage: enter `https://muhammadfahad.netlify.app` and click “Request indexing”.

This tells Google your site exists and helps it crawl and index your pages.

---

## 2. Bing Webmaster Tools (optional, free)

1. Go to **[Bing Webmaster Tools](https://www.bing.com/webmasters)**.
2. Add your site: `https://muhammadfahad.netlify.app`
3. Verify (e.g. with the same HTML tag or file you used for Google, if allowed).
4. Submit your sitemap: `https://muhammadfahad.netlify.app/sitemap.xml`

Bing powers some search engines (e.g. DuckDuckGo partly), so this can bring a bit more traffic.

---

## 3. What’s already done in this project

- **Title & description** include “Muhammad Fahad” and “QA / Automation Engineer” so search results look good.
- **Keywords** meta tag includes “Muhammad Fahad, QA Engineer, Playwright, Selenium, API testing”.
- **JSON-LD (Person schema)** so Google can understand who the site is about.
- **Canonical URL** so Google knows the main version of your site.
- **`public/robots.txt`** so crawlers are allowed and know where the sitemap is.
- **`public/sitemap.xml`** so search engines can discover your homepage and blog.

---

## 4. Tips to improve ranking over time (all free)

- **Backlinks:** Share your portfolio on LinkedIn, Twitter, GitHub profile, resume, and in job applications. When other sites link to you, Google often ranks you better.
- **Consistent NAP:** Use the same name (“Muhammad Fahad”) and role (“QA / Automation Engineer”) on LinkedIn, GitHub, and this site.
- **Blog:** Add short posts (QA/testing posts are in the Blog section). Fresh, relevant content can help.
- **Custom domain (optional):** If you use a domain like `muhammadfahad.com`, update:
  - `index.html`: canonical, og:url, JSON-LD `url`, and any other absolute URLs.
  - `public/robots.txt`: `Sitemap` URL.
  - `public/sitemap.xml`: all `<loc>` URLs.
  - Redeploy and add the new domain in Search Console.

---

## 5. Netlify: set VITE_SITE_URL (Fahad)

1. In **Netlify** → your site → **Site configuration** → **Environment variables**, add:
   - **Key:** `VITE_SITE_URL`
   - **Value:** Your final URL, e.g. `https://muhammadfahad.netlify.app` or `https://yourdomain.com`
2. Redeploy so the app uses this URL for OG image and any runtime links.

---

## 6. If you change your Netlify URL or add a custom domain

1. Replace **all** occurrences of `https://muhammadfahad.netlify.app` with your new URL in:
   - `index.html`
   - `public/robots.txt`
   - `public/sitemap.xml`
2. Set **VITE_SITE_URL** in `.env` (and on Netlify) to your new URL.
3. Add and verify the new URL in Google Search Console and resubmit the sitemap.

---

**Summary:** Deploy the latest code, set **VITE_SITE_URL** in Netlify to Fahad's final URL, then add and verify your site in **Google Search Console** and submit `sitemap.xml`. That’s the main free way to get your portfolio to show up for “Muhammad Fahad” and “Muhammad Fahad QA” on Google.
