import { useState } from "react";
import { BARTER_ITEMS } from "@/data/listings";
import Icon from "@/components/ui/icon";

export default function BarterPage() {
  const [favs, setFavs] = useState<number[]>(BARTER_ITEMS.filter(b => b.isFavorite).map(b => b.id));

  const toggleFav = (id: number) => {
    setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="gradient-brand rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/40 blur-3xl" />
        </div>
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icon name="ArrowLeftRight" size={28} className="text-white" />
              <h1 className="font-oswald font-bold text-3xl text-white uppercase">Бартер и обмен</h1>
            </div>
            <p className="text-white/80 max-w-md">
              Обменивайтесь вещами без денег. Предложите что-то ценное и найдите то, что нужно именно вам.
            </p>
          </div>
          <button className="bg-white text-orange-600 font-oswald font-bold text-base px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg shrink-0 flex items-center gap-2">
            <Icon name="Plus" size={18} />
            Предложить обмен
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-8">
        <h2 className="font-oswald font-bold text-xl uppercase mb-4 text-center">Как работает бартер?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: "Package", step: "1", title: "Разместите объявление", desc: "Укажите что предлагаете и что хотите получить взамен" },
            { icon: "MessageCircle", step: "2", title: "Договоритесь", desc: "Свяжитесь с другим пользователем и обсудите условия обмена" },
            { icon: "Handshake", step: "3", title: "Совершите обмен", desc: "Встретьтесь и обменяйтесь вещами — без денег!" },
          ].map(item => (
            <div key={item.step} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 gradient-brand rounded-2xl flex items-center justify-center mb-3 shadow-md">
                <Icon name={item.icon} size={22} className="text-white" />
              </div>
              <span className="font-oswald font-bold text-sm text-orange-500 mb-1">Шаг {item.step}</span>
              <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Barter listings */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-oswald font-bold text-2xl uppercase">Предложения обмена</h2>
        <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
          {BARTER_ITEMS.length} объявлений
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {BARTER_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="card-hover bg-white border border-border rounded-2xl overflow-hidden cursor-pointer animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex">
              {/* Image */}
              <div className="relative w-40 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={e => { e.stopPropagation(); toggleFav(item.id); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <Icon name="Heart" size={13} className={favs.includes(item.id) ? "text-red-500 fill-red-500" : "text-gray-400"} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex-1">
                <h3 className="font-semibold text-sm text-foreground mb-3 leading-snug">{item.title}</h3>

                {/* Exchange */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2">
                    <span className="badge-category bg-orange-100 text-orange-700 text-[10px] shrink-0 mt-0.5">Отдам</span>
                    <span className="text-xs text-foreground">{item.offering}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="badge-category bg-purple-100 text-purple-700 text-[10px] shrink-0 mt-0.5">Возьму</span>
                    <span className="text-xs text-foreground">{item.wanting}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={10} className="text-orange-400" />
                      {item.location}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <button className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1">
                    Написать <Icon name="MessageCircle" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <button className="border-2 border-orange-400 text-orange-500 font-semibold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors flex items-center gap-2 mx-auto">
          <Icon name="RefreshCw" size={16} />
          Загрузить ещё предложения
        </button>
      </div>
    </div>
  );
}
