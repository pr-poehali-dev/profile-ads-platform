import { Page } from "@/App";
import { LISTINGS, VACANCIES } from "@/data/listings";
import ListingCard from "@/components/ListingCard";
import Icon from "@/components/ui/icon";

interface SavedPageProps {
  onNavigate: (page: Page) => void;
}

export default function SavedPage({ onNavigate }: SavedPageProps) {
  const savedListings = LISTINGS.filter(l => l.isFavorite);
  const savedVacancies = VACANCIES.filter(v => v.isFavorite);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-oswald font-bold text-3xl text-foreground uppercase">Избранное</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Сохранённые объявления и вакансии
          </p>
        </div>
        <span className="bg-orange-100 text-orange-600 font-semibold px-3 py-1.5 rounded-full text-sm">
          {savedListings.length + savedVacancies.length} сохранено
        </span>
      </div>

      {savedListings.length === 0 && savedVacancies.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={36} className="text-orange-400" />
          </div>
          <h3 className="font-oswald font-bold text-xl text-foreground mb-2">Нет сохранённых объявлений</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
            Нажимайте на ❤️ в карточках объявлений, чтобы сохранять понравившиеся предложения
          </p>
          <button
            onClick={() => onNavigate("catalog")}
            className="gradient-brand text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Смотреть каталог
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {savedListings.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-oswald font-bold text-xl uppercase">Объявления</h2>
                <span className="bg-muted text-muted-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                  {savedListings.length}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </section>
          )}

          {savedVacancies.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-oswald font-bold text-xl uppercase">Вакансии</h2>
                <span className="bg-muted text-muted-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                  {savedVacancies.length}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {savedVacancies.map(vac => (
                  <div key={vac.id} className="bg-white border border-border rounded-2xl p-5 card-hover cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-oswald font-bold text-lg text-foreground mb-1">{vac.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Icon name="Building2" size={13} className="text-orange-400" />
                          {vac.company}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} className="text-orange-400" />{vac.location}</span>
                          <span className="flex items-center gap-1"><Icon name="Calendar" size={11} className="text-orange-400" />{vac.date}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-oswald font-bold text-lg text-orange-500">{vac.salary}</div>
                        <button className="mt-2 gradient-brand text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                          Откликнуться
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
