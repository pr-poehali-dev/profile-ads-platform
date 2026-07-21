import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWABanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isInStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = localStorage.getItem("pwa-banner-dismissed");

    if (isInStandalone || dismissed) return;

    if (isIOSDevice) {
      setIsIOS(true);
      setVisible(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-banner-dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:w-96">
      <div className="bg-gray-900 border border-orange-500/30 rounded-2xl shadow-2xl p-4 flex items-start gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/3ac61a67-957b-4eea-9bad-bb8823ae7707/files/6f10c7c8-7752-4f3b-aa92-71aba267a338.jpg"
            alt="Левша"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">Установить Левша</p>
          {isIOS ? (
            <p className="text-gray-400 text-xs mt-0.5">
              Нажмите <Icon name="Share" size={12} className="inline mx-0.5 text-blue-400" /> в браузере, затем «На экран домой»
            </p>
          ) : (
            <p className="text-gray-400 text-xs mt-0.5">Добавьте на главный экран для быстрого доступа</p>
          )}
          {!isIOS && (
            <button
              onClick={handleInstall}
              className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              Установить
            </button>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-gray-500 hover:text-gray-300 transition-colors -mt-0.5"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
}