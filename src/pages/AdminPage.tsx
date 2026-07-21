import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const AD_ADMIN_URL = "https://functions.poehali.dev/04c2d4a7-2ef7-422a-8853-56817d5269ad";
const ADMIN_TOKEN = "profail-admin-2024";

interface Banner {
  id: number;
  slot: number;
  advertiser_name: string | null;
  link_url: string | null;
  image_url: string | null;
  is_active: boolean;
  updated_at: string;
}

interface AdRequest {
  id: number;
  advertiser_name: string;
  link_url: string;
  image_url: string | null;
  status: string;
  created_at: string;
}

const authHeaders = { "Content-Type": "application/json", "X-Admin-Token": ADMIN_TOKEN };

export default function AdminPage() {
  const [tab, setTab] = useState<"banners" | "requests">("banners");
  const [banners, setBanners] = useState<Banner[]>([]);
  const [requests, setRequests] = useState<AdRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState<{ banner: Banner; request: AdRequest } | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchBanners = () =>
    fetch(AD_ADMIN_URL, { headers: authHeaders })
      .then((r) => r.json())
      .then((d) => setBanners(d.banners || []));

  const fetchRequests = () =>
    fetch(`${AD_ADMIN_URL}/requests`, { headers: authHeaders })
      .then((r) => r.json())
      .then((d) => setRequests(d.requests || []));

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBanners(), fetchRequests()]).finally(() => setLoading(false));
  }, []);

  const toggleActive = async (banner: Banner) => {
    await fetch(AD_ADMIN_URL, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({ id: banner.id, is_active: !banner.is_active }),
    });
    fetchBanners();
  };

  const clearBanner = async (banner: Banner) => {
    if (!confirm(`Очистить слот ${banner.slot}?`)) return;
    await fetch(AD_ADMIN_URL, {
      method: "DELETE",
      headers: authHeaders,
      body: JSON.stringify({ id: banner.id }),
    });
    fetchBanners();
  };

  const assignRequest = async () => {
    if (!assignModal) return;
    setSaving(true);
    await fetch(AD_ADMIN_URL, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({
        id: assignModal.banner.id,
        advertiser_name: assignModal.request.advertiser_name,
        link_url: assignModal.request.link_url,
        image_url: assignModal.request.image_url,
        is_active: true,
        request_id: assignModal.request.id,
      }),
    });
    setSaving(false);
    setAssignModal(null);
    await Promise.all([fetchBanners(), fetchRequests()]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Icon name="Loader2" size={32} className="animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
          <Icon name="LayoutDashboard" size={20} className="text-orange-600" />
        </div>
        <div>
          <h1 className="font-oswald font-bold text-2xl uppercase">Управление рекламой</h1>
          <p className="text-muted-foreground text-sm">Баннеры и заявки</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {(["banners", "requests"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${tab === t ? "border-orange-500 text-orange-600" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {t === "banners" ? `Баннеры (${banners.length})` : `Заявки (${requests.length})`}
          </button>
        ))}
      </div>

      {/* Banners tab */}
      {tab === "banners" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {banners.map((b) => (
            <div key={b.id} className="border border-border rounded-2xl p-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-sm">Слот {b.slot}</span>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => toggleActive(b)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${b.is_active ? "bg-orange-100 text-orange-700 hover:bg-orange-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                  >
                    {b.is_active ? "Активен" : "Выключен"}
                  </button>
                  {b.image_url && (
                    <button onClick={() => clearBanner(b)} className="text-red-400 hover:text-red-600">
                      <Icon name="Trash2" size={16} />
                    </button>
                  )}
                </div>
              </div>

              {b.image_url ? (
                <>
                  <img src={b.image_url} alt="" className="w-full h-24 object-cover rounded-xl mb-2" />
                  <p className="text-xs text-muted-foreground truncate">{b.advertiser_name}</p>
                  <a href={b.link_url || "#"} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-500 hover:underline truncate block">{b.link_url}</a>
                </>
              ) : (
                <div className="h-24 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-muted-foreground text-xs gap-1">
                  <Icon name="ImageOff" size={20} />
                  Пустой слот
                </div>
              )}

              {/* Assign from requests */}
              {requests.filter((r) => r.status === "pending").length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Назначить заявку:</p>
                  <div className="flex flex-col gap-1">
                    {requests.filter((r) => r.status === "pending").map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setAssignModal({ banner: b, request: r })}
                        className="text-xs text-left px-2 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 transition-colors flex items-center gap-1.5"
                      >
                        <Icon name="Plus" size={12} />
                        #{r.id} — {r.advertiser_name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Requests tab */}
      {tab === "requests" && (
        <div className="space-y-3">
          {requests.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="Inbox" size={32} className="mx-auto mb-2" />
              Заявок пока нет
            </div>
          )}
          {requests.map((r) => (
            <div key={r.id} className="border border-border rounded-2xl p-4 bg-white flex gap-4">
              {r.image_url && <img src={r.image_url} alt="" className="w-24 h-16 object-cover rounded-xl flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">#{r.id} — {r.advertiser_name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.status === "approved" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {r.status === "approved" ? "Одобрена" : "Ожидает"}
                  </span>
                </div>
                <a href={r.link_url} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-500 hover:underline block truncate">{r.link_url}</a>
                <p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleString("ru-RU")}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assign confirm modal */}
      {assignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-oswald font-bold text-lg mb-1">Назначить баннер?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Заявка <strong>#{assignModal.request.id}</strong> от <strong>{assignModal.request.advertiser_name}</strong> будет размещена в слоте <strong>{assignModal.banner.slot}</strong> и активирована.
            </p>
            {assignModal.request.image_url && (
              <img src={assignModal.request.image_url} alt="" className="w-full h-24 object-cover rounded-xl mb-4" />
            )}
            <div className="flex gap-3">
              <button onClick={() => setAssignModal(null)} className="flex-1 border border-border rounded-xl py-2.5 text-sm hover:bg-gray-50 transition-colors">Отмена</button>
              <button onClick={assignRequest} disabled={saving} className="flex-1 gradient-brand text-white rounded-xl py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <Icon name="Loader2" size={16} className="animate-spin" /> : null}
                Разместить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
