"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/app/components/AuthShell";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setError("Email e senha são obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          email: cleanEmail,
          password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setError(data?.error || "Erro ao criar conta.");
        return;
      }

      setSuccess("Conta criada! Redirecionando para o login...");
      setTimeout(() => router.push("/login"), 800);
    } catch (err: any) {
      setError(err?.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Crie sua conta para começar a estudar com a Stud.ai."
      footer={
        <Link href="/login" className="text-sm text-[#00FF8B] hover:underline">
          Já tem conta? Entrar
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome (opcional)"
          className="w-full h-11 rounded-lg bg-[#1A1A1A] border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF8B]"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full h-11 rounded-lg bg-[#1A1A1A] border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF8B]"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="w-full h-11 rounded-lg bg-[#1A1A1A] border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF8B]"
        />

        {error ? (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-[#00FF8B] text-black font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Criando..." : "Criar conta"}
        </button>
      </form>
    </AuthShell>
  );
}
