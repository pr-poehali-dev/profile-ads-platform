import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const AD_SUBMIT_URL = "https://functions.poehali.dev/0d683381-8c20-43fd-9a1a-b8fe648eb3ba";

interface AdRequestModalProps {
  onClose: () => void;
}

export default function AdRequestModal({ onClose }: AdRequestModalProps) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !link.trim() || !file) {
      setError("Заполните все поля и прикрепите файл баннера");
      return;
    }
    setError("");
    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      const mime = file.type;

      try {
        const res = await fetch(AD_SUBMIT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ advertiser_name: name, link_url: link, image_b64: base64, image_mime: mime }),
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          setSuccess(true);
        } else {
          setError(data.error || "Ошибка при отправке");
        }
      } catch {
        setError("Ошибка сети, попробуйте ещё раз");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <Icon name="X" size={20} />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-green-600" />
            </div>
            <h3 className="font-oswald font-bold text-xl mb-2">Заявка отправлена!</h3>
            <p className="text-muted-foreground text-sm mb-6">Мы получили вашу заявку и свяжемся с вами в ближайшее время.</p>
            <button onClick={onClose} className="gradient-brand text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-oswald font-bold text-xl mb-1">Заявка на рекламу</h3>
            <p className="text-muted-foreground text-sm mb-5">Заполните форму и мы разместим ваш баннер</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Ваше имя / компания</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иванов Иван"
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Ссылка куда ведёт баннер</label>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.ru"
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Файл баннера</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-orange-400 transition-colors"
                >
                  {preview ? (
                    <img src={preview} alt="preview" className="max-h-24 mx-auto rounded-lg object-contain" />
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      <Icon name="Upload" size={24} className="mx-auto mb-1" />
                      Нажмите для загрузки (JPG, PNG, WebP)
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-brand text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <Icon name="Loader2" size={18} className="animate-spin" /> : <Icon name="Send" size={18} />}
                {loading ? "Отправляем..." : "Отправить заявку"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
