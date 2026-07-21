import { useState } from "react";
import { Page } from "@/App";
import { LISTINGS } from "@/data/listings";
import CoinRating from "@/components/CoinRating";
import Icon from "@/components/ui/icon";
import ListingCard from "@/components/ListingCard";

interface SellerPageProps {
  onNavigate: (page: Page) => void;
}

const REVIEWS = [
  { id: 1, author: "Марина К.", avatar: "М", rating: 5, text: "Отличный продавец! Всё как на фото, быстро ответил, встретились без проблем. Рекомендую!", date: "20 марта 2026", verified: true },
  { id: 2, author: "Дмитрий П.", avatar: "Д", rating: 4, text: "Товар в хорошем состоянии, продавец вежливый. Немного задержался на встречу, но в целом всё хорошо.", date: "15 марта 2026", verified: true },
  { id: 3, author: "Анна В.", avatar: "А", rating: 5, text: "Уже второй раз покупаю у этого продавца. Всегда честно описывает состояние. Доверяю!", date: "10 марта 2026", verified: false },
  { id: 4, author: "Сергей Л.", avatar: "С", rating: 5, text: "Быстро, удобно, честно. Телефон в отличном состоянии, полный комплект. Спасибо!", date: "5 марта 2026", verified: true },
  { id: 5, author: "Ольга Ф.", avatar: "О", rating: 3, text: "В целом нормально, но торговаться не хотел. Товар соответствует описанию.", date: "28 февраля 2026", verified: false },
];

const RATING_DIST = [
  { stars: 5, count: 18, pct: 75 },
  { stars: 4, count: 4, pct: 17 },
  { stars: 3, count: 1, pct: 4 },
  { stars: 2, count: 1, pct: 4 },
  { stars: 1, count: 0, pct: 0 },
];

export default function SellerPage({ onNavigate }: SellerPageProps) {
  const [myRating, setMyRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState(REVIEWS);

  const avgRating = 4.8;
  const totalReviews = reviews.length;
  const sellerListings = LISTINGS.slice(0, 6);

  const handleSubmitReview = () => {
    if (!myRating || !reviewText.trim()) return;
    setReviews(prev => [{
      id: Date.now(),
      author: "Вы",
      avatar: "В",
      rating: myRating,
      text: reviewText,
      date: "Только что",
      verified: false,
    }, ...prev]);
    setSubmitted(true);
    setReviewText("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => onNavigate("catalog")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <Icon name="ArrowLeft" size={15} />
        Назад к каталогу
      </button>

      {/* Seller card */}
      <div className="bg-white border border-border rounded-3xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 gradient-brand rounded-2xl flex items-center justify-center shadow-lg">
              <span className="font-oswald font-bold text-5xl text-white">А</span>
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-orange-500 border-2 border-white rounded-full flex items-center justify-center" title="Онлайн">
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-oswald font-bold text-2xl text-foreground mb-0.5">Алексей Петров</h1>
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
              <Icon name="MapPin" size={13} className="text-orange-600" />
              <span className="text-sm text-muted-foreground">Иркутск</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-xs text-muted-foreground">На сайте с марта 2024</span>
            </div>

            {/* Coin rating */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <CoinRating rating={Math.round(avgRating)} size="lg" />
              <div>
                <span className="font-oswald font-bold text-2xl text-amber-500">{avgRating}</span>
                <span className="text-xs text-muted-foreground ml-1.5">({totalReviews} отзывов)</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
            {[
              { icon: "Tag", value: "24", label: "Объявлений" },
              { icon: "Handshake", value: "18", label: "Сделок" },
              { icon: "Clock", value: "~1ч", label: "Ответ" },
            ].map(s => (
              <div key={s.label}>
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mx-auto mb-1">
                  <Icon name={s.icon} size={18} className="text-orange-600" />
                </div>
                <div className="font-oswald font-bold text-xl gradient-brand-text">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-5 pt-5 border-t border-border">
          <button className="flex-1 gradient-brand text-white font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Icon name="MessageCircle" size={16} />
            Написать
          </button>
          <button className="flex-1 border border-border text-foreground font-semibold py-2.5 rounded-xl hover:bg-muted transition-colors flex items-center justify-center gap-2">
            <Icon name="Phone" size={16} />
            Позвонить
          </button>
          <button className="p-2.5 border border-border rounded-xl hover:bg-muted transition-colors" title="Пожаловаться">
            <Icon name="Flag" size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews block */}
        <div className="lg:col-span-2 space-y-5">
          {/* Rating summary */}
          <div className="bg-white border border-border rounded-2xl p-5">
            <h2 className="font-oswald font-bold text-xl uppercase mb-4">Рейтинг продавца</h2>
            <div className="flex items-center gap-6">
              <div className="text-center shrink-0">
                <div className="font-oswald font-bold text-5xl text-amber-500 leading-none">{avgRating}</div>
                <CoinRating rating={Math.round(avgRating)} size="md" />
                <div className="text-xs text-muted-foreground mt-1">{totalReviews} отзывов</div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                {RATING_DIST.map(d => (
                  <div key={d.stars} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-3">{d.stars}</span>
                    <span className="text-sm">🪙</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-4">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leave review */}
          <div className="bg-white border border-border rounded-2xl p-5">
            <h2 className="font-oswald font-bold text-xl uppercase mb-4">Оставить отзыв</h2>
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="CheckCircle2" size={28} className="text-orange-600" />
                </div>
                <p className="font-semibold text-foreground mb-1">Отзыв опубликован!</p>
                <p className="text-sm text-muted-foreground">Спасибо за честную оценку</p>
                <button onClick={() => setSubmitted(false)} className="mt-3 text-sm text-orange-600 hover:underline">
                  Написать ещё
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Ваша оценка:</p>
                  <div className="flex items-center gap-3">
                    <CoinRating rating={myRating} size="lg" interactive onRate={setMyRating} />
                    {myRating > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {["", "Плохо", "Неплохо", "Нормально", "Хорошо", "Отлично!"][myRating]}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Комментарий</label>
                  <textarea
                    rows={3}
                    placeholder="Расскажите о своём опыте с этим продавцом..."
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 resize-none transition-all"
                  />
                </div>
                <button
                  onClick={handleSubmitReview}
                  disabled={!myRating || !reviewText.trim()}
                  className="gradient-brand text-white font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={15} />
                  Опубликовать отзыв
                </button>
              </div>
            )}
          </div>

          {/* Reviews list */}
          <div className="space-y-3">
            <h2 className="font-oswald font-bold text-xl uppercase">Отзывы</h2>
            {reviews.map(r => (
              <div key={r.id} className="bg-white border border-border rounded-2xl p-4 animate-fade-in">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                      <span className="text-white text-sm font-bold">{r.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-foreground">{r.author}</span>
                        {r.verified && (
                          <span className="text-[10px] bg-orange-100 text-orange-700 font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <Icon name="BadgeCheck" size={10} />
                            Проверен
                          </span>
                        )}
                      </div>
                      <CoinRating rating={r.rating} size="sm" />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{r.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: listings */}
        <div>
          <h2 className="font-oswald font-bold text-xl uppercase mb-4">Объявления продавца</h2>
          <div className="grid grid-cols-1 gap-4">
            {sellerListings.slice(0, 4).map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <button className="mt-4 w-full border border-border text-sm font-semibold py-2.5 rounded-xl hover:bg-muted transition-colors text-muted-foreground flex items-center justify-center gap-2">
            Показать все {sellerListings.length} объявлений
            <Icon name="ChevronDown" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
