"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Sparkles } from "lucide-react";

type Me = { id: string; email: string; role?: string; name?: string } | null;

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [me, setMe] = useState<Me>(null);

  // ✅ aceita /api/auth/me no formato { success:true, user:{...} }
  useEffect(() => {
    let alive = true;

    async function loadMe() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const json = await res.json();
        if (!alive) return;

        const u = json?.user || json?.data || null;
        if (res.ok && json?.success && u?.id) setMe(u);
        else setMe(null);
      } catch {
        if (!alive) return;
        setMe(null);
      }
    }

    loadMe();
    return () => {
      alive = false;
    };
  }, [pathname]);

  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setMe(null);
    router.push("/login");
  }

  const nav = [
    { href: "/", label: "Home" },
    { href: "/flashcards", label: "Flashcards" },
    { href: "/summary", label: "Resumo" },
  ];

  return (
    <header className="border-b border-[#1A1A1A] backdrop-blur-sm bg-[#0D0D0D]/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FF8B] to-[#007B5F] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#0D0D0D]" />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#00FF8B] to-[#007B5F] bg-clip-text text-transparent">
              Stud.ai
            </div>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition",
                    active
                      ? "bg-[#00FF8B]/10 text-[#00FF8B] border border-[#00FF8B]/30"
                      : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {me ? (
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-xl border border-[#1A1A1A] bg-[#0D0D0D] px-3 py-2 text-sm text-gray-200 hover:bg-[#1A1A1A]"
                title="Sair"
              >
                <LogOut className="w-4 h-4 text-[#00FF8B]" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-xl border border-[#1A1A1A] px-3 py-2 text-sm text-gray-200 hover:bg-[#1A1A1A]"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden pb-3 flex gap-2 overflow-x-auto">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition",
                  active
                    ? "bg-[#00FF8B]/10 text-[#00FF8B] border border-[#00FF8B]/30"
                    : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
