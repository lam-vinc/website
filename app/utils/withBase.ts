/**
 * Prefix a public/ path such as "/images/x.jpeg" with the app's base URL.
 *
 * Nuxt already does this for literal src="/..." attributes in templates, but
 * paths held in script reach the DOM untouched. GitHub Pages serves the site
 * from /<repo>/, so those would 404 without the prefix.
 */
export function withBase(path: string): string {
  return useRuntimeConfig().app.baseURL.replace(/\/$/, "") + path;
}
