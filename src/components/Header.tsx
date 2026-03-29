import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "catalog", label: "Каталог", icon: "Grid3X3" },
  { id: "vacancies", label: "Работа", icon: "Briefcase" },
  { id: "lost", label: "Потеряшки", icon: "SearchX" },
  { id: "saved", label: "Избранное", icon: "Heart" },
  { id: "support", label: "Поддержка", icon: "LifeBuoy" },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center gap-4 py-3">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            {/* Logo mark — П монограмма */}
            <div className="relative w-10 h-10 shrink-0">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#166534"/>
                    <stop offset="100%" stopColor="#16a34a"/>
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="11" fill="url(#logoGrad)"/>
                {/* П — горизонтальная перекладина */}
                <rect x="9" y="10" width="22" height="4.5" rx="2.25" fill="white"/>
                {/* Левая стойка */}
                <rect x="9" y="10" width="5" height="20" rx="2.5" fill="white"/>
                {/* Правая стойка */}
                <rect x="26" y="10" width="5" height="20" rx="2.5" fill="white"/>
              </svg>
            </div>
            {/* Wordmark */}
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-oswald font-bold text-[22px] tracking-wide gradient-brand-text leading-none">ПРОФАЙЛ</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5 font-medium">Иркутская область</span>
            </div>
          </button>

          {/* Search */}
          <div className="flex-1 relative max-w-xl mx-auto">
            <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Поиск объявлений..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate("saved")}
              className="relative p-2 rounded-xl hover:bg-muted transition-colors"
              title="Избранное"
            >
              <Icon name="Heart" size={20} className="text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 gradient-brand rounded-full text-white text-[9px] flex items-center justify-center font-bold">3</span>
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors"
            >
              <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center">
                <span className="text-white text-xs font-bold">А</span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground">Кабинет</span>
            </button>
            <button className="gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity hidden sm:flex items-center gap-1.5 shadow-md">
              <Icon name="Plus" size={15} />
              Подать объявление
            </button>
            {/* Burger */}
            <button
              className="sm:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-1 pb-2">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                currentPage === item.id
                  ? "active text-orange-500 bg-orange-50"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="MapPin" size={13} className="text-orange-400" />
            <span>Иркутская область</span>
          </div>
        </nav>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-border bg-white animate-fade-in">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? "gradient-brand text-white"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            ))}
            <button className="mt-2 gradient-brand text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
              <Icon name="Plus" size={16} />
              Подать объявление
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}