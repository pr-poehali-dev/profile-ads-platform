import { useState } from "react";
import { Listing } from "@/data/listings";
import Icon from "@/components/ui/icon";

const CATEGORY_LABELS: Record<string, string> = {
  electronics: "Электроника",
  furniture: "Мебель",
  clothes: "Одежда",
  transport: "Авто",
  realty: "Недвижимость",
  services: "Услуги",
  barter: "Бартер",
  jobs: "Работа",
};

const CATEGORY_COLORS: Record<string, string> = {
  electronics: "bg-blue-100 text-blue-700",
  furniture: "bg-amber-100 text-amber-700",
  clothes: "bg-pink-100 text-pink-700",
  transport: "bg-green-100 text-green-700",
  realty: "bg-purple-100 text-purple-700",
  services: "bg-teal-100 text-teal-700",
  barter: "bg-orange-100 text-orange-700",
  jobs: "bg-indigo-100 text-indigo-700",
};

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [fav, setFav] = useState(listing.isFavorite);

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)} млн ₽`;
    if (price >= 1000) return `${Math.floor(price / 1000)} ${price % 1000 > 0 ? price % 1000 : "000"} ₽`;
    return `${price} ₽`;
  };

  return (
    <div className="card-hover bg-white rounded-2xl overflow-hidden border border-border shadow-sm group cursor-pointer animate-fade-in">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {listing.isNew && (
            <span className="badge-category bg-orange-500 text-white text-[10px] px-2 py-0.5">Новое</span>
          )}
          {listing.isUrgent && (
            <span className="badge-category bg-red-500 text-white text-[10px] px-2 py-0.5">Срочно</span>
          )}
        </div>
        {/* Fav */}
        <button
          onClick={e => { e.stopPropagation(); setFav(!fav); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Icon
            name="Heart"
            size={15}
            className={fav ? "text-red-500 fill-red-500" : "text-gray-400"}
          />
        </button>
        {/* Category */}
        <span className={`absolute bottom-2 left-2 badge-category ${CATEGORY_COLORS[listing.category]}`}>
          {CATEGORY_LABELS[listing.category]}
        </span>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 mb-2 font-golos">
          {listing.title}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="font-oswald font-bold text-lg text-orange-500">
            {listing.price ? formatPrice(listing.price) : "Договорная"}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="Eye" size={12} />
            <span>{listing.views}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="MapPin" size={11} className="text-orange-400" />
            {listing.location}
          </span>
          <span>{listing.date}</span>
        </div>
      </div>
    </div>
  );
}
