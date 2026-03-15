export type Category = "all" | "electronics" | "furniture" | "clothes" | "transport" | "realty" | "services" | "barter" | "jobs";

export interface Listing {
  id: number;
  title: string;
  price: number | null;
  priceLabel?: string;
  category: Exclude<Category, "all">;
  location: string;
  date: string;
  image: string;
  isFavorite: boolean;
  isNew?: boolean;
  isUrgent?: boolean;
  description: string;
  seller: string;
  views: number;
}

export interface Vacancy {
  id: number;
  title: string;
  company: string;
  salary: string;
  location: string;
  type: "full" | "part" | "remote" | "contract";
  date: string;
  category: string;
  description: string;
  isFavorite: boolean;
}

export interface BarterItem {
  id: number;
  title: string;
  offering: string;
  wanting: string;
  location: string;
  date: string;
  image: string;
  isFavorite: boolean;
  description: string;
  seller: string;
}

export const CATEGORIES = [
  { id: "electronics", label: "Электроника", icon: "Laptop", color: "bg-blue-100 text-blue-700" },
  { id: "furniture", label: "Мебель и интерьер", icon: "Sofa", color: "bg-amber-100 text-amber-700" },
  { id: "clothes", label: "Одежда и обувь", icon: "Shirt", color: "bg-pink-100 text-pink-700" },
  { id: "transport", label: "Авто и мото", icon: "Car", color: "bg-green-100 text-green-700" },
  { id: "realty", label: "Недвижимость", icon: "Home", color: "bg-purple-100 text-purple-700" },
  { id: "services", label: "Услуги", icon: "Briefcase", color: "bg-teal-100 text-teal-700" },
  { id: "barter", label: "Бартер", icon: "ArrowLeftRight", color: "bg-orange-100 text-orange-700" },
  { id: "jobs", label: "Работа", icon: "Users", color: "bg-indigo-100 text-indigo-700" },
];

export const LOCATIONS = ["Иркутск", "Ангарск", "Братск", "Усолье-Сибирское", "Шелехов", "Саянск", "Зима", "Тулун"];

export const LISTINGS: Listing[] = [
  {
    id: 1,
    title: "iPhone 14 Pro 256GB в идеале",
    price: 68000,
    category: "electronics",
    location: "Иркутск",
    date: "15 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: true,
    isNew: true,
    description: "Продаю iPhone 14 Pro 256GB, цвет Space Black. Полная комплектация, все работает идеально.",
    seller: "Максим К.",
    views: 234,
  },
  {
    id: 2,
    title: "Диван угловой IKEA SECTRAS",
    price: 25000,
    category: "furniture",
    location: "Ангарск",
    date: "14 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: false,
    isUrgent: true,
    description: "Угловой диван в хорошем состоянии, светло-серый. Самовывоз.",
    seller: "Ольга М.",
    views: 87,
  },
  {
    id: 3,
    title: "Куртка зимняя мужская 52р.",
    price: 4500,
    category: "clothes",
    location: "Иркутск",
    date: "14 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: false,
    description: "Тёплая куртка, носилась один сезон. Без дефектов.",
    seller: "Андрей Л.",
    views: 56,
  },
  {
    id: 4,
    title: "Toyota Camry 2019, 2.5 л.",
    price: 2100000,
    category: "transport",
    location: "Иркутск",
    date: "13 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: true,
    isNew: true,
    description: "Один владелец, не бита, не крашена. Полная комплектация.",
    seller: "Сергей В.",
    views: 512,
  },
  {
    id: 5,
    title: "Ноутбук Lenovo IdeaPad 5",
    price: 42000,
    category: "electronics",
    location: "Братск",
    date: "13 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: false,
    description: "Intel Core i5, 16GB RAM, 512 SSD. В отличном состоянии.",
    seller: "Наталья П.",
    views: 143,
  },
  {
    id: 6,
    title: "Стол письменный дубовый",
    price: 12000,
    category: "furniture",
    location: "Шелехов",
    date: "12 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: false,
    isUrgent: true,
    description: "Дубовый письменный стол 160x80 см. Без повреждений.",
    seller: "Иван Ф.",
    views: 67,
  },
  {
    id: 7,
    title: "PlayStation 5 + 3 игры",
    price: 55000,
    category: "electronics",
    location: "Иркутск",
    date: "12 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: false,
    isNew: true,
    description: "PS5 в комплекте с Spider-Man 2, FIFA 24 и GOW Ragnarök.",
    seller: "Дмитрий С.",
    views: 387,
  },
  {
    id: 8,
    title: "Кроссовки Nike Air Max 42р.",
    price: 3200,
    category: "clothes",
    location: "Ангарск",
    date: "11 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: true,
    description: "Оригинальные Nike Air Max 270, носились мало.",
    seller: "Алина Д.",
    views: 92,
  },
];

