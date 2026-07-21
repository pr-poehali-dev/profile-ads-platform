import { useState, useEffect } from "react";
import { Page } from "@/App";
import { LISTINGS, CATEGORIES } from "@/data/listings";
import ListingCard from "@/components/ListingCard";
import Icon from "@/components/ui/icon";
import AdRequestModal from "@/components/AdRequestModal";
import Logo from "@/components/Logo";

const AD_BANNERS_URL = "https://functions.poehali.dev/35905cb1-28ca-4992-aa49-ac10ddaa9758";

interface AdBanner {
  id: number;
  slot: number;
  advertiser_name: string | null;
  link_url: string | null;
  image_url: string | null;
  is_active: boolean;
}

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const STATS = [
  { value: "12 400+", label: "Объявлений" },
  { value: "8 500+", label: "Пользователей" },
  { value: "340+", label: "Вакансий" },
  { value: "1 200+", label: "Сделок в месяц" },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const recentListings = LISTINGS.slice(0, 8);
  const [banners, setBanners] = useState<AdBanner[]>([]);
  const [showAdModal, setShowAdModal] = useState(false);

  useEffect(() => {
    fetch(AD_BANNERS_URL)
      .then((r) => r.json())
      .then((d) => setBanners(d.banners || []))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero noise-bg relative overflow-hidden bg-orange-500">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/cf4bcebb-fbbf-4dd7-ad23-5aa626b4ece3.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b1a]/90 via-[#0d2b1a]/40 to-[#0d2b1a]/50" />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <Icon name="MapPin" size={14} className="text-orange-400" />
              <span className="text-white/80 text-sm">Иркутская область</span>
            </div>

            {/* Hero logo wordmark */}
            <div className="flex items-center justify-center gap-4 mb-5 animate-fade-in stagger-1">
              <Logo size={52} light className="text-orange-500" />
              <span className="font-oswald font-bold text-5xl sm:text-6xl text-white tracking-wide leading-none">ЛЕВША</span>
            </div>
            <p className="text-white/70 text-lg mb-8 animate-fade-in stagger-2">
              Продавайте, покупайте, ищите работу и обменивайтесь — всё в одном месте для жителей Иркутской области
            </p>

            {/* Search hero */}
            <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto animate-fade-in stagger-3 mb-8">
              <input
                placeholder="Что ищете? Телефон, диван, работа..."
                className="flex-1 px-4 py-2.5 text-sm bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
              />
              <select className="text-sm border-l border-border pl-3 pr-2 py-2.5 bg-transparent focus:outline-none text-muted-foreground">
                <option>Иркутск</option>
                <option>Ангарск</option>
                <option>Братск</option>
                <option>Вся область</option>
              </select>
              <button className="gradient-brand text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm flex items-center gap-1.5 shadow-md">
                <Icon name="Search" size={16} />
                Найти
              </button>
            </div>

            {/* Quick categories */}
            <div className="flex flex-wrap justify-center gap-2 animate-fade-in stagger-4">
              {CATEGORIES.slice(0, 6).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => onNavigate("catalog")}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all rounded-full px-3 py-1.5 text-xs font-medium"
                >
                  <Icon name={cat.icon} size={12} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ad banners strip */}
        <div className="relative mt-4 pb-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((slot) => {
                const banner = banners.find((b) => b.slot === slot && b.is_active);
                return banner ? (
                  <a
                    key={slot}
                    href={banner.link_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-24 rounded-xl overflow-hidden border border-white/20 hover:scale-[1.02] transition-transform"
                  >
                    <img src={banner.image_url!} alt={banner.advertiser_name || "Реклама"} className="w-full h-full object-cover" />
                  </a>
                ) : (
                  <button
                    key={slot}
                    onClick={() => setShowAdModal(true)}
                    className="flex items-center justify-center h-24 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white/50 text-sm font-medium hover:bg-white/15 transition-colors"
                  >
                    Здесь могла бы быть ваша реклама
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {showAdModal && <AdRequestModal onClose={() => setShowAdModal(false)} />}
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-oswald font-bold text-2xl gradient-brand-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-oswald font-bold text-2xl text-foreground uppercase">Категории</h2>
          <button onClick={() => onNavigate("catalog")} className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
            Все категории <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onNavigate("catalog")}
              className={`card-hover flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-white animate-fade-in stagger-${Math.min(i + 1, 6)} hover:border-orange-300`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                <Icon name={cat.icon} size={20} />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recent listings */}
      <section className="container mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-oswald font-bold text-2xl text-foreground uppercase">Свежие объявления</h2>
          <button onClick={() => onNavigate("catalog")} className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
            Смотреть все <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentListings.map((listing, i) => (
            <div key={listing.id} style={{ animationDelay: `${i * 0.07}s` }}>
              <ListingCard listing={listing} onSellerClick={() => onNavigate("seller")} />
            </div>
          ))}
        </div>
      </section>

      {/* Jobs & Barter promo */}
      <section className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Jobs promo */}
          <div
            className="card-hover relative overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => onNavigate("vacancies")}
          >
            <img
              src="https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/d6695b96-d82b-4f00-a53a-5f8b918f8757.jpg"
              alt="Работа"
              className="w-full h-52 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-900/40 flex flex-col justify-center px-8">
              <span className="badge-category bg-purple-400/30 text-white w-fit mb-3 text-xs border border-purple-300/30">
                340+ вакансий
              </span>
              <h3 className="font-oswald font-bold text-white text-2xl uppercase mb-1">Работа в Иркутске</h3>
              <p className="text-white/70 text-sm mb-4">Вакансии от лучших работодателей области</p>
              <span className="flex items-center gap-2 text-white font-semibold text-sm">
                Смотреть вакансии <Icon name="ArrowRight" size={16} />
              </span>
            </div>
          </div>

          {/* Lost promo */}
          <div
            className="card-hover relative overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => onNavigate("lost")}
          >
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80"
              alt="Потеряшки"
              className="w-full h-52 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/50 flex flex-col justify-center px-8">
              <span className="badge-category bg-orange-400/30 text-white w-fit mb-3 text-xs border border-orange-300/30">
                130+ объявлений
              </span>
              <h3 className="font-oswald font-bold text-white text-2xl uppercase mb-1">Потеряшки</h3>
              <p className="text-white/70 text-sm mb-4">Потерялись или нашли питомца, вещь?</p>
              <span className="flex items-center gap-2 text-white font-semibold text-sm">
                Смотреть объявления <Icon name="ArrowRight" size={16} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="container mx-auto px-4 pb-10">
        <div className="gradient-brand rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="font-oswald font-bold text-white text-3xl sm:text-4xl uppercase mb-3">
              Продайте быстро и выгодно
            </h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Размещайте объявления бесплатно. Тысячи покупателей в Иркутской области ждут ваших предложений.
            </p>
            <button className="bg-white text-orange-600 font-oswald font-bold text-lg px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
              Подать объявление бесплатно
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}