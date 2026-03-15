import { useState } from "react";
import { CATEGORIES, LOCATIONS } from "@/data/listings";
import Icon from "@/components/ui/icon";

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [location, setLocation] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white border border-border rounded-2xl shadow-sm">
      {/* Categories scroll */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onCategoryChange("all")}
            className={`filter-chip shrink-0 ${activeCategory === "all" ? "active" : ""}`}
          >
            Все
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`filter-chip shrink-0 flex items-center gap-1.5 ${activeCategory === cat.id ? "active" : ""}`}
            >
              <Icon name={cat.icon} size={13} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter toggle */}
      <div className="px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="SlidersHorizontal" size={16} />
          Расширенный поиск
          <Icon name={showFilters ? "ChevronUp" : "ChevronDown"} size={14} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Сортировка:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="text-sm border border-border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-400/30 bg-white"
          >
            <option value="date">По дате</option>
            <option value="price_asc">Цена ↑</option>
            <option value="price_desc">Цена ↓</option>
            <option value="popular">Популярные</option>
          </select>
        </div>
      </div>

      {/* Extended filters */}
      {showFilters && (
        <div className="px-4 pb-4 border-t border-border pt-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Price range */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Цена, ₽</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="От"
                  value={priceFrom}
                  onChange={e => setPriceFrom(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                />
                <span className="text-muted-foreground text-sm">—</span>
                <input
                  type="number"
                  placeholder="До"
                  value={priceTo}
                  onChange={e => setPriceTo(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Город</label>
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 bg-white"
              >
                <option value="all">Вся область</option>
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Дата размещения</label>
              <select className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 bg-white">
                <option value="all">Любая дата</option>
                <option value="today">Сегодня</option>
                <option value="week">За неделю</option>
                <option value="month">За месяц</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button className="gradient-brand text-white text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity">
              Применить
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 rounded-xl transition-colors">
              Сбросить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
