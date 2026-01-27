"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/app/components/AuthShell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setError(data?.error || "Não foi possível entrar.");
        setLoading(false);
        return;
      }

      router.push("/");
    } catch (err: any) {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Entrar"
      subtitle="Acesse sua conta para continuar."
      footer={
        <p className="text-xs text-zinc-500">
          Ao entrar, você concorda com os termos de uso.
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-11 rounded-lg bg-[#1A1A1A] border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF8B]"
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 rounded-lg bg-[#1A1A1A] border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF8B]"
          autoComplete="current-password"
        />

        {error ? (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-[#00FF8B] text-black font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="flex items-center justify-between text-sm pt-1">
          <Link href="/forgot-password" className="text-[#00FF8B] hover:underline">
            Esqueci a senha
          </Link>

          <Link href="/register" className="text-[#00FF8B] hover:underline">
            Criar conta
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
