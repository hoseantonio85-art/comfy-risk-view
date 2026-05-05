import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import RisksPage from "./pages/RisksPage";
import ProfilePage from "./pages/ProfilePage";

// LOVABLE_KEEP_START
// Не изменять этот блок: специфическая настройка basename для GitHub Pages
const isGitHubPages = window.location.hostname.includes("github.io");
const basename = isGitHubPages ? "/comfy-risk-view" : "";
// LOVABLE_KEEP_END

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Страница, которую вы ищете, не существует или была перемещена.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
      {/* LOVABLE_KEEP_START */}
      <BrowserRouter basename={basename}>
      {/* LOVABLE_KEEP_END */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/risks" element={<RisksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
