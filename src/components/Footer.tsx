import { Page } from "@/App";
import Icon from "@/components/ui/icon";

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
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#166534"/>
                    <stop offset="100%" stopColor="#16a34a"/>
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="11" fill="url(#footerLogoGrad)"/>
                <rect x="9" y="10" width="22" height="4.5" rx="2.25" fill="white"/>
                <rect x="9" y="10" width="5" height="20" rx="2.5" fill="white"/>
                <rect x="26" y="10" width="5" height="20" rx="2.5" fill="white"/>
              </svg>
              <span className="font-oswald font-bold text-xl gradient-brand-text">ПРОФАЙЛ</span>
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
                <span>info@profile38.ru</span>
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
          <p className="text-xs text-gray-500">© 2024 Профайл. Все права защищены.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <button className="hover:text-gray-300 transition-colors">Политика конфиденциальности</button>
            <button className="hover:text-gray-300 transition-colors">Правила использования</button>
          </div>
        </div>
      </div>
    </footer>
  );
}