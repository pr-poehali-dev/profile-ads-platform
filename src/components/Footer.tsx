import { Page } from "@/App";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={36} />
              <span className="font-oswald font-bold text-xl gradient-brand-text">ЛЕВША</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Главная доска объявлений Иркутской области. Продавайте, покупайте, обменивайтесь и находите работу.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Icon name="MapPin" size={14} className="text-orange-400" />
              <span>Иркутская область</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-oswald font-semibold text-base mb-4 text-white uppercase tracking-wide">Разделы</h4>
            <ul className="space-y-2">
              {[
                { label: "Каталог объявлений", page: "catalog" as Page },
                { label: "Вакансии и работа", page: "vacancies" as Page },
                { label: "Потеряшки", page: "lost" as Page },
                { label: "Избранное", page: "saved" as Page },
                { label: "Личный кабинет", page: "profile" as Page },
              ].map(item => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-oswald font-semibold text-base mb-4 text-white uppercase tracking-wide">Категории</h4>
            <ul className="space-y-2">
              {["Электроника", "Мебель и интерьер", "Одежда и обувь", "Авто и мото", "Недвижимость", "Услуги"].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => onNavigate("catalog")}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-oswald font-semibold text-base mb-4 text-white uppercase tracking-wide">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Icon name="Phone" size={14} className="text-orange-400 mt-0.5 shrink-0" />
                <span>+7 (3952) 00-00-00</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Icon name="Mail" size={14} className="text-orange-400 mt-0.5 shrink-0" />
                <span>info@levsha38.ru</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Icon name="Clock" size={14} className="text-orange-400 mt-0.5 shrink-0" />
                <span>Пн–Пт: 9:00 – 20:00</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate("support")}
              className="mt-4 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
            >
              <Icon name="LifeBuoy" size={14} />
              Написать в поддержку
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2024 Левша. Все права защищены.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <button className="hover:text-gray-300 transition-colors">Политика конфиденциальности</button>
            <button className="hover:text-gray-300 transition-colors">Правила использования</button>
            <button onClick={() => onNavigate("admin")} className="hover:text-orange-400 transition-colors flex items-center gap-1">
              <Icon name="ShieldCheck" size={12} />
              Для администратора
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}