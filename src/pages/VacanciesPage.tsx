import { useState } from "react";
import { VACANCIES, LOCATIONS } from "@/data/listings";
import Icon from "@/components/ui/icon";

const TYPE_LABELS: Record<string, string> = {
  full: "Полная занятость",
  part: "Частичная",
  remote: "Удалённо",
  contract: "Контракт",
};

const TYPE_COLORS: Record<string, string> = {
  full: "bg-green-100 text-green-700",
  part: "bg-blue-100 text-blue-700",
  remote: "bg-purple-100 text-purple-700",
  contract: "bg-amber-100 text-amber-700",
};

const JOB_CATEGORIES = ["Все", "IT", "Продажи", "Транспорт", "HoReCa", "Дизайн", "Бухгалтерия", "Медицина", "Строительство"];

export default function VacanciesPage() {
  const [activeJobCat, setActiveJobCat] = useState("Все");
  const [activeTab, setActiveTab] = useState<"vacancies" | "resumes">("vacancies");
  const [favs, setFavs] = useState<number[]>(VACANCIES.filter(v => v.isFavorite).map(v => v.id));

  const toggleFav = (id: number) => {
    setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filtered = activeJobCat === "Все" ? VACANCIES : VACANCIES.filter(v => v.category === activeJobCat);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-oswald font-bold text-3xl text-foreground uppercase">Работа в Иркутской области</h1>
          <p className="text-muted-foreground text-sm mt-1">Вакансии и предложения о работе</p>
        </div>
        <button className="gradient-brand text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
          <Icon name="Plus" size={16} />
          Разместить вакансию
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit mb-6">
        {[
          { id: "vacancies", label: "Вакансии", icon: "Building2" },
          { id: "resumes", label: "Резюме", icon: "UserCheck" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "vacancies" | "resumes")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={tab.icon} size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar filters */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-border rounded-2xl p-4 sticky top-24">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Icon name="SlidersHorizontal" size={14} className="text-orange-500" />
              Фильтры
            </h3>

            {/* Category */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Сфера</label>
              <div className="flex flex-col gap-1">
                {JOB_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveJobCat(cat)}
                    className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      activeJobCat === cat
                        ? "gradient-brand text-white font-semibold"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Город</label>
              <select className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 bg-white">
                <option>Вся область</option>
                {LOCATIONS.map(loc => <option key={loc}>{loc}</option>)}
              </select>
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Зарплата от, ₽</label>
              <input
                type="number"
                placeholder="Например, 50000"
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30"
              />
            </div>

            {/* Type */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Тип занятости</label>
              <div className="flex flex-col gap-1.5">
                {Object.entries(TYPE_LABELS).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded accent-orange-500" />
                    <span className="text-sm text-foreground">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="mt-4 w-full gradient-brand text-white font-semibold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
              Применить
            </button>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-3">
          {activeTab === "vacancies" ? (
            <div className="flex flex-col gap-4">
              {filtered.map((vac, i) => (
                <div
                  key={vac.id}
                  className="card-hover bg-white border border-border rounded-2xl p-5 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`badge-category text-[11px] ${TYPE_COLORS[vac.type]}`}>{TYPE_LABELS[vac.type]}</span>
                        <span className="badge-category text-[11px] bg-gray-100 text-gray-600">{vac.category}</span>
                      </div>
                      <h3 className="font-oswald font-bold text-lg text-foreground mb-1">{vac.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Icon name="Building2" size={13} className="text-orange-400" />
                        {vac.company}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{vac.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" size={11} className="text-orange-400" />
                          {vac.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={11} className="text-orange-400" />
                          {vac.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); toggleFav(vac.id); }}
                        className="p-2 rounded-xl hover:bg-muted transition-colors"
                      >
                        <Icon name="Heart" size={18} className={favs.includes(vac.id) ? "text-red-500 fill-red-500" : "text-muted-foreground"} />
                      </button>
                      <div className="text-right">
                        <div className="font-oswald font-bold text-lg text-orange-500">{vac.salary}</div>
                        <button className="mt-2 gradient-brand text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                          Откликнуться
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-border rounded-2xl p-10 text-center">
              <Icon name="UserSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-oswald font-bold text-xl text-foreground mb-2">Раздел резюме</h3>
              <p className="text-muted-foreground text-sm mb-6">Здесь соискатели размещают свои резюме для поиска работы</p>
              <button className="gradient-brand text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Разместить резюме
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
