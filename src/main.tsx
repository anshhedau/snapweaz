import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { preloadAllImages } from "./lib/preloadImages";

// Preload all site images immediately
preloadAllImages();

// 🔁 Netlify SPA fallback: restore deep link after 404.html redirect
const redirect = sessionStorage.getItem("redirect");
if (redirect) {
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", redirect);
}

const rootEl = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// react-snap prerenders the app to static HTML at build time — hydrate that
// markup on load instead of throwing it away. Falls back to createRoot when
// no prerendered content exists (dev mode, SPA fallback routes).
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

