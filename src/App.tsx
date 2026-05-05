import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import RisksPage from "./pages/RisksPage";
import ProfilePage from "./pages/ProfilePage";

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
