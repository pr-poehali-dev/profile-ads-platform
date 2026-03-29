import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import VacanciesPage from "@/pages/VacanciesPage";
import LostPage from "@/pages/LostPage";
import SavedPage from "@/pages/SavedPage";
import ProfilePage from "@/pages/ProfilePage";
import SupportPage from "@/pages/SupportPage";
import SellerPage from "@/pages/SellerPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

export type Page = "home" | "catalog" | "vacancies" | "lost" | "saved" | "profile" | "support" | "seller";

export interface User {
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (name: string) => {
    setUser({ name });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage onNavigate={setCurrentPage} />;
      case "catalog": return <CatalogPage onNavigate={setCurrentPage} />;
      case "vacancies": return <VacanciesPage />;
      case "lost": return <LostPage />;
      case "saved": return <SavedPage onNavigate={setCurrentPage} />;
      case "profile": return <ProfilePage onNavigate={setCurrentPage} user={user} onLogout={handleLogout} />;
      case "support": return <SupportPage />;
      case "seller": return <SellerPage onNavigate={setCurrentPage} />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col bg-background">
        <Header
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          user={user}
          onOpenAuth={() => setShowAuth(true)}
        />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
        />
      )}
    </TooltipProvider>
  );
}