export const VACANCIES: Vacancy[] = [
  {
    id: 1,
    title: "Программист 1С",
    company: "ООО «ИТ-Решения»",
    salary: "80 000 – 120 000 ₽",
    location: "Иркутск",
    type: "full",
    date: "15 марта",
    category: "IT",
    description: "Разработка и поддержка конфигураций 1С:Предприятие 8.3. Опыт от 2 лет.",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Менеджер по продажам",
    company: "Сибирский торговый дом",
    salary: "50 000 – 90 000 ₽",
    location: "Иркутск",
    type: "full",
    date: "14 марта",
    category: "Продажи",
    description: "Активные продажи строительных материалов. КП и переговоры с клиентами.",
    isFavorite: true,
  },
  {
    id: 3,
    title: "Водитель категории B/C",
    company: "Транспортная компания «Байкал»",
    salary: "65 000 ₽",
    location: "Ангарск",
    type: "full",
    date: "14 марта",
    category: "Транспорт",
    description: "Доставка грузов по Иркутской области. Опыт от 3 лет.",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Повар / шеф-повар",
    company: "Ресторан «Байкальская кухня»",
    salary: "55 000 – 75 000 ₽",
    location: "Иркутск",
    type: "full",
    date: "13 марта",
    category: "HoReCa",
    description: "Приготовление блюд сибирской кухни. График 2/2.",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Дизайнер интерьера",
    company: "Студия «Пространство»",
    salary: "от 70 000 ₽",
    location: "Иркутск",
    type: "contract",
    date: "12 марта",
    category: "Дизайн",
    description: "Проектирование жилых и коммерческих интерьеров. Портфолио обязательно.",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Удалённый бухгалтер",
    company: "Аутсорсинговая компания",
    salary: "45 000 – 60 000 ₽",
    location: "Любой город",
    type: "remote",
    date: "12 марта",
    category: "Бухгалтерия",
    description: "Ведение бухгалтерского учёта для малого бизнеса. Полностью удалённо.",
    isFavorite: true,
  },
];

export const BARTER_ITEMS: BarterItem[] = [
  {
    id: 1,
    title: "Меняю велосипед горный на самокат",
    offering: "Горный велосипед Stels Navigator 27,5\"",
    wanting: "Электросамокат или городской самокат",
    location: "Иркутск",
    date: "15 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: false,
    description: "Велосипед в отличном состоянии, ездил 2 сезона. Хочу поменять на электросамокат.",
    seller: "Роман Б.",
  },
  {
    id: 2,
    title: "Меняю iPhone 13 на ноутбук",
    offering: "iPhone 13 128GB, синий",
    wanting: "Ноутбук для учёбы/работы",
    location: "Ангарск",
    date: "14 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: true,
    description: "Телефон без царапин, аккумулятор 94%. Нужен ноутбук для работы с документами.",
    seller: "Татьяна Р.",
  },
  {
    id: 3,
    title: "Обменяю фотоаппарат на дрон",
    offering: "Canon EOS 250D + объектив",
    wanting: "Квадрокоптер DJI или аналог",
    location: "Иркутск",
    date: "13 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: false,
    description: "Фотоаппарат в хорошем состоянии, около 5000 снимков. Интересует квадрокоптер для съёмки.",
    seller: "Виктор А.",
  },
  {
    id: 4,
    title: "Меняю диван на холодильник",
    offering: "Диван-кровать 160x200 см, бежевый",
    wanting: "Холодильник двухкамерный",
    location: "Братск",
    date: "12 марта",
    image: "https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/2e2d318d-1181-4913-a31d-3863c660d381.jpg",
    isFavorite: false,
    description: "Диван раскладной в хорошем состоянии. Нужен рабочий холодильник.",
    seller: "Светлана К.",
  },
];
