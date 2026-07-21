import { useState } from "react";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (name: string) => void;
}

type Tab = "login" | "register";

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = () => {
    const displayName = tab === "register" ? name || email.split("@")[0] : email.split("@")[0];
    onLogin(displayName || "Пользователь");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gradient-brand p-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Logo size={28} light />
                <span className="font-oswald font-bold text-white text-lg tracking-wide">ЛЕВША</span>
              </div>
              <p className="text-white/70 text-xs">
                {tab === "login" ? "Войдите в свой аккаунт" : "Создайте новый аккаунт"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={15} className="text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/15 p-1 rounded-xl mt-4">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "login" ? "bg-white text-orange-700 shadow" : "text-white/80 hover:text-white"
              }`}
            >
              Войти
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "register" ? "bg-white text-orange-700 shadow" : "text-white/80 hover:text-white"
              }`}
            >
              Регистрация
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-4">
          {tab === "register" && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Имя</label>
              <div className="relative">
                <Icon name="User" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email</label>
            <div className="relative">
              <Icon name="Mail" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="your@email.ru"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Пароль</label>
            <div className="relative">
              <Icon name="Lock" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
              </button>
            </div>
          </div>

          {tab === "login" && (
            <button className="text-xs text-orange-600 hover:text-orange-700 text-right -mt-2 font-medium transition-colors">
              Забыли пароль?
            </button>
          )}

          <button
            onClick={handleSubmit}
            className="gradient-brand text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-1 shadow-md"
          >
            <Icon name={tab === "login" ? "LogIn" : "UserPlus"} size={16} />
            {tab === "login" ? "Войти в аккаунт" : "Создать аккаунт"}
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">или</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full flex items-center justify-center gap-2.5 border border-border py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors text-foreground">
            <span className="text-lg">📱</span>
            Войти по номеру телефона
          </button>

          <p className="text-center text-xs text-muted-foreground mt-1">
            Регистрируясь, вы соглашаетесь с{" "}
            <button className="text-orange-600 hover:underline">правилами сайта</button>
          </p>
        </div>
      </div>
    </div>
  );
}