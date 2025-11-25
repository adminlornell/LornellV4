// Cloudflare Worker for SPA routing
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // If the request is for a file that exists (has an extension), serve it
    if (url.pathname.includes('.')) {
      return env.ASSETS.fetch(request);
    }
    
    // For all other routes, serve index.html for SPA routing
    const indexRequest = new Request(new URL('/index.html', request.url), request);
    return env.ASSETS.fetch(indexRequest);
  }
};

