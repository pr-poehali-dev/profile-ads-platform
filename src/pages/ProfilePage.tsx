import { useState } from "react";
import { Page, User } from "@/App";
import { LISTINGS } from "@/data/listings";
import CoinRating from "@/components/CoinRating";
import Icon from "@/components/ui/icon";

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
  user: User | null;
  onLogout: () => void;
}

const TABS = [
  { id: "listings", label: "Мои объявления", icon: "Tag" },
  { id: "settings", label: "Настройки", icon: "Settings" },
  { id: "notifications", label: "Уведомления", icon: "Bell" },
];

export default function ProfilePage({ onNavigate, user, onLogout }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("listings");
  const myListings = LISTINGS.slice(0, 4);
  const displayName = user?.name || "Алексей Петров";
  const initials = displayName.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile header */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative">
            <div className="w-20 h-20 gradient-brand rounded-2xl flex items-center justify-center shadow-lg">
              <span className="font-oswald font-bold text-4xl text-white">{initials}</span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
              <Icon name="Camera" size={13} className="text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-oswald font-bold text-2xl text-foreground">{displayName}</h1>
            <p className="text-muted-foreground text-sm mt-0.5 flex items-center gap-1.5 justify-center sm:justify-start">
              <Icon name="MapPin" size={13} className="text-orange-600" />
              Иркутск
            </p>
            <div className="flex items-center gap-4 mt-3 justify-center sm:justify-start flex-wrap">
              <div className="flex items-center gap-2">
                <CoinRating rating={5} size="sm" />
                <span className="font-semibold text-sm text-amber-600">4.8</span>
                <button
                  onClick={() => onNavigate("seller")}
                  className="text-xs text-muted-foreground hover:text-orange-600 transition-colors"
                >(24 отзыва)</button>
              </div>
              <div className="text-xs text-muted-foreground">На сайте с марта 2024</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <button className="gradient-brand text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm flex items-center gap-2">
              <Icon name="Plus" size={16} />
              Подать объявление
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 transition-colors"
            >
              <Icon name="LogOut" size={13} />
              Выйти из аккаунта
            </button>
            <div className="flex items-center gap-3 text-sm">
              <div className="text-center">
                <div className="font-oswald font-bold text-xl gradient-brand-text">{myListings.length}</div>
                <div className="text-xs text-muted-foreground">Объявлений</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="font-oswald font-bold text-xl gradient-brand-text">3</div>
                <div className="text-xs text-muted-foreground">Избранных</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="font-oswald font-bold text-xl gradient-brand-text">12</div>
                <div className="text-xs text-muted-foreground">Сделок</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit mb-6">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={tab.icon} size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* My listings */}
      {activeTab === "listings" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-oswald font-bold text-xl uppercase">Мои объявления</h2>
            <button className="gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
              <Icon name="Plus" size={14} />
              Новое
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {myListings.map(listing => (
              <div key={listing.id} className="bg-white border border-border rounded-2xl p-4 flex items-center gap-4 card-hover cursor-pointer">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm line-clamp-1">{listing.title}</h3>
                  <div className="font-oswald font-bold text-orange-500 mt-1">
                    {listing.price ? `${listing.price.toLocaleString("ru")} ₽` : "Договорная"}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Icon name="MapPin" size={10} className="text-orange-400" />{listing.location}</span>
                    <span className="flex items-center gap-1"><Icon name="Eye" size={10} />{listing.views} просмотров</span>
                    <span>{listing.date}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    listing.isNew ? "bg-orange-100 text-orange-700" : "bg-muted text-muted-foreground"
                  }`}>
                    {listing.isNew ? "Активно" : "Обычное"}
                  </span>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Редактировать">
                      <Icon name="Pencil" size={14} className="text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Удалить">
                      <Icon name="Trash2" size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      {activeTab === "settings" && (
        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="font-oswald font-bold text-xl uppercase mb-6">Настройки профиля</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
            {[
              { label: "Имя", value: "Алексей", type: "text" },
              { label: "Фамилия", value: "Петров", type: "text" },
              { label: "Email", value: "alex@example.com", type: "email" },
              { label: "Телефон", value: "+7 (914) 000-00-00", type: "tel" },
              { label: "Город", value: "Иркутск", type: "text" },
            ].map(field => (
              <div key={field.label}>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                />
              </div>
            ))}
          </div>
          <button className="mt-6 gradient-brand text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
            Сохранить изменения
          </button>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="font-oswald font-bold text-xl uppercase mb-6">Уведомления</h2>
          <div className="flex flex-col gap-3">
            {[
              { icon: "MessageCircle", title: "Новое сообщение", desc: "Пользователь написал по объявлению «iPhone 14 Pro»", time: "2 мин назад", unread: true },
              { icon: "Eye", title: "Просмотры объявления", desc: "Ваше объявление просмотрели 15 раз за сегодня", time: "1 час назад", unread: true },
              { icon: "Heart", title: "Добавлено в избранное", desc: "Кто-то добавил ваше объявление в избранное", time: "3 часа назад", unread: false },
              { icon: "Star", title: "Новый отзыв", desc: "Покупатель оставил отзыв ★★★★★", time: "Вчера", unread: false },
            ].map((notif, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl transition-colors cursor-pointer ${notif.unread ? "bg-orange-50 border border-orange-100" : "hover:bg-muted border border-transparent"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.unread ? "gradient-brand" : "bg-muted"}`}>
                  <Icon name={notif.icon} size={18} className={notif.unread ? "text-white" : "text-muted-foreground"} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm font-semibold ${notif.unread ? "text-foreground" : "text-muted-foreground"}`}>{notif.title}</h3>
                    <span className="text-xs text-muted-foreground shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{notif.desc}</p>
                </div>
                {notif.unread && <div className="w-2 h-2 gradient-brand rounded-full mt-1.5 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}