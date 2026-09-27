import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Derlemede her sayfa önceden çizilir (scripts/prerender.mjs); o hâlde
// mevcut HTML canlandırılır, geliştirme sunucusunda sıfırdan çizilir.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
