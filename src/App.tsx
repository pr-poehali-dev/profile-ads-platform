import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import VacanciesPage from "@/pages/VacanciesPage";
import BarterPage from "@/pages/BarterPage";
import SavedPage from "@/pages/SavedPage";
import ProfilePage from "@/pages/ProfilePage";
import SupportPage from "@/pages/SupportPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export type Page = "home" | "catalog" | "vacancies" | "barter" | "saved" | "profile" | "support";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage onNavigate={setCurrentPage} />;
      case "catalog": return <CatalogPage />;
      case "vacancies": return <VacanciesPage />;
      case "barter": return <BarterPage />;
      case "saved": return <SavedPage onNavigate={setCurrentPage} />;
      case "profile": return <ProfilePage onNavigate={setCurrentPage} />;
      case "support": return <SupportPage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col bg-background">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
    </TooltipProvider>
  );
}
