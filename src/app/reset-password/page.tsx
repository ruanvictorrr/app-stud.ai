"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import AuthShell from "@/app/components/AuthShell";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = useMemo(() => params.get("token") || "", [params]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Token inválido ou ausente.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não conferem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setError(data?.error || "Não foi possível redefinir a senha.");
        setLoading(false);
        return;
      }

      setDone(true);
      // opcional: redirecionar após alguns segundos
      // setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Redefinir senha"
      subtitle="Crie uma nova senha para sua conta."
      footer={
        <Link href="/login" className="text-sm text-[#00FF8B] hover:underline">
          Voltar para login
        </Link>
      }
    >
      {!token ? (
        <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          Token inválido ou ausente.
          <div className="mt-3">
            <Link href="/forgot-password" className="text-[#00FF8B] hover:underline">
              Solicitar novo link
            </Link>
          </div>
        </div>
      ) : done ? (
        <div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          Senha redefinida com sucesso!
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => router.push("/login")}
              className="h-10 px-4 rounded-lg bg-[#00FF8B] text-black font-medium hover:opacity-90 transition"
            >
              Ir para login
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 rounded-lg bg-[#1A1A1A] border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF8B]"
            autoComplete="new-password"
          />

          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full h-11 rounded-lg bg-[#1A1A1A] border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF8B]"
            autoComplete="new-password"
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
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
