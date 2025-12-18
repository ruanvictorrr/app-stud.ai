"use client";

import { useEffect, useMemo, useState } from "react";
import { listMaterials, onLibraryUpdated, setActiveMaterialById, StudyMaterial } from "@/lib/studyMaterialStore";
import { loadProgress, makeProgressKeyForDoc } from "@/lib/studyProgressStore";
import { listSessions, onSessionsUpdated, StudySession, clearSessions } from "@/lib/studySessionStore";

type Section = "upload" | "flashcards" | "summary" | "progress" | "profile";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}
function pct(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}
function fmtDate(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "—";
  }
}
function fmtMin(sec?: number) {
  if (!sec && sec !== 0) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

export default function ProfileSection({ onNavigate }: { onNavigate?: (s: Section) => void }) {
  const [docs, setDocs] = useState<StudyMaterial[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    const refresh = () => {
      setDocs(listMaterials());
      setSessions(listSessions());
    };
    refresh();
    const off1 = onLibraryUpdated(refresh);
    const off2 = onSessionsUpdated(refresh);
    return () => {
      off1?.();
      off2?.();
    };
  }, []);

  const totals = useMemo(() => {
    const totalDocs = docs.length;
    const totalSessions = sessions.length;

    // média de accuracy das sessões finalizadas
    const finalized = sessions.filter((s) => typeof s.accuracyPct === "number");
    const avgAccuracy =
      finalized.length ? Math.round(finalized.reduce((a, s) => a + (s.accuracyPct || 0), 0) / finalized.length) : 0;

    return { totalDocs, totalSessions, avgAccuracy };
  }, [docs, sessions]);

  const docsWithStats = useMemo(() => {
    return docs.map((d) => {
      const docId = d.docId || "";
      const totalCards = d.flashcards?.length ?? 0;

      const p = docId ? loadProgress(makeProgressKeyForDoc(docId)) : null;
      const known = p?.knownIds?.length ?? 0;
      const review = p?.reviewIds?.length ?? 0;
      const done = new Set([...(p?.knownIds ?? []), ...(p?.reviewIds ?? [])]).size;
      const progressPct = totalCards ? pct((done / totalCards) * 100) : 0;
      const accuracyPct = (known + review) ? pct((known / (known + review)) * 100) : 0;

      const docSessions = docId ? listSessions(docId) : [];
      const lastSession = docSessions[0];

      return {
        doc: d,
        totalCards,
        known,
        review,
        done,
        progressPct,
        accuracyPct,
        lastSession,
        sessionsCount: docSessions.length,
      };
    });
  }, [docs, sessions]);

  return (
    <section className="w-full max-w-6xl mx-auto mt-10">
      {/* Header premium */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="text-xs opacity-70">Perfil</div>
            <h2 className="text-2xl font-semibold mt-1">Seu desempenho</h2>
            <div className="mt-2 text-sm opacity-70">
              Histórico, progresso por documento e aproveitamento — tudo integrado ao que você já fez.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip tone="neutral" label={`📄 Docs: ${totals.totalDocs}`} />
            <Chip tone="neutral" label={`🧠 Sessões: ${totals.totalSessions}`} />
            <Chip tone="green" label={`✅ Média: ${totals.avgAccuracy}%`} />
          </div>
        </div>
      </div>

      {/* Docs list */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="text-lg font-semibold">Documentos</div>
          <div className="text-sm opacity-70 mt-1">Clique em um documento para abrir e continuar estudando.</div>
        </div>

        {docsWithStats.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-xl font-semibold">Sem documentos ainda</div>
            <div className="mt-2 opacity-70">Vá em Upload e gere seu primeiro material.</div>
            <button
              onClick={() => onNavigate?.("upload")}
              className="mt-6 rounded-2xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-6 py-3 font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15"
            >
              Ir para Upload
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {docsWithStats.map((x) => {
              const d = x.doc;
              const docId = d.docId || "";
              return (
                <div key={docId} className="p-6 hover:bg-white/[0.03]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-xs opacity-70">Tópico</div>
                      <div className="text-lg font-semibold truncate">{d.topic}</div>
                      <div className="text-xs opacity-60 mt-1">
                        {d.sourceFileName ? `📎 ${d.sourceFileName} • ` : ""}
                        Criado: {fmtDate(d.createdAt)}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Chip tone="neutral" label={`📚 Cards: ${x.totalCards}`} />
                        <Chip tone="green" label={`✅ Aproveitamento: ${x.accuracyPct}%`} />
                        <Chip tone="neutral" label={`🧩 Sessões: ${x.sessionsCount}`} />
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs opacity-70">
                          <span>Progresso</span>
                          <span>{x.progressPct}%</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-black/30 overflow-hidden border border-white/10">
                          <div className="h-full rounded-full bg-[#00FF8B]/70" style={{ width: `${x.progressPct}%` }} />
                        </div>
                        <div className="mt-2 text-xs opacity-60">
                          {x.lastSession?.endedAt
                            ? `Última sessão: ${fmtDate(x.lastSession.endedAt)} • ${x.lastSession.accuracyPct ?? 0}% • ${fmtMin(x.lastSession.durationSec)}`
                            : "Sem sessão finalizada ainda"}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                      <button
                        onClick={() => {
                          if (!docId) return;
                          setActiveMaterialById(docId);
                          onNavigate?.("flashcards");
                        }}
                        className="rounded-2xl border border-[#00FF8B]/30 bg-[#00FF8B]/10 px-5 py-3 font-semibold text-[#00FF8B] hover:bg-[#00FF8B]/15"
                      >
                        Continuar (Flashcards)
                      </button>
                      <button
                        onClick={() => {
                          if (!docId) return;
                          setActiveMaterialById(docId);
                          onNavigate?.("summary");
                        }}
                        className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10"
                      >
                        Ver Resumo
                      </button>
                      <button
                        onClick={() => {
                          if (!docId) return;
                          clearSessions(docId);
                        }}
                        className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 hover:bg-black/30"
                      >
                        Limpar sessões
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sessions table */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-lg font-semibold">Histórico de sessões</div>
            <div className="text-sm opacity-70 mt-1">As sessões são registradas quando você usa o modo sessão no Flashcards.</div>
          </div>
          <button
            onClick={() => clearSessions()}
            className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 hover:bg-black/30"
          >
            Limpar tudo
          </button>
        </div>

        {sessions.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-xl font-semibold">Sem sessões ainda</div>
            <div className="mt-2 opacity-70">Abra Flashcards e comece uma sessão para aparecer aqui.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase opacity-70 border-b border-white/10">
                <tr>
                  <th className="text-left p-4">Quando</th>
                  <th className="text-left p-4">Doc</th>
                  <th className="text-left p-4">Modo</th>
                  <th className="text-left p-4">Tamanho</th>
                  <th className="text-left p-4">Aproveitamento</th>
                  <th className="text-left p-4">Duração</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {sessions.slice(0, 50).map((s) => {
                  const doc = docs.find((d) => d.docId === s.docId);
                  return (
                    <tr key={s.id} className="hover:bg-white/[0.03]">
                      <td className="p-4">{fmtDate(s.endedAt || s.startedAt)}</td>
                      <td className="p-4 max-w-[420px] truncate">{doc?.topic || "—"}</td>
                      <td className="p-4">{s.mode}</td>
                      <td className="p-4">{s.sessionSize}</td>
                      <td className="p-4">{typeof s.accuracyPct === "number" ? `${s.accuracyPct}%` : "—"}</td>
                      <td className="p-4">{fmtMin(s.durationSec)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function Chip({ label, tone }: { label: string; tone: "green" | "red" | "neutral" }) {
  const cls =
    tone === "green"
      ? "border-[#00FF8B]/25 bg-[#00FF8B]/10 text-[#00FF8B]"
      : tone === "red"
      ? "border-red-500/25 bg-red-500/10 text-red-200"
      : "border-white/10 bg-black/20 text-white/70";
  return <span className={cn("text-xs px-3 py-1 rounded-full border", cls)}>{label}</span>;
}
