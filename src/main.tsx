import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 🔁 Netlify SPA fallback: restore deep link after 404.html redirect
const redirect = sessionStorage.getItem("redirect");
if (redirect) {
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")!).render(<App />);
