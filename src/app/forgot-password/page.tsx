"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/app/components/AuthShell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // mesmo se email não existir, o endpoint deve responder success:true
      const data = await res.json().catch(() => null);

      if (!res.ok || data?.success !== true) {
        setError(data?.error || "Não foi possível enviar o link.");
        setLoading(false);
        return;
      }

      setDone(true);
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Informe seu email para receber o link de redefinição."
      footer={
        <Link href="/login" className="text-sm text-[#00FF8B] hover:underline">
          Voltar para login
        </Link>
      }
    >
      {done ? (
        <div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          Se esse email existir, você receberá um link de redefinição.
          <div className="mt-3">
            <Link href="/login" className="text-[#00FF8B] hover:underline">
              Voltar para login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 rounded-lg bg-[#1A1A1A] border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF8B]"
            autoComplete="email"
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
            {loading ? "Enviando..." : "Enviar link"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
