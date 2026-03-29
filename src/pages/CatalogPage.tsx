import { useState } from "react";
import { LISTINGS } from "@/data/listings";
import ListingCard from "@/components/ListingCard";
import FilterBar from "@/components/FilterBar";
import Icon from "@/components/ui/icon";

export default function CatalogPage({ onNavigate }: { onNavigate?: (page: import("@/App").Page) => void }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? LISTINGS
    : LISTINGS.filter(l => l.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="font-oswald font-bold text-3xl text-foreground uppercase">Каталог объявлений</h1>
        <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full ml-2">{filtered.length}</span>
      </div>

      <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-oswald font-bold text-xl text-muted-foreground mb-2">Объявлений не найдено</h3>
            <p className="text-sm text-muted-foreground">Попробуйте изменить фильтры или категорию</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {filtered.map((listing, i) => (
              <div key={listing.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <ListingCard listing={listing} onSellerClick={() => onNavigate?.("seller")} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load more */}
      {filtered.length > 0 && (
        <div className="text-center mt-10">
          <button className="border-2 border-orange-400 text-orange-500 font-semibold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors flex items-center gap-2 mx-auto">
            <Icon name="RefreshCw" size={16} />
            Загрузить ещё
          </button>
        </div>
      )}
    </div>
  );
}