import { useState } from "react";
import Icon from "@/components/ui/icon";

type LostTab = "lost" | "found";

const LOST_ITEMS = [
  {
    id: 1,
    type: "lost" as LostTab,
    title: "Потерялся рыжий кот Барсик",
    desc: "Рыжий полосатый, зелёные глаза, на ошейнике жетон. Убежал со двора 25 марта.",
    location: "Иркутск, Свердловский р-н",
    date: "25 марта",
    reward: "Вознаграждение",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
    contact: "+7 (914) 123-45-67",
    tag: "Животное",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    id: 2,
    type: "lost" as LostTab,
    title: "Потерян чёрный кожаный кошелёк",
    desc: "Утерян в районе ТЦ Карамель 26 марта. Внутри документы. Очень прошу вернуть.",
    location: "Иркутск, ул. Байкальская",
    date: "26 марта",
    reward: "Вознаграждение 5 000 ₽",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    contact: "+7 (950) 111-22-33",
    tag: "Вещь",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    type: "found" as LostTab,
    title: "Найдена белая собака (хаски)",
    desc: "Нашли во дворе на ул. Лермонтова. Добрая, ухоженная, без адресника. Ищем хозяев.",
    location: "Иркутск, ул. Лермонтова",
    date: "27 марта",
    reward: "",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&q=80",
    contact: "+7 (924) 999-00-11",
    tag: "Животное",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    id: 4,
    type: "found" as LostTab,
    title: "Найден телефон Samsung",
    desc: "Найден на остановке около ТЮЗа. Экран разбит, телефон работает. Обращайтесь.",
    location: "Иркутск, ул. Октябрьской Революции",
    date: "28 марта",
    reward: "",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    contact: "+7 (902) 777-88-99",
    tag: "Вещь",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 5,
    type: "lost" as LostTab,
    title: "Пропала трёхцветная кошка",
    desc: "Кошка Муся, 3 года. Трёхцветная, пугливая. Пропала с балкона. Район Первомайского.",
    location: "Иркутск, Первомайский р-н",
    date: "24 марта",
    reward: "Вознаграждение 2 000 ₽",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80",
    contact: "+7 (914) 456-78-90",
    tag: "Животное",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    id: 6,
    type: "lost" as LostTab,
    title: "Потеряны ключи с брелоком",
    desc: "Ключи от квартиры на связке с красным брелоком-собачкой. Утеряны в районе рынка.",
    location: "Иркутск, Центральный рынок",
    date: "27 марта",
    reward: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    contact: "+7 (930) 555-66-77",
    tag: "Вещь",
    tagColor: "bg-blue-100 text-blue-700",
  },
];

export default function LostPage() {
  const [tab, setTab] = useState<LostTab>("lost");
  const [showForm, setShowForm] = useState(false);

  const filtered = LOST_ITEMS.filter(i => i.type === tab);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-8 mb-8">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center">
                <Icon name="SearchX" size={16} className="text-orange-400" />
              </div>
              <span className="text-orange-400 text-sm font-semibold tracking-wide uppercase">Потеряшки</span>
            </div>
            <h1 className="font-oswald font-bold text-3xl text-white leading-tight mb-1">
              Потерял или нашёл?
            </h1>
            <p className="text-white/60 text-sm max-w-md">
              Раздел для поиска потерявшихся животных и вещей. Помогаем вернуть домой — людей, питомцев и ценности.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="shrink-0 gradient-brand text-white font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
          >
            <Icon name="Plus" size={16} />
            Подать объявление
          </button>
        </div>

        {/* Stats */}
        <div className="relative flex gap-6 mt-6 pt-6 border-t border-white/10">
          {[
            { icon: "PawPrint", label: "Животных", value: "47" },
            { icon: "Package", label: "Вещей", value: "83" },
            { icon: "CheckCircle2", label: "Нашли хозяев", value: "312" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <Icon name={s.icon} size={16} className="text-orange-400" />
              <span className="font-oswald font-bold text-white text-lg">{s.value}</span>
              <span className="text-white/50 text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit mb-6">
        <button
          onClick={() => setTab("lost")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            tab === "lost" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon name="SearchX" size={15} />
          Потеряли
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tab === "lost" ? "bg-orange-100 text-orange-600" : "bg-border text-muted-foreground"}`}>
            {LOST_ITEMS.filter(i => i.type === "lost").length}
          </span>
        </button>
        <button
          onClick={() => setTab("found")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            tab === "found" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon name="Search" size={15} />
          Нашли
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tab === "found" ? "bg-green-100 text-green-600" : "bg-border text-muted-foreground"}`}>
            {LOST_ITEMS.filter(i => i.type === "found").length}
          </span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className="bg-white border border-border rounded-2xl overflow-hidden card-hover cursor-pointer animate-fade-in"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Tag */}
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${item.tagColor}`}>
                {item.tag}
              </span>
              {/* Type badge */}
              <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
                item.type === "lost"
                  ? "bg-red-500/90 text-white"
                  : "bg-green-500/90 text-white"
              }`}>
                {item.type === "lost" ? "Потеряли" : "Нашли"}
              </span>
              {item.reward && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  <Icon name="Gift" size={11} />
                  {item.reward}
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-foreground text-sm mb-1.5 line-clamp-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{item.desc}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Icon name="MapPin" size={11} className="text-orange-400" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={11} />
                  {item.date}
                </span>
              </div>

              <a
                href={`tel:${item.contact}`}
                className="w-full gradient-brand text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                onClick={e => e.stopPropagation()}
              >
                <Icon name="Phone" size={13} />
                {item.contact}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Tip banner */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <Icon name="Info" size={20} className="text-blue-500" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-1">Советы по поиску</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Разместите объявление с чёткой фотографией и точным адресом. Укажите вознаграждение — это увеличивает шансы на возврат. При нахождении чужого питомца свяжитесь с ближайшей ветклиникой для проверки чипа.
          </p>
        </div>
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-oswald font-bold text-xl uppercase">Новое объявление</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-xl hover:bg-muted transition-colors">
                <Icon name="X" size={18} className="text-muted-foreground" />
              </button>
            </div>

            <div className="flex gap-1 bg-muted p-1 rounded-xl mb-5">
              {(["lost", "found"] as LostTab[]).map(t => (
                <button key={t} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} onClick={() => setTab(t)}>
                  {t === "lost" ? "Потерял" : "Нашёл"}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {[
                { label: "Заголовок", placeholder: "Потерялся рыжий кот...", type: "text" },
                { label: "Описание", placeholder: "Подробное описание...", type: "textarea" },
                { label: "Место", placeholder: "Иркутск, район...", type: "text" },
                { label: "Телефон", placeholder: "+7 (914) ...", type: "tel" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">{f.label}</label>
                  {f.type === "textarea"
                    ? <textarea rows={3} placeholder={f.placeholder} className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 resize-none" />
                    : <input type={f.type} placeholder={f.placeholder} className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400" />
                  }
                </div>
              ))}
              <button
                onClick={() => setShowForm(false)}
                className="gradient-brand text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity mt-1"
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
