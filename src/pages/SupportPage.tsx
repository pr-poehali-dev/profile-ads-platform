import { useState } from "react";
import Icon from "@/components/ui/icon";

const FAQ = [
  { q: "Как разместить объявление?", a: "Нажмите кнопку «Подать объявление» в шапке сайта. Заполните форму: добавьте фото, название, описание и цену. Объявление появится сразу после публикации." },
  { q: "Сколько стоит размещение?", a: "Базовое размещение объявлений полностью бесплатно. Мы также предлагаем платное продвижение для увеличения видимости вашего объявления." },
  { q: "Как работает раздел Потеряшки?", a: "В разделе «Потеряшки» можно разместить объявление о потере или находке — животного или вещи. Укажите фото, описание и контакт для связи." },
  { q: "Как пожаловаться на объявление?", a: "На странице каждого объявления есть кнопка «Пожаловаться». Укажите причину — наши модераторы рассмотрят жалобу в течение 24 часов." },
  { q: "Как удалить своё объявление?", a: "Зайдите в раздел «Личный кабинет» → «Мои объявления». Нажмите на иконку корзины рядом с объявлением." },
  { q: "Как оставить отзыв о продавце?", a: "После завершения сделки вы можете оставить отзыв в профиле продавца. Это помогает другим пользователям сделать правильный выбор." },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Icon name="LifeBuoy" size={32} className="text-white" />
          </div>
          <h1 className="font-oswald font-bold text-3xl text-foreground uppercase mb-2">Центр поддержки</h1>
          <p className="text-muted-foreground">Помогаем разобраться с любыми вопросами</p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: "Phone", title: "Телефон", value: "+7 (3952) 00-00-00", note: "Пн–Пт: 9:00–20:00", color: "bg-blue-100 text-blue-600" },
            { icon: "Mail", title: "Email", value: "help@profile38.ru", note: "Ответим за 24 часа", color: "bg-purple-100 text-purple-600" },
            { icon: "MessageSquare", title: "Чат", value: "Онлайн-чат", note: "Сейчас онлайн", color: "bg-orange-100 text-orange-600" },
          ].map(contact => (
            <div key={contact.title} className="card-hover bg-white border border-border rounded-2xl p-5 text-center cursor-pointer">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${contact.color}`}>
                <Icon name={contact.icon} size={22} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{contact.title}</h3>
              <p className="font-oswald font-bold text-base gradient-brand-text">{contact.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{contact.note}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ */}
          <div>
            <h2 className="font-oswald font-bold text-2xl uppercase mb-4">Частые вопросы</h2>
            <div className="flex flex-col gap-2">
              {FAQ.map((item, i) => (
                <div key={i} className="bg-white border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
                  >
                    <span className="font-medium text-sm text-foreground pr-4">{item.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className={`shrink-0 transition-transform ${openFaq === i ? "text-orange-500" : "text-muted-foreground"}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 animate-fade-in">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-oswald font-bold text-2xl uppercase mb-4">Напишите нам</h2>
            <div className="bg-white border border-border rounded-2xl p-6">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle2" size={32} className="text-orange-500" />
                  </div>
                  <h3 className="font-oswald font-bold text-xl text-foreground mb-2">Обращение отправлено!</h3>
                  <p className="text-muted-foreground text-sm">Мы ответим на ваш вопрос в течение 24 часов</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-sm text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Отправить ещё одно
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Имя</label>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.ru"
                        className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Тема</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 bg-white">
                      <option>Выберите тему</option>
                      <option>Вопрос по объявлению</option>
                      <option>Проблема с аккаунтом</option>
                      <option>Жалоба на пользователя</option>
                      <option>Технические проблемы</option>
                      <option>Другое</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Сообщение</label>
                    <textarea
                      rows={5}
                      placeholder="Опишите ваш вопрос подробно..."
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 resize-none"
                    />
                  </div>

                  <button
                    onClick={() => setSent(true)}
                    className="gradient-brand text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Icon name="Send" size={16} />
                    Отправить обращение
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}