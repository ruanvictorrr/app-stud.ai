"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { id: string; name: string | null; email: string; role: "USER" | "ADMIN" };

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [meLoading, setMeLoading] = useState(true);
  const [me, setMe] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  async function loadMe() {
    setMeLoading(true);
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const json = await res.json();
      setMe(json?.user || null);
    } catch {
      setMe(null);
    } finally {
      setMeLoading(false);
    }
  }

  useEffect(() => {
    loadMe();
  }, []);

  async function submit() {
    setError(null);
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login"
          ? { email, password }
          : { name: name.trim() || null, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json?.success) {
        throw new Error(json?.error || json?.details || "Falha na autenticação.");
      }

      await loadMe();
      router.push("/");
      router.refresh();
    } catch (e: any) {
      setError(e?.message || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    setError(null);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      await loadMe();
    } finally {
      setLoading(false);
    }
  }

  if (meLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
        <div className="text-sm text-gray-400">Carregando…</div>
      </div>
    );
  }

  // Já logado
  if (me) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] px-4">
        <div className="mx-auto max-w-5xl py-10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Conta</h1>
              <p className="mt-1 text-sm text-gray-400">
                Você já está logado. Pode voltar para o app quando quiser.
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="rounded-xl bg-[#00FF8B] text-black font-semibold px-4 py-2 hover:opacity-90"
            >
              Ir para o app
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F] p-6">
              <div className="text-sm text-gray-400">Email</div>
              <div className="mt-1 text-lg text-white break-all">{me.email}</div>

              <div className="mt-4 text-sm text-gray-400">Permissão</div>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold border ${
                    me.role === "ADMIN"
                      ? "text-[#00FF8B] border-[#00FF8B]/30 bg-[#00FF8B]/10"
                      : "text-gray-200 border-[#2A2A2A] bg-[#141414]"
                  }`}
                >
                  {me.role}
                </span>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={logout}
                  disabled={loading}
                  className="w-full rounded-xl border border-[#2A2A2A] text-gray-200 py-2 hover:bg-[#151515] disabled:opacity-60"
                >
                  {loading ? "Saindo..." : "Sair"}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F] p-6">
              <h2 className="text-lg font-semibold text-white">Dica (Admin)</h2>
              <p className="mt-2 text-sm text-gray-400">
                Para virar ADMIN automaticamente, coloque seu email em{" "}
                <code className="text-gray-200">ADMIN_EMAILS</code> no{" "}
                <code className="text-gray-200">.env</code> ou{" "}
                <code className="text-gray-200">.env.local</code>.
              </p>
              <div className="mt-4 rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] p-4 text-xs text-gray-400">
                Exemplo:
                <div className="mt-2 text-gray-200 break-all">
                  ADMIN_EMAILS="seuemail@gmail.com"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form
  return (
    <div className="min-h-screen bg-[#0D0D0D] px-4">
      <div className="mx-auto max-w-5xl py-10">
        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
          {/* Lado esquerdo (texto) */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {mode === "login" ? "Entrar" : "Criar conta"}
            </h1>
            <p className="mt-2 text-gray-400">
              {mode === "login"
                ? "Acesse sua conta para salvar materiais, flashcards e progresso."
                : "Crie uma conta para manter seus estudos salvos e sincronizados."}
            </p>

            <div className="mt-6 rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F] p-5">
              <div className="text-sm text-gray-400">Admin</div>
              <p className="mt-1 text-sm text-gray-400">
                Coloque seu email em <code className="text-gray-200">ADMIN_EMAILS</code>{" "}
                no <code className="text-gray-200">.env/.env.local</code> para testar
                todas as funcionalidades.
              </p>
            </div>
          </div>

          {/* Lado direito (card) */}
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl border border-[#1A1A1A] bg-[#0F0F0F] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-white">
                    {mode === "login" ? "Bem-vindo de volta" : "Comece agora"}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    {mode === "login" ? "Entre para continuar" : "Leva menos de 1 minuto"}
                  </div>
                </div>

                <button
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-sm text-[#00FF8B] hover:opacity-80"
                  type="button"
                >
                  {mode === "login" ? "Criar conta" : "Já tenho conta"}
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {mode === "register" ? (
                  <div>
                    <label className="text-xs text-gray-400">Nome (opcional)</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00FF8B]/60"
                      placeholder="Seu nome"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="text-xs text-gray-400">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00FF8B]/60"
                    placeholder="voce@email.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Senha</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#00FF8B]/60"
                    placeholder="••••••••"
                    type="password"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                  <div className="mt-1 text-[11px] text-gray-500">
                    Mínimo: 6 caracteres.
                  </div>
                </div>

                {error ? (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                    {error}
                  </div>
                ) : null}

                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-full rounded-xl bg-[#00FF8B] text-black font-semibold py-2.5 hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "Enviando..." : mode === "login" ? "Entrar" : "Cadastrar"}
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="w-full rounded-xl border border-[#2A2A2A] text-gray-200 py-2.5 hover:bg-[#151515]"
                  type="button"
                >
                  Voltar para o app
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                Ao continuar, você concorda em usar o app para fins educacionais.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
